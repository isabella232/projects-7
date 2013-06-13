from lib.database import Database
from lib.entity.message import Message
from lib.entity.settings import Settings
from lib.logLevel import LogLevel
from lib.tools.JSON import JSON
from lib.tools.debugger import Debugger


class Request(object):
    _RECORDS = None

    def __init__(self):
        self._id = ''
        self._memory = 0
        self._url = ''
        self._datetime = ''
        self._stats = ''
        self._messages = []
        self._get = []
        self._post = []
        self._server = []
        self._read = 0
        self._level = ''

    @staticmethod
    def all(force=False):
        """
        Get all requests
        """
        if Request._RECORDS is None or force:

            if Request._RECORDS is None:
                Request._RECORDS = []
            else:
                del Request._RECORDS[:]

            db = Database()
            settings = Settings()
            query = "SELECT * FROM requests ORDER BY id DESC LIMIT ?"
            results = db.execute(query, [settings.requests_limit]).fetchAll()

            for data in results:
                req = Request()
                req._populateFromDb(data)
                Request._RECORDS.append(req)

        return Request._RECORDS

    @staticmethod
    def delete(index):
        if len(Request._RECORDS) == 0:
            return

        request = Request._RECORDS[index]

        db = Database()
        settings = Settings()

        query = "DELETE FROM requests WHERE id = ?"
        db.execute(query, [request.getId()])

        query = "DELETE FROM messages WHERE request = ?"
        db.execute(query, [request.getId()])

        del Request._RECORDS[index]

        # Restore 1 item from database is possible
        query = "SELECT * FROM requests ORDER BY id DESC LIMIT ?, 1"
        results = db.execute(query, [settings.requests_limit-1]).fetchAll()

        if results:
            req = Request()
            req._populateFromDb(results.pop())
            Request._RECORDS.append(req)

    def createFromNodeJs(self, data):
        if not self._validateNodeJsData(data):
            return False

        self._populateFromNodeJs(data)
        Debugger.log("Storing request data to Database...", 'debug')
        db = Database()

        # Storing main table
        query = "INSERT INTO requests (id, datetime, url, memory, stats, get, post, server, level, read)" \
                " VALUES (NULL, ?,?,?,?,?,?,?,?,0)"
        bind = (self._datetime, self._url, self._memory, JSON.encode(self._stats), JSON.encode(self._get),
                JSON.encode(self._post), JSON.encode(self._server), self._level)
        db.execute(query, bind)
        self._id = db.last_inserted_id

        # Storing messages
        messages = self._messages
        self._messages = []
        for message in messages:
            m = Message()
            message['request'] = self._id
            m.createFromNodeJs(message)
            self._messages.append(m)

        """
        Modify data (this will also affect the Request table model)
        """
        settings = Settings()
        if Request._RECORDS is not None:
            Request._RECORDS.insert(0, self)
            if len(Request._RECORDS) > settings.requests_limit:
                del Request._RECORDS[-1]

        return True

    def markAsRead(self):
        db = Database()
        query = "UPDATE requests SET read = 1 WHERE id = ?"
        bind = (self._id,)
        db.execute(query, bind)
        self._read = True

    def getId(self):
        return self._id

    def getMemory(self):
        return self._format(self._memory)

    def getDateTime(self):
        return self._datetime

    def getUrl(self):
        return self._url

    def getStats(self, format=True):
        if not format:
            return self._stats

        stats = []
        for k in self._stats:
            stats.append(k.capitalize() + ': ' + str(self._stats[k]))
        return ', '.join(stats)

    def getMessages(self):
        if len(self._messages) < 1:
            self._messages = Message.find({'request': self._id})
        return self._messages

    def getGet(self):
        return self._get

    def getPost(self):
        return self._post

    def getServer(self):
        return self._server

    def getRead(self):
        return bool(self._read)

    def getLevel(self):
        return self._level

    def _populateFromDb(self, data):
        for k in data:
            setattr(self, '_' + k, data[k])
        self._stats = JSON.decode(self._stats)
        self._get = JSON.decode(self._get)
        self._post = JSON.decode(self._post)
        self._server = JSON.decode(self._server)

    def _validateNodeJsData(self, data):
        valid = True
        keys = ['memory', 'url', 'datetime', 'messages', 'stats', 'get', 'post', 'server', 'level']
        for key in keys:
            if key not in data:
                Debugger.log("Key '" + key + "' is missing in Request data!", 'error')
                valid = False
        return valid

    def _populateFromNodeJs(self, data):
        for k in data:
            setattr(self, '_' + k, data[k])
        self._stats = JSON.decode(self._stats)

    def _format(self, num):
        for x in ['bytes','KB','MB','GB']:
            if num < 1024.0:
                return "%3.2f %s" % (num, x)
            num /= 1024.0
        return "%3.2f %s" % (num, 'TB')
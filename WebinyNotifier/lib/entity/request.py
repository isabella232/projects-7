from lib.database import Database
from lib.entity.message import Message
from lib.tools.JSON import JSON
from lib.tools.debugger import Debugger

class Request(object):
    def __init__(self):
        self._id = ''
        self._memory = 0
        self._url = ''
        self._datetime = ''
        self._stats = ''
        self._messages = []

    def createFromNodeJs(self, data):
        if not self._validateNodeJsData(data):
            return False

        self._populateFromNodeJs(data)
        Debugger.log("Storing request data to Database...", 'debug')
        db = Database()

        # Storing main table
        query = "INSERT INTO requests (id, datetime, url, memory, stats) VALUES (NULL, ?,?,?,?)"
        bind = (self._datetime, self._url, self._memory, JSON.encode(self._stats))
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

        return True


    def getId(self):
        return self._id

    def getMemory(self):
        return self._memory

    def getDateTime(self):
        return self._datetime

    def getUrl(self):
        return self._url

    def getStats(self):
        return self._stats

    def getMessages(self):
        if len(self._messages) < 1:
        # Get messages and create message instances
            return

    def _populateFromDb(self, data):
        for k, v in data.iteritems():
            setattr(self, '_' + k, v)

    def _validateNodeJsData(self, data):
        valid = True
        keys = ['memory', 'url', 'datetime', 'messages', 'stats']
        for key in keys:
            if key not in data:
                Debugger.log("Key '"+key+"' is missing in Request data!", 'error')
                valid = False
        return valid

    def _populateFromNodeJs(self,data):
        for k, v in data.iteritems():
            setattr(self, '_' + k, v)
        self._stats = JSON.decode(self._stats)
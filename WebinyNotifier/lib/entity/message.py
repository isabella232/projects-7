from lib.database import Database
from lib.tools.JSON import JSON
from lib.tools.debugger import Debugger
from lib.tools.memory import formatMemory


class Message(object):
    def __init__(self):
        self._id = ''
        self._group = ''
        self._message = ''
        self._file = ''
        self._line = 0
        self._memory = 0
        self._level = ''
        self._datetime = ''
        self._context = []
        self._extra = []
        self._request = ''

    def createFromNodeJs(self, data):
        if not self._validateNodeJsData(data):
            return False

        self._populateFromNodeJs(data)
        Debugger.log("Storing message data to Database...", 'debug')
        db = Database()

        # Storing main table
        query = "INSERT INTO messages (`group`, message, file, line, memory, level, datetime, context, extra, request) " \
                "VALUES (?,?,?,?,?,?,?,?,?,?)"
        bind = (
            self._group, self._message, self._file, self._line, self._memory, self._level, self._datetime, JSON.encode(self._context),
            JSON.encode(self._extra), self._request)
        db.execute(query, bind)
        self._id = db.last_inserted_id
        return True

    def getId(self):
        return self._id

    def getGroup(self):
        return self._group

    def getDateTime(self):
        return self._datetime

    def getLevel(self):
        return self._level

    def getMessage(self):
        return self._message

    def getContext(self):
        return self._context

    def getExtra(self):
        return self._extra

    def getFile(self):
        return self._file

    def getLine(self):
        return self._line

    def getMemory(self):
        return formatMemory(self._memory)

    @staticmethod
    def find(where=None):
        db = Database()
        query = "SELECT * FROM messages"
        bind = []
        if where is not None:
            whereSql = " WHERE 1 "
            for key in where:
                whereSql += "AND " + key + " = ?"
                bind.append(where[key])
            query += whereSql
        results = db.execute(query, bind).fetchAll()

        messages = []
        for data in results:
            message = Message()
            message._populateFromDb(data)
            messages.append(message)
        return messages

    def _populateFromDb(self, data):
        for k in data:
            setattr(self, '_' + k, data[k])
        self._context = JSON.decode(self._context)
        self._extra = JSON.decode(self._extra)

    def _validateNodeJsData(self, data):
        valid = True
        keys = ['name', 'message', 'datetime', 'level', 'context', 'extra', 'request', 'line', 'file']
        for key in keys:
            if key not in data:
                Debugger.log("Key '" + key + "' is missing in Message data!", 'error')
                data[key] = ''
                #valid = False
        return valid

    def _populateFromNodeJs(self, data):
        map = {
            'name': 'group'
        }
        for k in data:
            value = data[k]
            if k in map:
                k = map[k]
            setattr(self, '_' + k, value)
        self._context = JSON.decode(self._context)
        self._extra = JSON.decode(self._extra)
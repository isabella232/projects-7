from PyQt4 import QtCore
from lib.database import Database
from lib.entity.message import Message
from lib.entity.settings import Settings
from lib.entity.viewModel.requestTableModel import RequestTableModel
from lib.tools.JSON import JSON
from lib.tools.debugger import Debugger


class Request(object):
    _RECORDS = None

    """:type: RequestTableModel"""
    _TABLE_MODEL = None

    def __init__(self):
        self._id = ''
        self._memory = 0
        self._url = ''
        self._datetime = ''
        self._stats = ''
        self._messages = []

    @staticmethod
    def getTableModel(parent):
        """
        Get request table model
        """
        if Request._TABLE_MODEL is None:
            Request._TABLE_MODEL = RequestTableModel(Request.all(), parent)
            Request._TABLE_MODEL.setData(QtCore.QModelIndex(), QtCore.QVariant(), role=QtCore.Qt.EditRole)
        return Request._TABLE_MODEL

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

            if force and Request._TABLE_MODEL is not None:
                Request._refreshModel()

        return Request._RECORDS

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

        """
        Modify data (this will also affect the Request table model)
        """
        if Request._RECORDS is not None:
            Request._RECORDS.insert(0, self)
            del Request._RECORDS[-1]

        Request._refreshModel()
        return True

    def getId(self):
        return self._id

    def getMemory(self):
        return self._memory

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

    def _populateFromDb(self, data):
        for k in data:
            setattr(self, '_' + k, data[k])
        self._stats = JSON.decode(self._stats)

    def _validateNodeJsData(self, data):
        valid = True
        keys = ['memory', 'url', 'datetime', 'messages', 'stats']
        for key in keys:
            if key not in data:
                Debugger.log("Key '" + key + "' is missing in Request data!", 'error')
                valid = False
        return valid

    def _populateFromNodeJs(self, data):
        for k in data:
            setattr(self, '_' + k, data[k])
        self._stats = JSON.decode(self._stats)

    @staticmethod
    def _refreshModel():
        if Request._TABLE_MODEL is not None:
            Request._TABLE_MODEL.arrayData = Request._RECORDS
            Request._TABLE_MODEL.refreshModel()
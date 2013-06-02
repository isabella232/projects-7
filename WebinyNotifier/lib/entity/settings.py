from PyQt4 import QtCore
import exceptions
from lib.database import Database
from lib.entity.viewModel.logLevelsTableModel import LogLevelsTableModel
from lib.tools.JSON import JSON


class Settings(object):
    _SETTINGS = {}
    _LOG_LEVELS_TABLE_MODEL = None

    def __init__(self):
        if len(Settings._SETTINGS) == 0:
            db = Database()
            query = "SELECT * FROM settings";
            data = db.execute(query).fetchAll()
            self._makeSettingsDictionary(data)

    def createLogLevelsModel(self, parent):
        """
        Get log levels table model
        """
        if Settings._LOG_LEVELS_TABLE_MODEL is None:
            Settings._LOG_LEVELS_TABLE_MODEL = LogLevelsTableModel(self.log_levels, parent)
            Settings._LOG_LEVELS_TABLE_MODEL.setData(QtCore.QModelIndex(), QtCore.QVariant(), role=QtCore.Qt.EditRole)
        return Settings._LOG_LEVELS_TABLE_MODEL

    @staticmethod
    def getLogLevelsModel():
        return Settings._LOG_LEVELS_TABLE_MODEL

    def __setattr__(self, name, value):
        Settings._SETTINGS[name] = value

    def __getattribute__(self, name):
        try:
            return super(Settings, self).__getattribute__(name)
        except AttributeError:
            if name in Settings._SETTINGS:
                return Settings._SETTINGS[name]
            print "Trying to access undefined Settings property '" + name + "'"
            return None

    def _makeSettingsDictionary(self, data):
        for r in data:
            value = r['value']
            if self._isNumber(value):
                value = self._toNumber(value)
            if r['key'] == 'log_levels':
                value = JSON.decode(r['value'])
            setattr(self, r['key'], value)

    def _isNumber(self, s):
        try:
            float(s)
            return True
        except ValueError:
            return False

    def _toNumber(self, s):
        try:
            return int(s)
        except exceptions.ValueError:
            return float(s)

    def save(self):
        db = Database()
        for i in Settings._SETTINGS.items():
            key = i[0]
            value = i[1]
            if key == 'log_levels':
                value = JSON.encode(value)
            query = "UPDATE settings SET value = ? WHERE key = ?"
            db.execute(query, (value, key))

from lib.database import Database

class Settings(object):

    _SETTINGS = {}

    def __init__(self):
        if len(Settings._SETTINGS) == 0:
            db = Database()
            query = "SELECT * FROM settings";
            data = db.execute(query).fetchAll()
            self._makeSettingsDictionary(data)

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
            setattr(self, r[0], r[1])

    def save(self):
        db = Database()
        for i in Settings._SETTINGS.items():
            query = "UPDATE settings SET value = ? WHERE key = ?"
            db.execute(query, (i[1], i[0]))
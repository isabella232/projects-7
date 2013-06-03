from PyQt4 import QtGui
from lib.entity.request import Request
from ui.wrappers.settingsWindow import SettingsWindow
from lib.entity.settings import Settings as SettingsObj


class Settings(QtGui.QDialog):
    def __init__(self, WebinyNotifier):
        QtGui.QDialog.__init__(self)
        self.ui = SettingsWindow()
        self.ui.setupUi(self)
        self._settings = SettingsObj()
        self.parent = WebinyNotifier

    def show(self):
        self.ui.getPort().setText(str(self._settings.port))
        self.ui.getRequestsLimit().setText(str(self._settings.requests_limit))
        self.ui.getShowBalloon().setChecked(bool(self._settings.show_balloon))
        # Set log levels table data
        self.ui.getLogLevelsTable().verticalHeader().setVisible(False)
        self.ui.getLogLevelsTable().setModel(self._settings.createLogLevelsModel(self))
        self.ui.getLogLevelsTable().resizeColumnsToContents()
        self.ui.getLogLevelsTable().horizontalHeader().setStretchLastSection(True)
        super(Settings, self).show()

    def on_buttonBox_rejected(self):
        self.hide()

    def on_buttonBox_accepted(self):
        self.hide()
        self._save()

    def _save(self):
        # Store some data for extra processing
        oldRequestsLimit = self._settings.requests_limit
        # Assign new port and restart listener if port is changed
        oldPort = self._settings.port
        self._settings.port = int(self.ui.getPort().text())
        self._settings.requests_limit = int(self.ui.getRequestsLimit().text())
        self._settings.show_balloon = int(self.ui.getShowBalloon().isChecked())
        # Get data from model
        self._settings.log_levels = self._settings._LOG_LEVELS_TABLE_MODEL.getData()
        # Save to DB
        self._settings.save()

        # Extra processing
        if self._settings.requests_limit != oldRequestsLimit:
            Request.all(True)

        if self._settings.port != oldPort:
            self.parent.restartListener()
        self.hide()

    def btnCancel(self):
        self.hide()
from PyQt4 import QtGui, Qt
from lib.entity.request import Request
from ui.settingsWindow import SettingsWindow
from lib.entity.settings import Settings as SettingsObj


class Settings(QtGui.QDialog):
    def __init__(self):
        QtGui.QDialog.__init__(self)
        self.ui = SettingsWindow()
        self.ui.setupUi(self)
        self._settings = SettingsObj()

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
        requestsLimit = int(self.ui.requestsLimit.text())
        oldRequestsLimit = self._settings.requests_limit
        # Assign new settings
        self._settings.port = int(self.ui.port.text())
        self._settings.requests_limit = requestsLimit
        self._settings.show_balloon = int(self.ui.showBalloon.isChecked())
        # Get data from model
        self._settings.log_levels = self._settings._LOG_LEVELS_TABLE_MODEL.getData()
        # Save to DB
        self._settings.save()
        # Extra processing
        if requestsLimit != oldRequestsLimit:
            Request.all(True)

        self.hide()

    def btnCancel(self):
        self.hide()
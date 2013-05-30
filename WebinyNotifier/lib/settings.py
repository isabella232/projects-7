from PyQt4 import QtGui
from ui.settings import Ui_Form
from lib.entity.settings import Settings as SettingsObj

class Settings(QtGui.QDialog):
    
    def __init__(self):
        QtGui.QDialog.__init__(self)        
        self.ui=Ui_Form()
        self.ui.setupUi(self)
        self._settings = SettingsObj()

    def show(self):
        self.ui.port.setText(self._settings.port)
        self.ui.showBalloon.setChecked(bool(self._settings.show_balloon))
        super(Settings, self).show();
    
    def btnSave(self):
        self._settings.port = str(self.ui.port.text())
        self._settings.show_balloon = int(self.ui.showBalloon.isChecked())
        self._settings.save()
        self.hide()
        
    def btnCancel(self):
        self.hide()
        

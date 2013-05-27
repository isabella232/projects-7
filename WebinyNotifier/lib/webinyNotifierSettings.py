from PyQt4 import QtGui
from ui.settings import Ui_Form
from lib.webinyDatabase import WebinyDatabase

class WebinyNotifierSettings(QtGui.QDialog):
    
    settings = {}
    
    def __init__(self):
        QtGui.QDialog.__init__(self)        
        self.ui=Ui_Form()
        self.ui.setupUi(self)
        
        if len(self.settings) == 0:
            db = WebinyDatabase()
            query = "SELECT * FROM settings";
            data = db.execute(query).fetchAll()
            self.makeSettingsDictionary(data)   
        
    def show(self):
        self.ui.displayName.setText(self.settings['display_name'])
        self.ui.username.setText(self.settings['username'])
        self.ui.ipAddress.setText(self.settings['ip_address'])
        self.ui.port.setText(self.settings['port'])
        super(WebinyNotifierSettings, self).show();
    
    def btnSave(self):
        self.settings['display_name'] = str(self.ui.displayName.text())
        self.settings['username'] = str(self.ui.username.text())
        self.settings['ip_address'] = str(self.ui.ipAddress.text())
        self.settings['port'] = str(self.ui.port.text())
        
        db = WebinyDatabase()
        for i in self.settings.items():
            query = "UPDATE settings SET value = ? WHERE key = ?"
            db.execute(query, (i[1], i[0]))        
                       
        self.hide()
        
    def btnCancel(self):
        self.hide()
        
    def makeSettingsDictionary(self, data):
        for r in data:
            self.settings[r[0]] = r[1]
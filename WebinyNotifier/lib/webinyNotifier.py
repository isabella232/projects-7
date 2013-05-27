from time import gmtime, strftime
from PyQt4 import QtGui, QtCore
from lib.webinyNotifierSettings import WebinyNotifierSettings
from lib.webinyNotifierLog import WebinyNotifierLog
from lib.webinyJSON import WebinyJSON
from lib.webinyDatabase import WebinyDatabase

from lib.webinyListener import WebinyListener
from lib.webinyTray import WebinyTray
from PyQt4.QtCore import QObject


class WebinyNotifier(QtGui.QApplication, QObject):

    processMonitorLog = ''

    def __init__(self, args):
        QtGui.QApplication.__init__(self, args)
        QObject.__init__(self, args)
        self.setQuitOnLastWindowClosed(False)
        self.tray = WebinyTray(parent=self)
        # Connect slot so Listener can forward request data to main thread
        self.listener = WebinyListener()
        self.connect_slots(self.listener)
        self.listener.start()
        self.exec_()

    def connect_slots(self, sender):
        self.connect(sender, QtCore.SIGNAL('newNotification'), self.newNotification)

    def newNotification(self, params):
        self.logDebugMessage('New notification received! Data: '+ WebinyJSON.encode(params))
        self._storeNotification(params)
        message = 'New message arrived!'
        self.notifyTray(message)

    def openSettings(self):
        self.settingsForm = WebinyNotifierSettings()
        self.settingsForm.show()


    def exitApp(self):
        self.listener.stop()
        self.quit()


    def notifyTray(self, value):
        self.logDebugMessage('Showing tray message: ' + value)
        self.tray.showMessage('Webiny Notifier', value, QtGui.QSystemTrayIcon.Information, 10000000)

    def balloonClicked(self):
        self.logDebugMessage('Balloon clicked')
        if not hasattr(self, "logWindow"):
            self.logWindow = WebinyNotifierLog(self);
        if self.logWindow.isVisible():
            return
        else:
            self.logWindow.show()

    def iconClicked(self, reason):
        if reason == 2:
            self.logDebugMessage('Icon clicked')
            if not hasattr(self, "logWindow"):
                self.logWindow = WebinyNotifierLog(self);
            if self.logWindow.isVisible():
                self.logWindow.hide()
            else:
                self.logWindow.show()

    def logDebugMessage(self, message):
        time = strftime("%Y-%m-%d %H:%M:%S", gmtime())
        self.processMonitorLog += '[' + time + '] ' + message + '\n'
        if hasattr(self, "logWindow") and self.logWindow.isVisible():
            self.logWindow.ui.processMonitor.setPlainText(self.processMonitorLog)

    def _storeNotification(self, data):
        self.logDebugMessage("Storing message to database...")
        return

        db = WebinyDatabase()
        data['data'] = WebinyJSON.encode(data['data'])
        query = "INSERT INTO notifications (reseller_slug, reseller_name, line, type, message, file, data) VALUES (?,?,?,?,?,?,?)"
        bind = (data['reseller_slug'], data['reseller_name'], data['line'], data['type'], data['message'], data['file'],
                data['data'])
        db.execute(query, bind)
        
        
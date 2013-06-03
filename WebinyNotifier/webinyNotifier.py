from time import gmtime, strftime
from PyQt4 import QtGui, QtCore
from lib.settings import Settings
from lib.mainWindow import MainWindow

from lib.listener import Listener
from lib.entity.request import Request
from lib.entity.settings import Settings as SettingsObj
from lib.tools.debugger import Debugger
from lib.tray import Tray
from PyQt4.QtCore import QObject


class WebinyNotifier(QtGui.QApplication, QObject):
    processMonitorLog = ''

    def __init__(self, args):
        QtGui.QApplication.__init__(self, args)
        QObject.__init__(self, args)
        self.setQuitOnLastWindowClosed(False)
        self.tray = Tray(parent=self)
        self.settingsForm = None
        self.logForm = None
        self.settings = SettingsObj()
        # Connect slot so Listener can forward request data to main thread
        self.listener = Listener()
        self.connect_slots(self.listener)
        self.listener.start()
        self.exec_()

    def restartListener(self):
        print "Restarting listener..."
        self.listener.stop()
        self.listener = Listener()
        self.connect_slots(self.listener)
        self.listener.start()

    def connect_slots(self, sender):
        self.connect(sender, QtCore.SIGNAL('newNotification'), self.newNotification)

    def newNotification(self, params):
        # Store new request
        request = Request()
        request.createFromNodeJs(params)

        # Notification balloon
        if bool(self.settings.show_balloon):
            message = "[" + strftime("%Y-%m-%d %H:%M:%S", gmtime()) + "] New notification received!"
            Debugger.log('Showing tray message: ' + message)
            self.tray.showMessage('Webiny Notifier', message, QtGui.QSystemTrayIcon.Information, 10000000)

    def openSettings(self):
        if self.settingsForm is None:
            self.settingsForm = Settings(self)
        self.settingsForm.show()

    def openLog(self):
        """
        if self.logForm is None:
            self.logForm = Log()
        self.logForm.show()
        """

    def exitApp(self):
        self.listener.stop()
        self.quit()

    def balloonClicked(self):
        Debugger.log('Balloon clicked')
        if not hasattr(self, "mainWindow"):
            self.mainWindow = MainWindow(self)
            self.mainWindow.activateWindow()
        if self.mainWindow.isVisible():
            self.mainWindow.focusWidget()
            return
        else:
            self.mainWindow.show()
            self.mainWindow.activateWindow()

    def iconClicked(self, reason):
        if reason == 2:
            Debugger.log('Tray icon clicked')
            if not hasattr(self, "mainWindow"):
                self.mainWindow = MainWindow(self)
                self.mainWindow.activateWindow()
            if self.mainWindow.isVisible():
                self.mainWindow.hide()
            else:
                self.mainWindow.show()
                self.mainWindow.activateWindow()
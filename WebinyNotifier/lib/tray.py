from PyQt4 import QtGui, QtCore

class Tray(QtGui.QSystemTrayIcon):
    
    def __init__(self, parent):
        # Create main widget
        self.widget = QtGui.QWidget()
        self.icon = QtGui.QIcon(":/webiny/webiny.png")
        super(Tray, self).__init__(self.icon, self.widget)
        self.setParent(parent)
        
        # Add signal handlers
        self.messageClicked.connect(self.parent().balloonClicked)
        self.activated.connect(self.parent().iconClicked)
        
        # Add context menu
        menu = QtGui.QMenu(self.widget)        
        settingsAction = menu.addAction("Settings")
        QtCore.QObject.connect(settingsAction, QtCore.SIGNAL("triggered()"), self.parent().openSettings)
        menu.addSeparator()
        exitAction = menu.addAction("Exit")
        QtCore.QObject.connect(exitAction, QtCore.SIGNAL("triggered()"), self.parent().exitApp)
        
        self.setContextMenu(menu)        
        self.show()
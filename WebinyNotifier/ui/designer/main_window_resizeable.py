# -*- coding: utf-8 -*-

# Form implementation generated from reading ui file 'main_window_resizeable.ui'
#
# Created: Sun Jun 02 13:33:51 2013
#      by: PyQt4 UI code generator 4.9.5
#
# WARNING! All changes made in this file will be lost!

from PyQt4 import QtCore, QtGui
from ui.wrappers.requestsTableView import RequestsTableView

try:
    _fromUtf8 = QtCore.QString.fromUtf8
except AttributeError:
    _fromUtf8 = lambda s: s

class Ui_MainWindow(object):
    def setupUi(self, MainWindow):
        MainWindow.setObjectName(_fromUtf8("MainWindow"))
        MainWindow.resize(995, 730)
        icon = QtGui.QIcon()
        icon.addPixmap(QtGui.QPixmap(_fromUtf8(":/webiny/favicon.ico")), QtGui.QIcon.Normal, QtGui.QIcon.Off)
        MainWindow.setWindowIcon(icon)
        MainWindow.setToolButtonStyle(QtCore.Qt.ToolButtonTextOnly)
        MainWindow.setUnifiedTitleAndToolBarOnMac(False)
        self.centralwidget = QtGui.QWidget(MainWindow)
        self.centralwidget.setObjectName(_fromUtf8("centralwidget"))
        self.gridLayout = QtGui.QGridLayout(self.centralwidget)
        self.gridLayout.setObjectName(_fromUtf8("gridLayout"))
        self.verticalLayout = QtGui.QVBoxLayout()
        self.verticalLayout.setObjectName(_fromUtf8("verticalLayout"))
        self.splitter = QtGui.QSplitter(self.centralwidget)
        self.splitter.setCursor(QtGui.QCursor(QtCore.Qt.ArrowCursor))
        self.splitter.setOrientation(QtCore.Qt.Vertical)
        self.splitter.setHandleWidth(10)
        self.splitter.setObjectName(_fromUtf8("splitter"))
        self.requestsTable = RequestsTableView(self.splitter)
        sizePolicy = QtGui.QSizePolicy(QtGui.QSizePolicy.Expanding, QtGui.QSizePolicy.Expanding)
        sizePolicy.setHorizontalStretch(0)
        sizePolicy.setVerticalStretch(0)
        sizePolicy.setHeightForWidth(self.requestsTable.sizePolicy().hasHeightForWidth())
        self.requestsTable.setSizePolicy(sizePolicy)
        self.requestsTable.setStyleSheet(_fromUtf8(""))
        self.requestsTable.setSelectionMode(QtGui.QAbstractItemView.SingleSelection)
        self.requestsTable.setSelectionBehavior(QtGui.QAbstractItemView.SelectRows)
        self.requestsTable.setShowGrid(True)
        self.requestsTable.setObjectName(_fromUtf8("requestsTable"))
        self.requestsTable.horizontalHeader().setStretchLastSection(True)
        self.notificationTabs = QtGui.QTabWidget(self.splitter)
        self.notificationTabs.setEnabled(True)
        self.notificationTabs.setMovable(True)
        self.notificationTabs.setObjectName(_fromUtf8("notificationTabs"))
        self.messagesTab = QtGui.QWidget()
        self.messagesTab.setObjectName(_fromUtf8("messagesTab"))
        self.verticalLayout_2 = QtGui.QVBoxLayout(self.messagesTab)
        self.verticalLayout_2.setObjectName(_fromUtf8("verticalLayout_2"))
        self.messagesTable = QtGui.QTableView(self.messagesTab)
        self.messagesTable.setObjectName(_fromUtf8("messagesTable"))
        self.messagesTable.horizontalHeader().setVisible(False)
        self.messagesTable.horizontalHeader().setStretchLastSection(True)
        self.verticalLayout_2.addWidget(self.messagesTable)
        self.notificationTabs.addTab(self.messagesTab, _fromUtf8(""))
        self.verticalLayout.addWidget(self.splitter)
        self.gridLayout.addLayout(self.verticalLayout, 0, 0, 1, 1)
        MainWindow.setCentralWidget(self.centralwidget)
        self.menuBar = QtGui.QMenuBar(MainWindow)
        self.menuBar.setGeometry(QtCore.QRect(0, 0, 995, 21))
        self.menuBar.setObjectName(_fromUtf8("menuBar"))
        self.menuFile = QtGui.QMenu(self.menuBar)
        self.menuFile.setObjectName(_fromUtf8("menuFile"))
        MainWindow.setMenuBar(self.menuBar)
        self.actionClose = QtGui.QAction(MainWindow)
        icon1 = QtGui.QIcon()
        icon1.addPixmap(QtGui.QPixmap(_fromUtf8(":/webiny/exit-btn.png")), QtGui.QIcon.Normal, QtGui.QIcon.Off)
        self.actionClose.setIcon(icon1)
        self.actionClose.setObjectName(_fromUtf8("actionClose"))
        self.actionSettings = QtGui.QAction(MainWindow)
        icon2 = QtGui.QIcon()
        icon2.addPixmap(QtGui.QPixmap(_fromUtf8(":/webiny/settings-btn.png")), QtGui.QIcon.Normal, QtGui.QIcon.Off)
        self.actionSettings.setIcon(icon2)
        self.actionSettings.setObjectName(_fromUtf8("actionSettings"))
        self.actionLog = QtGui.QAction(MainWindow)
        icon3 = QtGui.QIcon()
        icon3.addPixmap(QtGui.QPixmap(_fromUtf8(":/webiny/log-btn.png")), QtGui.QIcon.Normal, QtGui.QIcon.Off)
        self.actionLog.setIcon(icon3)
        self.actionLog.setObjectName(_fromUtf8("actionLog"))
        self.menuFile.addAction(self.actionSettings)
        self.menuFile.addAction(self.actionLog)
        self.menuFile.addSeparator()
        self.menuFile.addAction(self.actionClose)
        self.menuBar.addAction(self.menuFile.menuAction())

        self.retranslateUi(MainWindow)
        self.notificationTabs.setCurrentIndex(0)
        QtCore.QMetaObject.connectSlotsByName(MainWindow)

    def retranslateUi(self, MainWindow):
        MainWindow.setWindowTitle(QtGui.QApplication.translate("MainWindow", "Webiny Tray Logger", None, QtGui.QApplication.UnicodeUTF8))
        self.notificationTabs.setTabText(self.notificationTabs.indexOf(self.messagesTab), QtGui.QApplication.translate("MainWindow", "Messages", None, QtGui.QApplication.UnicodeUTF8))
        self.menuFile.setTitle(QtGui.QApplication.translate("MainWindow", "Menu", None, QtGui.QApplication.UnicodeUTF8))
        self.actionClose.setText(QtGui.QApplication.translate("MainWindow", "Close", None, QtGui.QApplication.UnicodeUTF8))
        self.actionSettings.setText(QtGui.QApplication.translate("MainWindow", "Settings", None, QtGui.QApplication.UnicodeUTF8))
        self.actionLog.setText(QtGui.QApplication.translate("MainWindow", "Log", None, QtGui.QApplication.UnicodeUTF8))

import webiny_rc

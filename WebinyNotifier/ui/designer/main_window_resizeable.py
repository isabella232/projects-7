# -*- coding: utf-8 -*-

# Form implementation generated from reading ui file 'main_window_resizeable.ui'
#
# Created: Thu Jun 06 20:17:18 2013
#      by: PyQt4 UI code generator 4.9.5
#
# WARNING! All changes made in this file will be lost!

from PyQt4 import QtCore, QtGui
from ui.wrappers.messagesTableView import MessagesTableView
from ui.wrappers.requestsTableView import RequestsTableView
from ui.wrappers.treeView import TreeView

try:
    _fromUtf8 = QtCore.QString.fromUtf8
except AttributeError:
    _fromUtf8 = lambda s: s

class Ui_MainWindow(object):
    def setupUi(self, MainWindow):
        """

        @param MainWindow:
        """
        MainWindow.setObjectName(_fromUtf8("MainWindow"))
        MainWindow.resize(995, 730)
        icon = QtGui.QIcon()
        icon.addPixmap(QtGui.QPixmap(_fromUtf8(":/webiny/webiny.png")), QtGui.QIcon.Normal, QtGui.QIcon.Off)
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
        self.requestsTable.setSelectionMode(QtGui.QAbstractItemView.ExtendedSelection)
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
        self.messagesTable = MessagesTableView(self.messagesTab)
        self.messagesTable.setSelectionMode(QtGui.QAbstractItemView.SingleSelection)
        self.messagesTable.setSelectionBehavior(QtGui.QAbstractItemView.SelectRows)
        self.messagesTable.setObjectName(_fromUtf8("messagesTable"))
        self.messagesTable.horizontalHeader().setVisible(True)
        self.messagesTable.horizontalHeader().setStretchLastSection(True)
        self.verticalLayout_2.addWidget(self.messagesTable)
        self.notificationTabs.addTab(self.messagesTab, _fromUtf8(""))
        self.contextTab = QtGui.QWidget()
        self.contextTab.setObjectName(_fromUtf8("contextTab"))
        self.verticalLayout_3 = QtGui.QVBoxLayout(self.contextTab)
        self.verticalLayout_3.setObjectName(_fromUtf8("verticalLayout_3"))
        self.contextTreeView = TreeView(self.contextTab)
        self.contextTreeView.setObjectName(_fromUtf8("contextTreeView"))
        self.verticalLayout_3.addWidget(self.contextTreeView)
        #self.notificationTabs.addTab(self.contextTab, _fromUtf8(""))
        self.extraTab = QtGui.QWidget()
        self.extraTab.setObjectName(_fromUtf8("extraTab"))
        self.verticalLayout_4 = QtGui.QVBoxLayout(self.extraTab)
        self.verticalLayout_4.setObjectName(_fromUtf8("verticalLayout_4"))
        self.extraTreeView = TreeView(self.extraTab)
        self.extraTreeView.setObjectName(_fromUtf8("extraTreeView"))
        self.verticalLayout_4.addWidget(self.extraTreeView)
        #self.notificationTabs.addTab(self.extraTab, _fromUtf8(""))
        self.getTab = QtGui.QWidget()
        self.getTab.setObjectName(_fromUtf8("getTab"))
        self.verticalLayout_5 = QtGui.QVBoxLayout(self.getTab)
        self.verticalLayout_5.setObjectName(_fromUtf8("verticalLayout_5"))
        self.getTreeView = TreeView(self.getTab)
        self.getTreeView.setObjectName(_fromUtf8("getTreeView"))
        self.verticalLayout_5.addWidget(self.getTreeView)
        #self.notificationTabs.addTab(self.getTab, _fromUtf8(""))
        self.postTab = QtGui.QWidget()
        self.postTab.setObjectName(_fromUtf8("postTab"))
        self.verticalLayout_6 = QtGui.QVBoxLayout(self.postTab)
        self.verticalLayout_6.setObjectName(_fromUtf8("verticalLayout_6"))
        self.postTreeView = TreeView(self.postTab)
        self.postTreeView.setObjectName(_fromUtf8("postTreeView"))
        self.verticalLayout_6.addWidget(self.postTreeView)
        #self.notificationTabs.addTab(self.postTab, _fromUtf8(""))
        self.serverTab = QtGui.QWidget()
        self.serverTab.setObjectName(_fromUtf8("serverTab"))
        self.verticalLayout_7 = QtGui.QVBoxLayout(self.serverTab)
        self.verticalLayout_7.setObjectName(_fromUtf8("verticalLayout_7"))
        self.serverTreeView = TreeView(self.serverTab)
        self.serverTreeView.setObjectName(_fromUtf8("serverTreeView"))
        self.verticalLayout_7.addWidget(self.serverTreeView)
        #self.notificationTabs.addTab(self.serverTab, _fromUtf8(""))
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
        self.notificationTabs.setTabText(self.notificationTabs.indexOf(self.contextTab), QtGui.QApplication.translate("MainWindow", "Context", None, QtGui.QApplication.UnicodeUTF8))
        self.notificationTabs.setTabText(self.notificationTabs.indexOf(self.extraTab), QtGui.QApplication.translate("MainWindow", "Extra", None, QtGui.QApplication.UnicodeUTF8))
        self.notificationTabs.setTabText(self.notificationTabs.indexOf(self.getTab), QtGui.QApplication.translate("MainWindow", "$_GET", None, QtGui.QApplication.UnicodeUTF8))
        self.notificationTabs.setTabText(self.notificationTabs.indexOf(self.postTab), QtGui.QApplication.translate("MainWindow", "$_POST", None, QtGui.QApplication.UnicodeUTF8))
        self.notificationTabs.setTabText(self.notificationTabs.indexOf(self.serverTab), QtGui.QApplication.translate("MainWindow", "$_SERVER", None, QtGui.QApplication.UnicodeUTF8))
        self.menuFile.setTitle(QtGui.QApplication.translate("MainWindow", "Menu", None, QtGui.QApplication.UnicodeUTF8))
        self.actionClose.setText(QtGui.QApplication.translate("MainWindow", "Close", None, QtGui.QApplication.UnicodeUTF8))
        self.actionSettings.setText(QtGui.QApplication.translate("MainWindow", "Settings", None, QtGui.QApplication.UnicodeUTF8))
        self.actionLog.setText(QtGui.QApplication.translate("MainWindow", "Log", None, QtGui.QApplication.UnicodeUTF8))
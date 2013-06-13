from PyQt4 import QtGui, QtCore
from lib.entity.request import Request
from lib.entity.settings import Settings
from lib.entity.viewModel.messagesTableModel import MessagesTableModel
from lib.entity.viewModel.requestTableModel import RequestTableModel
from lib.entity.viewModel.treeViewModel import TreeViewModel
from ui.wrappers.mainWindow import MainWindow as UiMainWindow


class MainWindow(QtGui.QMainWindow):
    model = None

    def __init__(self, parent):
        QtGui.QMainWindow.__init__(self)
        self.WebinyNotifier = parent
        self.settings = Settings()
        self.geometry = None
        self.ui = UiMainWindow()
        self.ui.setupUi(self)

        # Setup table models
        self._requestModel = RequestTableModel(Request.all(), self)
        self._messagesModel = MessagesTableModel([])
        self._serverModel = TreeViewModel([])

    def changeEvent(self, event):
        if self.isMinimized():
            self.geometry = bytearray(self.saveGeometry())
        else:
            if self.geometry is not None:
                self.restoreGeometry(self.geometry)
                self.geometry = None

    def show(self):
        # Requests table
        self.ui.getRequestsTable().verticalHeader().setVisible(False)
        self.ui.getRequestsTable().setModel(self._requestModel)
        self.ui.getRequestsTable().resizeColumnsToContents()
        self.ui.getRequestsTable().horizontalHeader().setStretchLastSection(True)

        # Messages table
        self.ui.getMessagesTable().verticalHeader().setVisible(False)
        self.ui.getMessagesTable().setModel(self._messagesModel)
        self.ui.getMessagesTable().resizeColumnsToContents()
        self.ui.getMessagesTable().horizontalHeader().setStretchLastSection(True)

        for view in [self.ui.contextTreeView, self.ui.extraTreeView, self.ui.getTreeView, self.ui.postTreeView,
                     self.ui.serverTreeView]:
            view.setModel(TreeViewModel([]))
            view.expanded.connect(view.itemManipulated)
            view.collapsed.connect(view.itemManipulated)

        # Attach events for Requests adn Messages row selection
        self.ui.getRequestsTable().selectionModel().selectionChanged.connect(self._loadMessages)
        self.ui.getMessagesTable().selectionModel().selectionChanged.connect(self._loadMessageData)
        self.connect(self.ui.getRequestsTable(), QtCore.SIGNAL("requestDeleted"), self._requestDeleted)

        # Show window
        super(MainWindow, self).show()

    def on_actionClose_triggered(self):
        self.hide()

    def on_actionSettings_triggered(self):
        self.WebinyNotifier.openSettings()

    def on_actionLog_triggered(self):
        self.WebinyNotifier.openLog()

    def refreshRequestModel(self):
        self._requestModel.reset()
        self.ui.getRequestsTable().resizeColumnsToContents()
        self.ui.getRequestsTable().horizontalHeader().setStretchLastSection(True)

    def selectFirstRow(self):
        self.ui.getRequestsTable().selectRow(0)

    def _loadMessages(self, item):
        self._hideAllTabs()
        request = self._requestModel.getRequestAtIndex(item.indexes()[0].row())
        self._messagesModel.refreshModelFromRequest(item, request)
        self.ui.getMessagesTable().resizeColumnsToContents()
        self.ui.getMessagesTable().horizontalHeader().setStretchLastSection(True)

        # Set tree views
        self._setTreeView(3, self.ui.getTab, "$_GET", self.ui.getTreeView, request.getGet())
        self._setTreeView(4, self.ui.postTab, "$_POST", self.ui.postTreeView, request.getPost())
        self._setTreeView(5, self.ui.serverTab, "$_SERVER", self.ui.serverTreeView, request.getServer())

        self.ui.notificationTabs.setCurrentIndex(0)

        if not request.getRead():
            request.markAsRead()
            self._requestModel.setData(item, request, QtCore.Qt.FontRole)

    def _loadMessageData(self, item):
        message = self._messagesModel.getMessageAtIndex(item.indexes()[0].row())
        self._setTreeView(1, self.ui.contextTab, "Context", self.ui.contextTreeView, message.getContext())
        self._setTreeView(2, self.ui.extraTab, "Extra", self.ui.extraTreeView, message.getExtra())

    def _setTreeView(self, index, tab, tabName, view, data):
        if len(data) > 0:
            self._showTab(index, tab, tabName)
            view.setModel(TreeViewModel(data))
            view.setAlternatingRowColors(True)
            view.resizeColumnToContents(0)
        else:
            self.ui.notificationTabs.removeTab(self.ui.notificationTabs.indexOf(tab))

    def _showTab(self, index, tab, name):
        self.ui.notificationTabs.insertTab(index, tab, name)

    def _requestDeleted(self, index):
        Request.delete(index)
        self._requestModel.refreshModel()
        self.ui.getRequestsTable().selectRow(index)

        if len(self._requestModel.arrayData) == 0:
            self._messagesModel.arrayData = []
            self._messagesModel.reset()
            # Hide all tabs if no more requests exist
            self._hideAllTabs()

    def _hideAllTabs(self):
        self.ui.notificationTabs.removeTab(1)
        self.ui.notificationTabs.removeTab(2)
        self.ui.notificationTabs.removeTab(3)
        self.ui.notificationTabs.removeTab(4)

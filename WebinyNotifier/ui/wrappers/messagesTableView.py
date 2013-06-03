from PyQt4 import QtGui
from PyQt4.QtGui import QTableView
from lib.entity.request import Request
from lib.entity.viewModel.messagesTableModel import MessagesTableModel


class MessagesTableView(QTableView):

    def __init__(self, QWidget_parent=None):
        QTableView.__init__(self, QWidget_parent)
        self.model = None
        self.verticalHeader().setVisible(False)

    def refreshModelFromRequest(self, item):
        request = Request._TABLE_MODEL.getRequestAtIndex(item.indexes()[0].row())

        if self.model is None:
            self.model = MessagesTableModel(request.getMessages(), Request._TABLE_MODEL.parent)
            self.setModel(self.model)
            # Attach handler for Messages row selection
            self.selectionModel().selectionChanged.connect(self.showMessageDetails)
        else:
            self.model.arrayData = request.getMessages()
            self.model.refreshModel()
        self.resizeColumnsToContents()
        self.horizontalHeader().setStretchLastSection(True)

    def showMessageDetails(self, item):
        self.tabs.removeTab(1)

        newTab = QtGui.QWidget()
        newTab.setObjectName("newTab")
        self.tabs.addTab(newTab, "Row " + str(item.indexes()[0].row()))



from PyQt4 import QtGui
from PyQt4.QtGui import QTableView
from lib.entity.request import Request
from lib.entity.viewModel.messagesTableModel import MessagesTableModel


class MessagesTableView(QTableView):

    def __init__(self, QWidget_parent=None):
        QTableView.__init__(self, QWidget_parent)
        self.model = None
        self.verticalHeader().setVisible(False)
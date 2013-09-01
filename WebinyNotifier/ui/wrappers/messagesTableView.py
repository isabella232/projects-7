from PyQt4.QtGui import QTableView

class MessagesTableView(QTableView):

    def __init__(self, QWidget_parent=None):
        QTableView.__init__(self, QWidget_parent)
        self.model = None
        self.verticalHeader().setVisible(False)


from PyQt4 import QtCore
from PyQt4.QtGui import QTableView


class RequestsTableView(QTableView):

    def keyPressEvent(self, event):
        if event.key() == QtCore.Qt.Key_Delete:
            if len(self.selectedIndexes()) > 0:
                index = self.selectedIndexes()[0].row()
                self.emit(QtCore.SIGNAL("requestDeleted"), index)
        else:
            QTableView.keyPressEvent(self, event)
from PyQt4 import QtCore
from PyQt4.QtGui import QTableView


class RequestsTableView(QTableView):
    def keyPressEvent(self, event):
        if event.key() == QtCore.Qt.Key_Delete:
            if len(self.selectedIndexes()) > 0:
                indexes = self.selectedIndexes()
                rowIndexes = []

                for i in range(0, len(indexes), 4):
                    index = indexes[i]
                    rowIndexes.append(index.row())
                self.emit(QtCore.SIGNAL("requestDeleted"), rowIndexes)
        else:
            QTableView.keyPressEvent(self, event)
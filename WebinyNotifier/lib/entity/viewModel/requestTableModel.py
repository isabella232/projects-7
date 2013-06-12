from PyQt4 import QtCore, QtGui
from PyQt4.QtCore import QModelIndex


class RequestTableModel(QtCore.QAbstractTableModel):
    def __init__(self, dataIn, parent=None, *args):
        QtCore.QAbstractTableModel.__init__(self, parent, *args)
        self.parent = parent
        self.arrayData = dataIn
        self.headerData = ['Datetime', 'URL', 'Memory', 'Stats']
        self.tableData = ['getDateTime', 'getUrl', 'getMemory', 'getStats']
        self._emptyVariant = QtCore.QVariant()

    def rowCount(self, parent):
        return len(self.arrayData)

    def columnCount(self, parent):
        return len(self.headerData)

    def removeRow(self, index, newItem):
        del self.arrayData[index]
        self.arrayData.append(newItem)
        self.dataChanged(QModelIndex(), QModelIndex())

    def setData(self, index, value, role):
        if role == QtCore.Qt.FontRole:
            font = QtGui.QFont()
            font.setBold(not value.getRead())
            return font
        return True

    def data(self, index, role):
        """:type: Request Current instance"""
        request = self.arrayData[index.row()]

        if not index.isValid():
            return self._emptyVariant
        elif role == QtCore.Qt.BackgroundColorRole:
            pass
            #color = QtGui.QColor(177, 199, 235)
            #return QtCore.QVariant(color)
        elif role == QtCore.Qt.FontRole:
             font = QtGui.QFont()
             font.setBold(not request.getRead())
             return font
        elif role == QtCore.Qt.DisplayRole:
            method = self.tableData[index.column()]
            data = getattr(request, method)()
            return QtCore.QVariant(data)
        return self._emptyVariant

    def headerData(self, col, orientation, role):
        if orientation == QtCore.Qt.Horizontal and role == QtCore.Qt.DisplayRole:
            return QtCore.QVariant(self.headerData[col])
        return QtCore.QVariant()

    def refreshModel(self):
        self.reset()

    def getRequestAtIndex(self, rowIndex):
        return self.arrayData[rowIndex]
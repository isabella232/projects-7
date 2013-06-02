from PyQt4 import QtCore, QtGui
from lib.entity.viewModel.delegate.colorPickerFrame import ColorPickerFrame


class LogLevelsTableModel(QtCore.QAbstractTableModel):
    def __init__(self, dataIn, parent=None, *args):
        QtCore.QAbstractTableModel.__init__(self, parent, *args)
        self.parent = parent
        self.arrayData = self._prepareData(dataIn)
        self.headerData = ['Level', 'Balloon', 'Color']

    def rowCount(self, parent):
        return len(self.arrayData)

    def columnCount(self, parent):
        return len(self.headerData)

    def data(self, index, role):
        value = self.arrayData[index.row()][index.column()]
        if not index.isValid():
            return self._emptyVariant
        elif role == QtCore.Qt.DisplayRole:
            if index.column() == 0:
                return QtCore.QVariant(value.capitalize())
            return None
        elif index.column() == 1 and role == QtCore.Qt.CheckStateRole:
            if value != 0:
                return QtCore.Qt.Checked
            else:
                return QtCore.Qt.Unchecked
        elif index.column() == 1 and role == QtCore.Qt.TextAlignmentRole:
            return QtCore.Qt.AlignHCenter
        return None

    def setData(self, index, value, role):
        if index.column() == 1 and role == QtCore.Qt.CheckStateRole:
            currData = self.arrayData[index.row()]
            if int(value.toString()) == QtCore.Qt.Checked:
                self.arrayData[index.row()] = (currData[0], 1, currData[2])
            else:
                self.arrayData[index.row()] = (currData[0], 0, currData[2])
        if index.column() == 2 and role == QtCore.Qt.DisplayRole:
            currData = self.arrayData[index.row()]
            self.arrayData[index.row()] = (currData[0], currData[1], str(value))

        self.dataChanged.emit(index, index)
        return True

    def headerData(self, col, orientation, role):
        if orientation == QtCore.Qt.Horizontal and role == QtCore.Qt.DisplayRole:
            return QtCore.QVariant(self.headerData[col])
        return QtCore.QVariant()

    def flags(self, index):
        flags = super(LogLevelsTableModel, self).flags(index)
        if index.column() == 1:
            flags |= QtCore.Qt.ItemIsUserCheckable
        return flags

    """
    Custom methods
    """

    def getData(self):
        data = {}
        for i in self.arrayData:
            data[i[0]] = {
                'balloon': i[1],
                'color': i[2]
            }
        return data

    def refreshModel(self):
        self.reset()

    def getRowData(self, index):
        return self.arrayData[index.row()]

    def _prepareData(self, data):
        newData = []

        for k in data:
            newData.append((k, data[k]['balloon'], data[k]['color']))
        return newData
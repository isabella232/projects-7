from PyQt4 import QtCore, QtGui
from PyQt4.QtGui import QFrame, QColor
from lib.entity.settings import Settings


class MessagesTableModel(QtCore.QAbstractTableModel):
    def __init__(self, dataIn, parent=None, *args):
        self.settings = Settings()
        QtCore.QAbstractTableModel.__init__(self, parent, *args)
        self.parent = parent
        self.arrayData = dataIn
        self.headerData = ['Datetime', 'Level', 'Group', 'Message']
        self.tableData = ['getDateTime', 'getLevel', 'getGroup', 'getMessage']
        self._emptyVariant = QtCore.QVariant()

    def rowCount(self, parent):
        return len(self.arrayData)

    def columnCount(self, parent):
        return len(self.headerData)

    def data(self, index, role):
        """:type: Request Current instance"""
        message = self.arrayData[index.row()]

        if not index.isValid():
            return self._emptyVariant
        elif role == QtCore.Qt.BackgroundColorRole:
            colorCode = self.settings.log_levels[message.getLevel()]['color']
            return QtCore.QVariant(QtGui.QColor(colorCode))
        elif role == QtCore.Qt.DisplayRole:
            # Get method to call
            method = self.tableData[index.column()]
            data = getattr(message, method)()

            # Capitalize if column is "Level"
            if index.column() == 1:
                data = data.capitalize()

            return QtCore.QVariant(data)
        return self._emptyVariant

    def headerData(self, col, orientation, role):
        if orientation == QtCore.Qt.Horizontal and role == QtCore.Qt.DisplayRole:
            return QtCore.QVariant(self.headerData[col])
        return QtCore.QVariant()

    def refreshModelFromRequest(self, item, request):
        self.arrayData = request.getMessages()
        self.reset()

    def getMessageAtIndex(self, rowIndex):
        return self.arrayData[rowIndex]
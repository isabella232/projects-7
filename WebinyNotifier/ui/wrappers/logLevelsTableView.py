from PyQt4 import QtGui
from PyQt4.QtGui import QTableView
from lib.entity.viewModel.delegate.colorPickerDelegate import ColorPickerDelegate


class LogLevelsTableView(QTableView):

    def __init__(self, *args, **kwargs):
        QTableView.__init__(self, *args, **kwargs)

        # Set the delegate for color column
        self.setItemDelegateForColumn(2, ColorPickerDelegate(self))

    def colorPickerClicked(self, mouseEvent):
        col = QtGui.QColorDialog.getColor()

        if col.isValid():
            self.frm.setStyleSheet("QWidget { background-color: %s }" % col.name())
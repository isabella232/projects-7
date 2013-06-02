from PyQt4 import QtCore, QtGui
from PyQt4.QtGui import QItemDelegate, QColor, QFrame
from lib.entity.settings import Settings
from lib.entity.viewModel.delegate.colorPickerFrame import ColorPickerFrame


class ColorPickerDelegate(QItemDelegate):
    """
    A delegate that places a fully functioning QPushButton in every
    cell of the column to which it's applied
    """

    def __init__(self, parent):
        # The parent is not an optional argument for the delegate as
        # we need to reference it in the paint method (see below)
        QItemDelegate.__init__(self, parent)

    def paint(self, painter, option, index):
        # This method will be called every time a particular cell is
        # in view and that view is changed in some way. We ask the 
        # delegates parent (in this case a table view) if the index
        # in question (the table cell) already has a widget associated 
        # with it. If not, create one with the text for this index and
        # connect its clicked signal to a slot in the parent view so 
        # we are notified when its used and can do something. 
        if not self.parent().indexWidget(index):
            rowData = Settings.getLogLevelsModel().getRowData(index)

            col = QColor(rowData[2])
            self.frm = ColorPickerFrame()
            # Set index of current table row
            self.frm.setIndex(index)
            self.frm.setStyleSheet("QWidget { background-color: %s }" % col.name())
            self.frm.setGeometry(130, 22, 100, 100)
            self.frm.setLineWidth(0)
            self.frm.setMidLineWidth(2)
            self.frm.setFrameStyle(QFrame.Box)
            self.frm.setFrameShadow(QFrame.Sunken)
            self.connect(self.frm, QtCore.SIGNAL('colorPickerClicked'), self.colorPickerClicked)
            self.parent().setIndexWidget(index, self.frm)

    def colorPickerClicked(self, item):
        col = QtGui.QColorDialog.getColor()

        if col.isValid():
            item.setStyleSheet("QWidget { background-color: %s }" % col.name())
            Settings.getLogLevelsModel().setData(item.getIndex(), col.name(), QtCore.Qt.DisplayRole)

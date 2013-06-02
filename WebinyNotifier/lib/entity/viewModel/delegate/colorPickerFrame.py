from PyQt4 import QtCore
from PyQt4.QtGui import QFrame


class ColorPickerFrame(QFrame):

    def setIndex(self, index):
        self.index = index

    def getIndex(self):
        return self.index

    def mousePressEvent(self, *args, **kwargs):
        QFrame.mousePressEvent(self, *args, **kwargs)
        self.emit(QtCore.SIGNAL("colorPickerClicked"), self)
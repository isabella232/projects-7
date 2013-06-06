from PyQt4.QtGui import QTreeView


class TreeView(QTreeView):

    def itemManipulated(self, index):
        self.resizeColumnToContents(0)
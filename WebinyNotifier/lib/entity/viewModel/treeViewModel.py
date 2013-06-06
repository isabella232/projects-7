from PyQt4 import QtCore, QtGui
from PyQt4.QtCore import QModelIndex
from lib.entity.viewModel.treeItem import TreeItem


class TreeViewModel(QtCore.QAbstractItemModel):

    def walk_dict(self, d,depth=0):
        tmp = []
        for k,v in sorted(d.items(),key=lambda x: x[0]):
            if isinstance(v, dict):
                tmp.append((k,self.walk_dict(v,depth+1)))
            else:
                tmp.append((k,v))
        return tmp

    def __init__(self, data, parent=None):
        super(TreeViewModel, self).__init__(parent)
        self.parent = parent
        self.header = ['Key', 'Value']
        self.rootItem = TreeItem(None, "ALL", None)
        self.parents = {0 : self.rootItem}
        self.setNewData(data)

    def setNewData(self, data):
        if len(data) == 0:
            data = []
        else:
            data = self.walk_dict(data)
        self.parents = {0 : self.rootItem}
        self._setupModelData(data)
        self.dataChanged.emit(QModelIndex(), QModelIndex())

    def columnCount(self, parent=None):
        if parent and parent.isValid():
            return parent.internalPointer().columnCount()
        else:
            return len(self.header)

    def data(self, index, role):
        if not index.isValid():
            return QtCore.QVariant()

        item = index.internalPointer()
        if role == QtCore.Qt.DisplayRole:
            return item.data(index.column())
        return QtCore.QVariant()

    def headerData(self, column, orientation, role):
        if (orientation == QtCore.Qt.Horizontal and
            role == QtCore.Qt.DisplayRole):
            try:
                return QtCore.QVariant(self.header[column])
            except IndexError:
                pass

        return QtCore.QVariant()

    def index(self, row, column, parent):
        if not self.hasIndex(row, column, parent):
            return QtCore.QModelIndex()

        if not parent.isValid():
            parentItem = self.rootItem
        else:
            parentItem = parent.internalPointer()

        childItem = parentItem.child(row)
        if childItem:
            return self.createIndex(row, column, childItem)
        else:
            return QtCore.QModelIndex()

    def parent(self, index):
        if not index.isValid():
            return QtCore.QModelIndex()

        childItem = index.internalPointer()
        if not childItem:
            return QtCore.QModelIndex()

        parentItem = childItem.parent()

        if parentItem == self.rootItem:
            return QtCore.QModelIndex()

        return self.createIndex(parentItem.row(), 0, parentItem)

    def rowCount(self, parent=QtCore.QModelIndex()):
        if parent.column() > 0:
            return 0
        if not parent.isValid():
            p_Item = self.rootItem
        else:
            p_Item = parent.internalPointer()
        return p_Item.childCount()

    def _setupModelData(self, data, parent = 0):

        for key, value in data:

            if self.parents.has_key(parent):
                parentItem = self.parents[parent]
            else:
                parentItem = self.rootItem

            if not isinstance(value, dict) and not isinstance(value, list):
                item = TreeItem({'key': key, 'value': value}, "", parentItem)
                parentItem.appendChild(item)
            else:
                newparent = TreeItem({'key': key, 'value': value}, "", parentItem)
                parentItem.appendChild(newparent)
                self.parents[key] = newparent
                self._setupModelData(value, key)
from PyQt4 import QtCore


class TreeItem(object):
    '''
    a python object used to return row/column data, and keep note of
    it's parents and/or children
    '''
    def __init__(self, variable, header, parentItem):
        self.variable = variable
        self.parentItem = parentItem
        self.header = header
        self.childItems = []

    def appendChild(self, item):
        self.childItems.append(item)

    def child(self, row):
        return self.childItems[row]

    def childCount(self):
        return len(self.childItems)

    def columnCount(self):
        return 2

    def data(self, column):
        if self.variable == None:
            if column == 0:
                return QtCore.QVariant("")
            if column == 1:
                return QtCore.QVariant("")
        else:
            if column == 0:
                return QtCore.QVariant(self.variable['key'])
            if column == 1:
                return QtCore.QVariant(self.variable['value'])
        return QtCore.QVariant()

    def parent(self):
        return self.parentItem

    def row(self):
        if self.parentItem:
            return self.parentItem.childItems.index(self)
        return 0
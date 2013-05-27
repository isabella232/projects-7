from PyQt4 import QtGui, QtCore
from lib.webinyJSON import WebinyJSON
from ui.main_window import Ui_MainWindow
from lib.webinyDatabase import WebinyDatabase

class WebinyNotifierLog(QtGui.QMainWindow):
    
    model = None
    WebinyNotifier = None

    def __init__(self, parent):
        QtGui.QMainWindow.__init__(self)
        self.WebinyNotifier = parent
        self.ui=Ui_MainWindow()
        self.ui.setupUi(self)
        
    def reject(self):
        self.hide()
        
    def show(self):
        self.ui.processMonitor.setPlainText(self.WebinyNotifier.processMonitorLog)
        self.notifications = self._getNotifications()
        # set the table model
        header = ['Message', 'Reseller slug', 'Reseller name', 'Type', 'File', 'Line']
        self.model = MyTableModel(self.notifications, header, self)
        self.model.setData(QtCore.QModelIndex(), QtCore.QVariant(), role=QtCore.Qt.EditRole)
        self.ui.viewNotifications.verticalHeader().setVisible(False)
        self.ui.viewNotifications.setModel(self.model)
        
        # Show window
        super(WebinyNotifierLog, self).show();
        self.ui.viewNotifications.selectionModel().selectionChanged.connect(self.selectionChanged)
        #self.model.insertRow(('Allowed memory size of 134217728 bytes exhausted (tried to allocate 57123364 bytes)', 'NOT!', 'Maritime Connector', 'error', 'skripta.php', '112'))

    def itemManipulated(self, index):
        view = 'viewGet'
        getattr(self.ui, view).resizeColumnToContents(0)
        #self.ui.viewGet.resizeColumnToContents(0)

    def selectionChanged(self, item):
        rowIndex = item.indexes()[0].row()
        row = self.notifications[rowIndex]

        # Notification details grid
        data = []
        header = ['Message', 'Reseller slug', 'Reseller name', 'Type', 'File', 'Line']
        for i in row:
            data.append([i])

        self.WebinyNotifier.logDebugMessage('Changed row: '+str(data[0])+' '+str(data[1]))
        
        self.ui.viewDetails.horizontalHeader().setVisible(False)
        self.ui.viewDetails.verticalHeader().setVisible(True)
        model = MyVerticalTableModel(data, header, self)
        model.setData(QtCore.QModelIndex(), QtCore.QVariant(), role=QtCore.Qt.EditRole)
        self.ui.viewDetails.setModel(model)

        # Notification GET tree
        data = WebinyJSON.decode(row['data'])
        model = MyTreeViewModel(data['get'], self)
        model.setData(QtCore.QModelIndex(), QtCore.QVariant(), role=QtCore.Qt.EditRole)
        self.ui.viewGet.setModel(model)
        self.ui.viewGet.setAlternatingRowColors(True)
        self.ui.viewGet.resizeColumnToContents(0)
        # Add signal to GET list
        self.ui.viewGet.expanded.connect(self.itemManipulated)
        self.ui.viewGet.collapsed.connect(self.itemManipulated)

        
        # Notification SERVER tree
        data = WebinyJSON.decode(row['data'])
        model = MyTreeViewModel(data['server'], self)
        model.setData(QtCore.QModelIndex(), QtCore.QVariant(), role=QtCore.Qt.EditRole)
        self.ui.viewServer.setModel(model)
        self.ui.viewServer.setAlternatingRowColors(True)
        
    def _getNotifications(self):
        db = WebinyDatabase()
        query = "SELECT * FROM notifications"
        return db.execute(query).fetchAll()


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

class MyTreeViewModel(QtCore.QAbstractItemModel):

    # IZDVOJI NEGDJE U TOOLS KLASU
    def walk_dict(self, d,depth=0):
        tmp = []
        for k,v in sorted(d.items(),key=lambda x: x[0]):
            if isinstance(v, dict):
                tmp.append((k,self.walk_dict(v,depth+1)))
            else:
                tmp.append((k,v))
        return tmp

    def __init__(self, data, parent=None):
        # Sort data
        data = self.walk_dict(data)
        super(MyTreeViewModel, self).__init__(parent)
        self.parent = parent
        self.variables = data
        self.header = ['Key', 'Value']
        self.rootItem = TreeItem(None, "ALL", None)
        self.parents = {0 : self.rootItem}
        self.setupModelData(self.variables)

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
        if role == QtCore.Qt.UserRole:
            if item:
                return item.person

        if role == QtCore.Qt.DecorationRole:
            return QtCore.QVariant(QtGui.QIcon("favicon.ico"))

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

    def setupModelData(self, data, parent = 0):

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
                self.setupModelData(value, key)

class MyTableModel(QtCore.QAbstractTableModel): 
    def __init__(self, datain, headerdata, parent=None, *args): 
        QtCore.QAbstractTableModel.__init__(self, parent, *args)
        self.parent = parent 
        self.arraydata = datain
        self.headerdata = headerdata
 
    def rowCount(self, parent): 
        return len(self.arraydata) 
 
    def columnCount(self, parent): 
        return len(self.headerdata)
 
 
    def data(self, index, role): 
        if not index.isValid(): 
            return QtCore.QVariant() 
        elif role != QtCore.Qt.DisplayRole: 
            return QtCore.QVariant() 
        return QtCore.QVariant(self.arraydata[index.row()][index.column()]) 

    def headerData(self, col, orientation, role):
        if orientation == QtCore.Qt.Horizontal and role == QtCore.Qt.DisplayRole:
            return QtCore.QVariant(self.headerdata[col])
        return QtCore.QVariant()
    
    
    def insertRow(self, row, parent=QtCore.QModelIndex()):
        self.beginInsertRows(parent, 0, 0)
        self.arraydata.insert(0, row)
        self.endInsertRows()
        
    def endInsertRows(self):
        super(MyTableModel, self).endInsertRows()
        self.parent.ui.viewNotifications.resizeColumnsToContents()

class MyVerticalTableModel(QtCore.QAbstractTableModel): 
    def __init__(self, datain, headerdata, parent=None, *args): 
        QtCore.QAbstractTableModel.__init__(self, parent, *args) 
        self.arraydata = datain
        self.headerdata = headerdata
 
    def rowCount(self, parent): 
        return len(self.headerdata)
 
    def columnCount(self, parent): 
        return 1 
 
    def data(self, index, role):
        if not index.isValid(): 
            return QtCore.QVariant() 
        elif role != QtCore.Qt.DisplayRole: 
            return QtCore.QVariant()
        return QtCore.QVariant(self.arraydata[index.row()][0])
    
    def headerData(self, section, orientation, role=QtCore.Qt.DisplayRole):
        if orientation == QtCore.Qt.Vertical and role == QtCore.Qt.DisplayRole:
            return QtCore.QVariant(self.headerdata[section])
        else:
            return QtCore.QVariant()

    
    
   
        
# -*- coding: utf-8 -*-

# Form implementation generated from reading ui file 'notifications.ui'
#
# Created: Fri Dec 07 14:29:06 2012
#      by: PyQt4 UI code generator 4.9.5
#
# WARNING! All changes made in this file will be lost!

from PyQt4 import QtCore, QtGui

try:
    _fromUtf8 = QtCore.QString.fromUtf8
except AttributeError:
    _fromUtf8 = lambda s: s

class Ui_Dialog(object):
    def setupUi(self, Dialog):
        Dialog.setObjectName(_fromUtf8("Dialog"))
        Dialog.resize(847, 513)
        icon = QtGui.QIcon()
        icon.addPixmap(QtGui.QPixmap(_fromUtf8("../favicon.ico")), QtGui.QIcon.Normal, QtGui.QIcon.Off)
        Dialog.setWindowIcon(icon)
        self.verticalLayout = QtGui.QVBoxLayout(Dialog)
        self.verticalLayout.setObjectName(_fromUtf8("verticalLayout"))
        self.horizontalLayout = QtGui.QHBoxLayout()
        self.horizontalLayout.setSizeConstraint(QtGui.QLayout.SetDefaultConstraint)
        self.horizontalLayout.setMargin(9)
        self.horizontalLayout.setObjectName(_fromUtf8("horizontalLayout"))
        self.notifications = QtGui.QTreeWidget(Dialog)
        self.notifications.setHorizontalScrollBarPolicy(QtCore.Qt.ScrollBarAlwaysOff)
        self.notifications.setAutoScroll(True)
        self.notifications.setHorizontalScrollMode(QtGui.QAbstractItemView.ScrollPerPixel)
        self.notifications.setObjectName(_fromUtf8("notifications"))
        self.horizontalLayout.addWidget(self.notifications)
        self.verticalLayout.addLayout(self.horizontalLayout)
        self.buttonBox = QtGui.QDialogButtonBox(Dialog)
        self.buttonBox.setOrientation(QtCore.Qt.Horizontal)
        self.buttonBox.setStandardButtons(QtGui.QDialogButtonBox.Cancel|QtGui.QDialogButtonBox.Ok)
        self.buttonBox.setObjectName(_fromUtf8("buttonBox"))
        self.verticalLayout.addWidget(self.buttonBox)

        self.retranslateUi(Dialog)
        QtCore.QObject.connect(self.buttonBox, QtCore.SIGNAL(_fromUtf8("accepted()")), Dialog.accept)
        QtCore.QObject.connect(self.buttonBox, QtCore.SIGNAL(_fromUtf8("rejected()")), Dialog.reject)
        QtCore.QObject.connect(Dialog, QtCore.SIGNAL(_fromUtf8("rejected()")), Dialog.reject)
        QtCore.QMetaObject.connectSlotsByName(Dialog)

    def retranslateUi(self, Dialog):
        Dialog.setWindowTitle(QtGui.QApplication.translate("Dialog", "Webiny Notifier - Notifications", None, QtGui.QApplication.UnicodeUTF8))
        self.notifications.headerItem().setText(0, QtGui.QApplication.translate("Dialog", "Type", None, QtGui.QApplication.UnicodeUTF8))
        self.notifications.headerItem().setText(1, QtGui.QApplication.translate("Dialog", "Reseller Name", None, QtGui.QApplication.UnicodeUTF8))
        self.notifications.headerItem().setText(2, QtGui.QApplication.translate("Dialog", "Reseller Slug", None, QtGui.QApplication.UnicodeUTF8))
        self.notifications.headerItem().setText(3, QtGui.QApplication.translate("Dialog", "Message", None, QtGui.QApplication.UnicodeUTF8))
        self.notifications.headerItem().setText(4, QtGui.QApplication.translate("Dialog", "File", None, QtGui.QApplication.UnicodeUTF8))
        self.notifications.headerItem().setText(5, QtGui.QApplication.translate("Dialog", "Line", None, QtGui.QApplication.UnicodeUTF8))


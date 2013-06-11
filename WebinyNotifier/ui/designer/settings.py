# -*- coding: utf-8 -*-

# Form implementation generated from reading ui file 'settings.ui'
#
# Created: Sun Jun 02 21:15:30 2013
#      by: PyQt4 UI code generator 4.9.5
#
# WARNING! All changes made in this file will be lost!

from PyQt4 import QtCore, QtGui
from ui.wrappers.logLevelsTableView import LogLevelsTableView

try:
    _fromUtf8 = QtCore.QString.fromUtf8
except AttributeError:
    _fromUtf8 = lambda s: s

class Ui_Form(object):
    def setupUi(self, Form):
        Form.setObjectName(_fromUtf8("Form"))
        Form.setEnabled(True)
        Form.resize(314, 354)
        sizePolicy = QtGui.QSizePolicy(QtGui.QSizePolicy.Fixed, QtGui.QSizePolicy.Fixed)
        sizePolicy.setHorizontalStretch(0)
        sizePolicy.setVerticalStretch(0)
        sizePolicy.setHeightForWidth(Form.sizePolicy().hasHeightForWidth())
        Form.setSizePolicy(sizePolicy)
        Form.setMinimumSize(QtCore.QSize(250, 0))
        icon = QtGui.QIcon()
        icon.addPixmap(QtGui.QPixmap(_fromUtf8(":/webiny/webiny.png")), QtGui.QIcon.Normal, QtGui.QIcon.Off)
        Form.setWindowIcon(icon)
        Form.setLocale(QtCore.QLocale(QtCore.QLocale.English, QtCore.QLocale.UnitedKingdom))
        self.verticalLayout_3 = QtGui.QVBoxLayout(Form)
        self.verticalLayout_3.setSizeConstraint(QtGui.QLayout.SetFixedSize)
        self.verticalLayout_3.setObjectName(_fromUtf8("verticalLayout_3"))
        self.verticalLayout = QtGui.QVBoxLayout()
        self.verticalLayout.setSizeConstraint(QtGui.QLayout.SetMinimumSize)
        self.verticalLayout.setObjectName(_fromUtf8("verticalLayout"))
        self.tabWidget = QtGui.QTabWidget(Form)
        self.tabWidget.setMinimumSize(QtCore.QSize(294, 305))
        self.tabWidget.setMaximumSize(QtCore.QSize(294, 305))
        self.tabWidget.setObjectName(_fromUtf8("tabWidget"))
        self.generalTab = QtGui.QWidget()
        self.generalTab.setObjectName(_fromUtf8("generalTab"))
        self.formLayout = QtGui.QFormLayout(self.generalTab)
        self.formLayout.setFieldGrowthPolicy(QtGui.QFormLayout.AllNonFixedFieldsGrow)
        self.formLayout.setObjectName(_fromUtf8("formLayout"))
        self.labelPort = QtGui.QLabel(self.generalTab)
        sizePolicy = QtGui.QSizePolicy(QtGui.QSizePolicy.Fixed, QtGui.QSizePolicy.Fixed)
        sizePolicy.setHorizontalStretch(0)
        sizePolicy.setVerticalStretch(0)
        sizePolicy.setHeightForWidth(self.labelPort.sizePolicy().hasHeightForWidth())
        self.labelPort.setSizePolicy(sizePolicy)
        self.labelPort.setObjectName(_fromUtf8("labelPort"))
        self.formLayout.setWidget(0, QtGui.QFormLayout.LabelRole, self.labelPort)
        self.port = QtGui.QLineEdit(self.generalTab)
        self.port.setPlaceholderText(_fromUtf8(""))
        self.port.setObjectName(_fromUtf8("port"))
        self.formLayout.setWidget(0, QtGui.QFormLayout.FieldRole, self.port)
        self.labelLatestRequests = QtGui.QLabel(self.generalTab)
        self.labelLatestRequests.setObjectName(_fromUtf8("labelLatestRequests"))
        self.formLayout.setWidget(1, QtGui.QFormLayout.LabelRole, self.labelLatestRequests)
        self.requestsLimit = QtGui.QLineEdit(self.generalTab)
        self.requestsLimit.setPlaceholderText(_fromUtf8(""))
        self.requestsLimit.setObjectName(_fromUtf8("requestsLimit"))
        self.formLayout.setWidget(1, QtGui.QFormLayout.FieldRole, self.requestsLimit)
        self.showBalloon = QtGui.QCheckBox(self.generalTab)
        self.showBalloon.setObjectName(_fromUtf8("showBalloon"))
        self.formLayout.setWidget(2, QtGui.QFormLayout.FieldRole, self.showBalloon)
        self.tabWidget.addTab(self.generalTab, _fromUtf8(""))
        self.colorTab = QtGui.QWidget()
        self.colorTab.setObjectName(_fromUtf8("colorTab"))
        self.verticalLayout_2 = QtGui.QVBoxLayout(self.colorTab)
        self.verticalLayout_2.setObjectName(_fromUtf8("verticalLayout_2"))
        self.logLevelsTable = LogLevelsTableView(self.colorTab)
        self.logLevelsTable.setObjectName(_fromUtf8("logLevelsTable"))
        self.logLevelsTable.horizontalHeader().setStretchLastSection(True)
        self.verticalLayout_2.addWidget(self.logLevelsTable)
        self.tabWidget.addTab(self.colorTab, _fromUtf8(""))
        self.verticalLayout.addWidget(self.tabWidget)
        self.verticalLayout_3.addLayout(self.verticalLayout)
        self.buttonBox = QtGui.QDialogButtonBox(Form)
        self.buttonBox.setStandardButtons(QtGui.QDialogButtonBox.Cancel|QtGui.QDialogButtonBox.Save)
        self.buttonBox.setObjectName(_fromUtf8("buttonBox"))
        self.verticalLayout_3.addWidget(self.buttonBox)

        self.retranslateUi(Form)
        self.tabWidget.setCurrentIndex(0)
        QtCore.QMetaObject.connectSlotsByName(Form)

    def retranslateUi(self, Form):
        Form.setWindowTitle(QtGui.QApplication.translate("Form", "Webiny Notificator - Settings", None, QtGui.QApplication.UnicodeUTF8))
        self.labelPort.setText(QtGui.QApplication.translate("Form", "Listening on port:", None, QtGui.QApplication.UnicodeUTF8))
        self.labelLatestRequests.setText(QtGui.QApplication.translate("Form", "Latest requests:", None, QtGui.QApplication.UnicodeUTF8))
        self.showBalloon.setText(QtGui.QApplication.translate("Form", "Show balloon notifications", None, QtGui.QApplication.UnicodeUTF8))
        self.tabWidget.setTabText(self.tabWidget.indexOf(self.generalTab), QtGui.QApplication.translate("Form", "General", None, QtGui.QApplication.UnicodeUTF8))
        self.tabWidget.setTabText(self.tabWidget.indexOf(self.colorTab), QtGui.QApplication.translate("Form", "Log levels", None, QtGui.QApplication.UnicodeUTF8))


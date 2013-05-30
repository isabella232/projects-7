from PyQt4 import QtCore
from PyQt4.QtCore import QObject
from time import strftime, gmtime

"""
Debugger class should be used through static log() method
It is not supposed to be instantiated
"""

class Debugger(QObject):
    _INSTANCE = None

    def __init__(self):
        QObject.__init__(self)
        self.log = ''

    def logMessage(self, message, level):
        levels = {
            'info': 'Info',
            'warning': 'Warning',
            'error': 'Warning',
            'debug': 'Debug'
        }

        time = strftime("%Y-%m-%d %H:%M:%S", gmtime())
        self.log += '[' + time + '][' + levels[level] + '] ' + message + '\n'
        self.emit(QtCore.SIGNAL('newDebuggerLog'))

    @staticmethod
    def getInstance():
        if Debugger._INSTANCE is None:
            Debugger._INSTANCE = Debugger()
        return Debugger._INSTANCE

    @staticmethod
    def log(message, level='info'):
        debugger = Debugger.getInstance()
        debugger.logMessage(message, level)

    @staticmethod
    def getLog():
        debugger = Debugger.getInstance()
        return debugger.log

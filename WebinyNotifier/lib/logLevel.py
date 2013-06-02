from PyQt4.QtGui import QColor


class LogLevel:
    EMERGENCY = 'emergency'
    ALERT = 'alert'
    CRITICAL = 'critical'
    ERROR = 'error'
    WARNING = 'warning'
    NOTICE = 'notice'
    INFO = 'info'
    DEBUG = 'debug'

    @staticmethod
    def getLogLevels():
        return ['emergency', 'alert', 'critical', 'error', 'warning', 'notice', 'info', 'debug']

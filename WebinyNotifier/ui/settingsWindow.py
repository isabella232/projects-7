from ui.designer.settings import Ui_Form


class SettingsWindow(Ui_Form):

    def getPort(self):
        return self.port

    def getShowBalloon(self):
        return self.showBalloon

    def getRequestsLimit(self):
        return self.requestsLimit

    def getLogLevelsTable(self):
        return self.logLevelsTable
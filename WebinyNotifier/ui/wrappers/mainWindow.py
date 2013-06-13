from ui.designer.main_window_resizeable import Ui_MainWindow


class MainWindow(Ui_MainWindow):


    def getRequestsTable(self):
        return self.requestsTable

    def getMessagesTable(self):
        return self.messagesTable


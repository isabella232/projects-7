#!/usr/bin/python
#############################
# WEBINY NOTIFIER      		#
# Protocol: XML-RPC         #
# Author: Pavel             #
#############################
from __future__ import with_statement
from PyQt4 import QtCore
import threading

from wsgiref.simple_server import make_server
import lib.tools.simplejsonrpc as jsonrpc
from PyQt4.QtCore import QObject


class Listener(threading.Thread, jsonrpc.JsonrpcHandler, QObject):
    port = 5000
    ip = "192.168.1.10"
    server = None

    # CLASS METHODS

    def __init__(self):
        threading.Thread.__init__(self)
        jsonrpc.JsonrpcHandler.__init__(self)
        QObject.__init__(self)

    def run(self):
        self.server = make_server(self.ip, self.port, self.application)
        print "Serving on port "+str(self.port)+"..."
        self.server.serve_forever()

    def application(self, environ, start_response):
        # assert environ["REQUEST_METHOD"] = "POST"
        content_length = int(environ["CONTENT_LENGTH"])

        # fetch the request body
        request = environ["wsgi.input"].read(content_length)

        # pass the request body to handle() method
        result = self.handle(request)

        start_response("200 OK", [])
        return [result]

    def stop(self):
        self.server.shutdown()

    def dispatch(self, method_name):
        if method_name == "new_notification":
            return self.newNotification
        else:
            return None

    def newNotification(self, params):
        self.emit(QtCore.SIGNAL('newNotification'), params)
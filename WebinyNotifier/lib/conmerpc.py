#!/usr/bin/python
#############################
# Simple Logger Client      #
# Protocol: XML-RPC         #
# Author: Pavel Denisjuk    #
#############################
from __future__ import with_statement
import xmlrpclib
import sys, getopt
from time import strftime, gmtime

class Logger(object):
	def __init__(self, host, port):
		self.host = host
		self.port = port
		self.session = self.connect()
		#self.time_format = "%d.%m.%Y - %H:%M:%S"
		self.time_format = "%H:%M:%S"
	
	def connect(self):		
		return xmlrpclib.ServerProxy("http://" + self.host + ":" + self.port)

	def log(self, value):
		t = strftime(self.time_format, gmtime())		
		self.session.write(value)

def main(argv):
	value = "New error from MARITIME CONNECTOR!"
	host = "192.168.1.28"
	port = "5000" 
	logger = Logger(host, port)
	logger.log(value)
	
if __name__ == "__main__":
	main(sys.argv[1:])	

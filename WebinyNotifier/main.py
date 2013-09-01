from webinyNotifier import WebinyNotifier
from resources import *
import sys


class output:
    def __init__(self):
        self.content = []

    def write(self, string):
        # Discard output
        pass


if __name__ == "__main__":
    # Override standard error output
    #out = output()
    #sys.stderr = out
    app = WebinyNotifier([])
    qInitResources()
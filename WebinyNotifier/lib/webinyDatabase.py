import sqlite3

class WebinyDatabase:
    
    connection = None
    cursor = None
    
    def __init__(self):
        if self.connection == None:
            self.connection = sqlite3.connect('webiny.db');
            self.connection.row_factory = sqlite3.Row
            self.connection.text_factory = sqlite3.OptimizedUnicode
            self.cursor = self.connection.cursor()
        
    def execute(self, query = '', bind = ()):
        self.cursor.execute(query, bind)        
        if not 'SELECT' in query:
            self.connection.commit()
            
        if 'INSERT' in query:
            self.last_inserted_id = self.cursor.lastrowid
        
        return self
    
    def fetchAll(self):
        return self.cursor.fetchall()
        
        
        
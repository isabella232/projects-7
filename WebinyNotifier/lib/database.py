import sqlite3

class Database:
    
    _connection = None
    _cursor = None
    
    def __init__(self):
        if self._connection == None:
            self._connection = sqlite3.connect('webiny.db')
            self._connection.row_factory = _dict_factory
            self._connection.text_factory = sqlite3.OptimizedUnicode
            self._cursor = self._connection.cursor()
        
    def execute(self, query = '', bind = ()):
        self._cursor.execute(query, bind)
        if not 'SELECT' in query:
            self._connection.commit()
            
        if 'INSERT' in query:
            self.last_inserted_id = self._cursor.lastrowid
        
        return self
    
    def fetchAll(self):
        return self._cursor.fetchall()

def _dict_factory(cursor, row):
    d = {}
    for idx, col in enumerate(cursor.description):
        d[col[0]] = row[idx]
    return d
        
        
        
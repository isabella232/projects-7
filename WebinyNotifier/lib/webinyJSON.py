import json

class WebinyJSON:
    
    @staticmethod
    def decode(value):
        return json.loads(value, object_hook=WebinyJSON._decode_dict)
    
    @staticmethod
    def encode(value):
        return json.dumps(value)
    
    @staticmethod
    def _decode_list(data):
        rv = []
        for item in data:
            if isinstance(item, unicode):
                item = item.encode('utf-8')
            elif isinstance(item, list):
                item = WebinyJSON._decode_list(item)
            elif isinstance(item, dict):
                item = WebinyJSON._decode_dict(item)
            rv.append(item)
        return rv
    
    @staticmethod
    def _decode_dict(data):
        rv = {}
        for key, value in data.iteritems():
            if isinstance(key, unicode):
                key = key.encode('utf-8')
            if isinstance(value, unicode):
                value = value.encode('utf-8')
            elif isinstance(value, list):
                value = WebinyJSON._decode_list(value)
            elif isinstance(value, dict):
                value = WebinyJSON._decode_dict(value)
            rv[key] = value
        return rv
        
        
        
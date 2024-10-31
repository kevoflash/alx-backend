#!/usr/bin/env python3
"""Basic dictionary"""

BasicCaching = __import__("base_caching").BaseCaching


class BasicCache(BasicCaching):
    """BasicCache class that inherits from BasicCaching"""

    def put(self, key, item):
        """Add an item in the cache"""
        if key and item:
            self.cache_data[key] = item

    def get(self, key):
        """Get an item by key"""
        if key in self.cache_data:
            return self.cache_data[key]
        return None

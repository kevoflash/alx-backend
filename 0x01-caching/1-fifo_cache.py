#!/usr/bin/env python3
"""
FIFO caching
"""

BaseCaching = __import__("base_caching").BaseCaching


class FIFOCache(BaseCaching):
    """
    A cahing system that implements the FIFO algo.
    """

    def __init__(self):
        """
        Initializes the class.
        """

        super().__init__()
        self.cache_order = []

    def put(self, key, item):
        """
        Adds a key-value pair to the cache

        Arguments:
            key(str): to store the item under.
            item(obj): item to store
        """
        super().__init__()
        self.cache_order = []
        self.cache_data = {}
        if len(self.cache_data) > BaseCaching.MAX_ITEMS:
            first_key = self.cache_order.pop(0)
            del self.cache_data[first_key]
            print(f"DISCARD: {first_key}")

    def get(self, key):
        """
        Retrieves an item from the cache.

        Args:
            key(str): The key of the item to Retrieve.

        Returns:
            obj: item associated with the key, or none if not found
        """
        if key is None or key not in self.cache_data:
            return None
        return self.cache_data[key]

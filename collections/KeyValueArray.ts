/*
 The KeyValueArray class is an array of generic KeyValuePair items. The key may be be duplicated.
 */

import {KeyValuePair} from './KeyValuePair';

export class KeyValueArray<K, V> extends Array<KeyValuePair<K, V>> {
  constructor(kevValueArray?: Array<KeyValuePair<K, V>>) {
    super();
    if (kevValueArray) {
      for (const item of kevValueArray) {
        this.push({key: item.key, value: item.value});
      }
    }
  }

  //Returns the first item with matching key
  //Returns null if cannot find one.
  getItemByKey = (key: K): KeyValuePair<K, V> => {
    for (const item of this) {
      if (item.key === key) {
        return item;
      }
    }
    return null;
  }

  //Returns the all items with matched key
  getItemsByKey = (key: K): KeyValueArray<K, V> => {
    const items = new KeyValueArray<K, V>();
    for (const item of this) {
      if (item.key === key) {
        items.push(item);
      }
    }
    return items;
  }

  //Get the value for first item with matching key
  //If key does not exist then return defaultVal
  getValueByKey = (key: K, defaultVal: V): V => {
    let val = defaultVal;
    const item = this.getItemByKey(key);
    if (item != null) {
      val = item.value;
    }
    return val;
  }


  //Sorts the array base on the key ascending
  sortByKeyAscending = () => {
    this.sort((a, b): number => {
      if (a.key < b.key) {
        return -1;
      } else if (a.key === b.key) {
        return 0;
      } else {
        return 1;
      }
    });
  }

  //Sorts the array base on the key descending
  sortByKeyDescending = () => {
    this.sort((a, b): number => {
      if (a.key < b.key) {
        return 1;
      } else if (a.key === b.key) {
        return 0;
      } else {
        return -1;
      }
    });
  }

  //Sorts the array base on the value ascending
  sortByValueAscending = () => {
    this.sort((a, b): number => {
      if (a.value < b.value) {
        return -1;
      } else if (a.value === b.value) {
        return 0;
      } else {
        return 1;
      }
    });
  }

  //Sorts the array base on the value descending
  sortByValueDescending = () => {
    this.sort((a, b): number => {
      if (a.value < b.value) {
        return 1;
      } else if (a.value === b.value) {
        return 0;
      } else {
        return -1;
      }
    });
  }


  //Returns a new array of items with new "key" and "value" name.
  //We'll use this to convert to array with different name for the key and value for backward compatibility with JS code.
  changeKeyValueName = (keyName: string, valueName: string): Array<any> => {
    const newArray = [];
    for (const item of this) {
      const newItem = {};
      newItem[keyName] = item.key;
      newItem[valueName] = item.value;
      newArray.push(newItem);
    }
    return newArray;
  }
}

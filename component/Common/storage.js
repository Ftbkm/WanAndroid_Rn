import {AsyncStorage} from 'react-native';
import Storage from 'react-native-storage';
import sync from './sync';

let storage = new Storage({
    size: 1000,
    storageBackend: AsyncStorage,
    defaultExpires: null,
    enableCache: true,
})

// sync方法
storage.sync = sync;

global.storage = storage;
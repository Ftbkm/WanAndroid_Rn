/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import global from './component/Common/global';
import storage from './component/Common/storage';

AppRegistry.registerComponent(appName, () => App);

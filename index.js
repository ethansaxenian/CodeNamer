/**
 * @format
 */

import { registerRootComponent } from "expo";
import {AppRegistry} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';

// if developing in Xcode, uncomment this line:
AppRegistry.registerComponent(appName, () => App);

// if developing in Expo, uncomment this line:
// registerRootComponent(App);

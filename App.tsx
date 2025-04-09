/**
 * @format
 */

import React from 'react';
import { AppRegistry } from 'react-native';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import store from './src/store';
import RootNavigator from './src/navigation/RootNavigator';
import appConfig from './app.json';
import {AuthContextProvider} from './src/context/Auth.context';

const appName = appConfig.expo.name;

const App = () => {
  return (
    <Provider store={store}>
      <AuthContextProvider>
        <NavigationContainer>
          <RootNavigator />
        </NavigationContainer>
      </AuthContextProvider>
    </Provider>
  );
};

// Registra o componente principal
AppRegistry.registerComponent(appName, () => App);

export default App;

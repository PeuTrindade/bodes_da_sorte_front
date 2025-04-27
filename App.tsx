/**
 * @format
 */

import React from 'react';;
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import store from './src/store';
import RootNavigator from './src/navigation/RootNavigator';
import { AuthContextProvider } from './src/context/Auth.context';


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

export default App;

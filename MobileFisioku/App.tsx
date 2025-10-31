import React from 'react';
import { StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { store } from './src/store';
import AppNavigator from './src/navigation/AppNavigator';
import { COLORS } from './src/constants/theme';

const App = (): React.JSX.Element => {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <StatusBar
          barStyle="light-content"
          backgroundColor={COLORS.primary}
        />
        <AppNavigator />
      </SafeAreaProvider>
    </Provider>
  );
};

export default App;

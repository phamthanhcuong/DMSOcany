// src/App.tsx
import 'react-native-gesture-handler';
import React from 'react';
import { Provider } from 'react-redux';
import { SafeAreaView, StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './navigations/AppNavigator';
import AuthNavigator from './navigations/AuthNavigator';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './redux/store';
import LoadingSpinner from './components/common/LoadingSpinner';
import { useSelector } from 'react-redux';

const MainNavigator = () => {
  const isAuthenticated = useSelector((state: any) => state.auth.isAuthenticated);

  return (
    <NavigationContainer>
      {isAuthenticated ? <AppNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
};

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={<LoadingSpinner />} persistor={persistor}>
        <SafeAreaProvider>
          {/* <SafeAreaView style={{ flex: 1 }}> */}
            <StatusBar animated={true} backgroundColor="#001f3f" />
            <MainNavigator />
          {/* </SafeAreaView> */}
        </SafeAreaProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;
import 'react-native-gesture-handler';
import React from 'react';
import { Provider } from 'react-redux';
import { SafeAreaView, StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './navigations/AppNavigator'; // Đường dẫn đến AppNavigator
import AuthNavigator from './navigations/AuthNavigator'; // Đường dẫn đến AuthNavigator
import { useSelector } from 'react-redux'; // Import useSelector để lấy trạng thái xác thực
import { PersistGate } from 'redux-persist/integration/react';
import {store, persistor } from './redux/store';
import LoadingSpinner from './components/common/LoadingSpinner';

const App: React.FC = () => {
  // Lấy trạng thái xác thực từ Redux store
  //const isAuthenticated = useSelector((state: any) => state.auth.isAuthenticated); // Đảm bảo rằng state.auth có chứa isAuthenticated

  return (
     <Provider store={store}>
      <PersistGate loading={<LoadingSpinner />} persistor={persistor}>
      <SafeAreaProvider>
        <SafeAreaView style={{ flex: 1 }}>
          <NavigationContainer>
          <StatusBar animated={true} backgroundColor="#29328f" />
            {/* {isAuthenticated ? <AppNavigator /> : <AuthNavigator />} */}
            <AuthNavigator />
          </NavigationContainer>
        </SafeAreaView>
        </SafeAreaProvider>
        </PersistGate>
    </Provider>
    
  );
};

export default App;

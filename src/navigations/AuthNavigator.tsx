import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaView, Text } from 'react-native';
import LoginScreen from '../screens/Auth/LoginScreen'; // Đường dẫn đến màn hình Đăng Nhập
//import RegisterScreen from '../screens/Auth/RegisterScreen'; // Đường dẫn đến màn hình Đăng Ký
//import NotFoundScreen from '../screens/NotFoundScreen'; // Đường dẫn đến màn hình Không Tìm Thấy

const Stack = createStackNavigator();

const AuthNavigator: React.FC = () => {
  return (
    <Stack.Navigator >
      <Stack.Screen 
        name="Login" 
        component={LoginScreen} 
        options={{ headerShown: false }} 
      />
      {/* <Stack.Screen 
        name="Register" 
        component={RegisterScreen} 
        options={{ title: 'Đăng Ký' }} 
      /> */}
      {/* <Stack.Screen 
        name="NotFound" 
        component={NotFoundScreen} 
        options={{ title: 'Không Tìm Thấy' }} 
      /> */}
    </Stack.Navigator>
  );
};

export default AuthNavigator;

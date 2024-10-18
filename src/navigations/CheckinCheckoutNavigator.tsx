import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import CheckinCheckoutScreen from '../screens/CheckinCheckout/CheckinCheckoutScreen';
import NotFoundScreen from '../screens/NotFoundScreen';

const Stack = createStackNavigator();

const CheckinCheckoutNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      initialRouteName="CheckinCheckoutScreen"
    >
      <Stack.Screen 
        name="CheckinCheckoutScreen" 
        component={CheckinCheckoutScreen} 
        options={{ headerShown: false }} 
      />
      
      {/* Màn hình không tìm thấy */}
      <Stack.Screen 
        name="NotFound" 
        component={NotFoundScreen} 
        options={{ headerShown: false }} 
      />
    </Stack.Navigator>
  );
};

export default CheckinCheckoutNavigator;

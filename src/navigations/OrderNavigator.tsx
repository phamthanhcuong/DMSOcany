import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import OrderListScreen from '../screens/OrderManagement/OrderListScreen';
import NotFoundScreen from '../screens/NotFoundScreen';

const Stack = createStackNavigator();

const OrderNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      initialRouteName="OrderListScreen"
    >
      <Stack.Screen 
        name="OrderListScreen" 
        component={OrderListScreen} 
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

export default OrderNavigator;

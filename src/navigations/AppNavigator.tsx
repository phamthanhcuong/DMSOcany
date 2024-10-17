import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import DashboardScreen from '../screens/Dashboard/DashboardScreen';
import CustomerNavigator from '../navigations/CustomerNavigator';
// import CheckInOutScreen from '../screens/CheckinCheckout/CheckinCheckoutScreen';  // Thêm các màn hình khác
// import OrderManagementScreen from '../screens/OrderManagement/OrderScreen';
// import ReportScreen from '../screens/Report/ReportScreen';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const AppNavigator: React.FC = () => {
  return (
    <Stack.Navigator >
    <Stack.Screen 
      name="Dashboard" 
      component={DashboardScreen} 
      options={{ headerShown: false }} 
    />
     <Stack.Screen 
        name="CustomerNavigator" 
        component={CustomerNavigator} 
        options={{ headerShown: false }} 
      />
  </Stack.Navigator>
  );
};

export default AppNavigator;

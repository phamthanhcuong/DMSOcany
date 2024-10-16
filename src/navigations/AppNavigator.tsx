import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import DashboardScreen from '../screens/Dashboard/DashboardScreen';
import CustomerManagementScreen from '../screens/CustomerManagement/CustomerListScreen';
// import CheckInOutScreen from '../screens/CheckinCheckout/CheckinCheckoutScreen';  // Thêm các màn hình khác
// import OrderManagementScreen from '../screens/OrderManagement/OrderScreen';
// import ReportScreen from '../screens/Report/ReportScreen';

const Drawer = createDrawerNavigator();

const AppNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName="Dashboard"
        screenOptions={({ route }) => ({
          // Tùy chỉnh biểu tượng cho mỗi màn hình
          drawerIcon: ({ focused, color, size }) => {
            let iconName = "home";
            if (route.name === 'Dashboard') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'CustomerManagement') {
              iconName = focused ? 'people' : 'people-outline';
            } else if (route.name === 'CheckInOut') {
              iconName = focused ? 'log-in' : 'log-in-outline';
            } else if (route.name === 'OrderManagement') {
              iconName = focused ? 'cart' : 'cart-outline';
            } else if (route.name === 'Report') {
              iconName = focused ? 'stats-chart' : 'stats-chart-outline';
            }
            return <Icon name={iconName} size={size} color={color} />;
          },
          // Tùy chỉnh tiêu đề
          headerTitle: route.name === 'Dashboard' ? 'Dashboard Overview' : route.name
        })}
      >
        <Drawer.Screen
          name="Dashboard"
          component={DashboardScreen}
          options={{
            title: 'Dashboard', // Tiêu đề tùy chỉnh
          }}
        />
        <Drawer.Screen
          name="CustomerManagement"
          component={CustomerManagementScreen}
          options={{
            title: 'Customer Management',
          }}
        />
        {/* 
        
  <Drawer.Screen 
  name="CustomerManagement" 
  component={CustomerNavigator} /> // Sử dụng CustomerNavigator 


        <Drawer.Screen
          name="CheckInOut"
          component={CheckInOutScreen}
          options={{
            title: 'Check-In / Check-Out',
          }}
        />
        <Drawer.Screen
          name="OrderManagement"
          component={OrderManagementScreen}
          options={{
            title: 'Order Management',
          }}
        />
        <Drawer.Screen
          name="Report"
          component={ReportScreen}
          options={{
            title: 'Reports',
          }}
        /> */}
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;

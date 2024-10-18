import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { useDispatch } from 'react-redux';
import { Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import DashboardScreen from '../screens/Dashboard/DashboardScreen';
import CustomerNavigator from './CustomerNavigator';
import OrderNavigator from './OrderNavigator';
import CheckinCheckoutNavigator from './CheckinCheckoutNavigator';
import ReportNavigator from './ReportNavigator';
import { logout } from '../redux/slices/authSlice';

const Drawer = createDrawerNavigator();

const AppNavigator: React.FC = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    Alert.alert(
      'Đăng xuất',
      'Bạn muốn đăng xuất khỏi phần mềm?',
      [
        { text: 'Huỷ', style: 'cancel' },
        {
          text: 'Đăng xuất',
          style: 'destructive',
          onPress: () => {
            dispatch(logout());
          },
        },
      ],
      { cancelable: true }
    );
  };

  return (
      <Drawer.Navigator initialRouteName="Dashboard">
        <Drawer.Screen
          name="Dashboard"
          component={DashboardScreen}
          options={{
            title: 'Hệ thống DMS',
            drawerIcon: ({ color }) => (
              <Icon name="view-dashboard" size={20} color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="CustomerModule"
          component={CustomerNavigator}
          options={{
            title: 'Khách hàng',
            drawerIcon: ({ color }) => (
              <Icon name="account-group" size={20} color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="OrderModule"
          component={OrderNavigator}
          options={{
            title: 'Đơn hàng',
            drawerIcon: ({ color }) => (
              <Icon name="clipboard-list" size={20} color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="CheckinCheckoutModule"
          component={CheckinCheckoutNavigator}
          options={{
            title: 'Checkin/Checkout',
            drawerIcon: ({ color }) => (
              <Icon name="check-circle-outline" size={20} color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="ReportModule"
          component={ReportNavigator}
          options={{
            title: 'Báo cáo',
            drawerIcon: ({ color }) => (
              <Icon name="chart-line" size={20} color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="Logout"
          component={() => null}
          options={{
            title: 'Đăng xuất',
            drawerIcon: ({ color }) => (
              <Icon name="logout" size={20} color={color} />
            ),
          }}
          listeners={{
            drawerItemPress: (e) => {
              e.preventDefault(); // Ngăn điều hướng mặc định
              handleLogout(); // Gọi hàm logout
            },
          }}
        />
      </Drawer.Navigator>
  );
};

export default AppNavigator;
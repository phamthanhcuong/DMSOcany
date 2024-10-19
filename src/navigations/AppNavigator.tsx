import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import DashboardScreen from '../screens/Dashboard/DashboardScreen';
import CheckinCheckoutScreen from '../screens/CheckinCheckout/CheckinCheckoutScreen';
import CustomerNavigator from './CustomerNavigator';
import OrderNavigator from './OrderNavigator';
import CheckinCheckoutNavigator from './CheckinCheckoutNavigator';
import ReportNavigator from './ReportNavigator';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { COLORS } from '../utils/constants';

const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const AppNavigator: React.FC = () => {
  return ( 
        <Stack.Navigator >
        <Stack.Screen name="Dashboard" component={MainTabNavigator}  options={{ headerShown: false, title: "<", }} />
        <Stack.Screen name="CustomerModule" component={CustomerNavigator} options={{ headerShown: false, title: "Viếng thăm", }}/>
        <Stack.Screen name="OrderModule" component={OrderNavigator}   options={{ headerShown: false, title: "Đơn hàng", }} />
        <Stack.Screen name="CheckinCheckoutModule" component={CheckinCheckoutNavigator} options={{ headerShown: false, title: "Chấm công", }}/>
        <Stack.Screen name="ReportModule" component={ReportNavigator}  options={{ headerShown: false, title: "Báo cáo", }}/>
        </Stack.Navigator>
  );
};

// Tạo Tab Navigator cho Dashboard
const MainTabNavigator: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#001f3f', // Màu chủ đạo
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          elevation: 10, // Thêm bóng đổ
          height: 70,
          borderTopWidth: 0,
          borderRadius: 20, // Bo tròn các góc
          marginHorizontal: 10, // Khoảng cách bên trái và bên phải
          paddingBottom: 5,
          paddingTop: 10,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          marginBottom: 5,
          color: '#ffffff', // Màu chữ trắng
        },
        tabBarIconStyle: {
          marginBottom: 0,
        },
      }}
    >
      <Tab.Screen
        name="HomeTab"
        component={DashboardScreen}
        options={{
          tabBarLabel: 'Trang chủ',
          tabBarIcon: ({ color }) => (
            <Icon name="view-dashboard" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="CheckinCheckoutTab"
        component={CheckinCheckoutScreen}
        options={{
          tabBarLabel: 'Chấm công',
          tabBarIcon: ({ color }) => (
            <Icon name="check-circle" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="ScanTab"
        component={ScanScreen}
        options={{
          tabBarLabel: 'Scan',
          tabBarIcon: ({ color }) => (
            <Icon name="camera" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="SettingsTab"
        component={SettingsScreen}
        options={{
          tabBarLabel: 'Cài đặt',
          tabBarIcon: ({ color }) => (
            <Icon name="cog" color={color} size={26} />
          ),
        }}
      />
      {/* <Tab.Screen
        name="Logout"
        component={LogoutScreen}
        options={{
          tabBarLabel: 'Logout',
          tabBarIcon: ({ color }) => (
            <Icon name="logout" color={color} size={26} />
          ),
        }}
      /> */}
    </Tab.Navigator>
  );
};

// Dummy screens for demonstration
const SettingsScreen: React.FC = () => (
  <View style={styles.screenContainer}>
    <Text style={styles.text}>Cài đặt</Text>
  </View>
);


const ScanScreen: React.FC = () => (
  <View style={styles.screenContainer}>
    <Text style={styles.text}>Scan</Text>
  </View>
);

const LogoutScreen: React.FC = () => {
  const handleLogout = () => {
    // Xử lý logout ở đây
    Alert.alert('Đăng xuất', 'Bạn đã đăng xuất thành công');
  };

  return (
    <View style={styles.screenContainer}>
      <Text style={styles.text}>Đăng xuất</Text>
      <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
        <Text style={styles.logoutButtonText}>Đăng xuất</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f9f9f9', // Nền sáng
  },
  text: {
    color: '#141e30', // Màu chữ tương phản
    fontSize: 18,
  },
  logoutButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#ff0000',
    borderRadius: 5,
  },
  logoutButtonText: {
    color: '#fff',
  },
});

export default AppNavigator;
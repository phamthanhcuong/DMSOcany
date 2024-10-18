import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../redux/slices/authSlice';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const DashboardScreen: React.FC = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.auth.user);

  const handleLogout = () => {
    dispatch(logout());
    //Alert.alert('Logged out', 'You have been logged out successfully.');
  };

  const navigateTo = (screen: string) => {
    navigation.navigate(screen as never);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Welcome, {user?.username || 'User'}!</Text>
        <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
          <Icon name="logout" size={20} color="#ffffff" />
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.menuContainer}>
        <TouchableOpacity style={styles.menuItem} onPress={() => navigateTo('CustomerModule')}>
          <Icon name="account-multiple" size={40} color="#00c9ff" />
          <Text style={styles.menuText}>Khách hàng</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem} onPress={() => navigateTo('OrderModule')}>
          <Icon name="cart" size={40} color="#00c9ff" />
          <Text style={styles.menuText}>Đơn hàng</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem} onPress={() => navigateTo('CheckinCheckoutModule')}>
          <Icon name="map-marker-check" size={40} color="#00c9ff" />
          <Text style={styles.menuText}>Checkin/Checkout</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem} onPress={() => navigateTo('SyncDataModule')}>
          <Icon name="sync" size={40} color="#00c9ff" />
          <Text style={styles.menuText}>Sync Data</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem} onPress={() => navigateTo('ReportModule')}>
          <Icon name="chart-bar" size={40} color="#00c9ff" />
          <Text style={styles.menuText}>Report</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem} onPress={() => Alert.alert('Khác', 'Tính năng này sẽ sớm được ra mắt!')}>
          <Icon name="dots-horizontal" size={40} color="#00c9ff" />
          <Text style={styles.menuText}>Other</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#141e30', // Màu nền đậm hơn để làm nổi bật các yếu tố neon
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
    padding: 15,
    backgroundColor: '#1f4068', // Hiệu ứng gradient cho thanh tiêu đề
    borderRadius: 12,
    shadowColor: '#00c9ff',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 8,
  },
  headerText: {
    fontSize: 24,
    color: '#e4e4e4',
    fontWeight: 'bold',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ff4b5c',
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 20,
    shadowColor: '#ff4b5c',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.6,
    shadowRadius: 8,
  },
  logoutButtonText: {
    color: '#ffffff',
    marginLeft: 5,
  },
  menuContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  menuItem: {
    width: '48%',
    backgroundColor: '#162447',
    padding: 20,
    borderRadius: 15,
    alignItems: 'center',
    marginBottom: 15,
    borderColor: '#00c9ff',
    borderWidth: 1.5,
    shadowColor: '#00c9ff',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.5,
    shadowRadius: 15,
    elevation: 10,
  },
  menuText: {
    marginTop: 10,
    fontSize: 18,
    color: '#00c9ff',
    fontWeight: '600',
  },
});

export default DashboardScreen;
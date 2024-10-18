import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert, PermissionsAndroid } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../redux/slices/authSlice';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { isIos, COLORS } from '../../utils/constants';
import { request, PERMISSIONS, RESULTS } from 'react-native-permissions';

const DashboardScreen: React.FC = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const username = useSelector((state: any) => state.auth.username);

  useEffect(() => {
    requestPermissions();
  }, []);

  const requestPermissions = async () => {
    try {
      if (isIos) {
        const permissions = [
          PERMISSIONS.IOS.CAMERA,
          PERMISSIONS.IOS.MICROPHONE,
          PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
          PERMISSIONS.IOS.LOCATION_ALWAYS,
          //PERMISSIONS.IOS.FACE_ID,
        ];

        const results = await Promise.all(permissions.map(permission => request(permission)));

        // const permissionsError = results.filter(result => result === RESULTS.DENIED);
        // if (permissionsError.length > 0) {
        //   Alert.alert(
        //     'Từ chối quyền truy cập',
        //     `Một vài quyền đã bị từ chối: ${permissionsDenied.join(', ')}. Vui lòng kiểm tra cài đặt của bạn.`
        //   );
        // }
        const permissionsDenied = Object.entries(results)
      .filter(([_, permissionStatus]) => permissionStatus === RESULTS.DENIED)
      .map(([permissionType]) => permissionType);

    if (permissionsDenied.length > 0) {
      Alert.alert(
        'Từ chối quyền truy cập',
        `Một vài quyền đã bị từ chối: ${permissionsDenied.join(', ')}. Vui lòng kiểm tra cài đặt của bạn.`
      );
    }
      } else {
        // Android permissions handling remains the same
        const result = await PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.CAMERA,
          PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
          PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
          PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
          PermissionsAndroid.PERMISSIONS.ACCESS_BACKGROUND_LOCATION,
          PermissionsAndroid.PERMISSIONS.READ_PHONE_STATE,
          PermissionsAndroid.PERMISSIONS.CALL_PHONE,
          PermissionsAndroid.PERMISSIONS.ANSWER_PHONE_CALLS,
          PermissionsAndroid.PERMISSIONS.BODY_SENSORS_BACKGROUND,
          PermissionsAndroid.PERMISSIONS.PROCESS_OUTGOING_CALLS,
          PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
        ]);

        const permissionsError = Object.entries(result).filter(([_, value]) => value === PermissionsAndroid.RESULTS.DENIED);
        if (permissionsError.length > 0) {
          throw new Error('Một vài quyền đã bị từ chối');
        }
      }
    } catch (error) {
      console.error("Lỗi khi Cấp quyền: ", error);
      Alert.alert('Permission Error', 'An error occurred while requesting permissions.');
    }
  };


  // Hàm để lấy lời chào theo thời gian trong ngày
  const getGreeting = () => {
    const currentHour = new Date().getHours();
    if (currentHour < 12) {
      return 'Chào buổi sáng';
    } else if (currentHour < 18) {
      return 'Chào buổi chiều';
    } else {
      return 'Chào buổi tối';
    }
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  const navigateTo = (screen: string) => {
    navigation.navigate(screen as never);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>
          {getGreeting()}, {username || 'User'}!
        </Text>
        <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
          <Icon name="logout" size={20} color="#ffffff" />
        </TouchableOpacity>
      </View>

      <View style={styles.menuContainer}>
        <TouchableOpacity style={styles.menuItem} onPress={() => navigateTo('CustomerModule')}>
          <Icon name="account-multiple" size={40} color="#00c9ff" />
          <Text style={styles.menuText}>Viếng thăm</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem} onPress={() => navigateTo('OrderModule')}>
          <Icon name="cart" size={40} color="#00c9ff" />
          <Text style={styles.menuText}>Đơn hàng</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem} onPress={() => navigateTo('CheckinCheckoutModule')}>
          <Icon name="map-marker-check" size={40} color="#00c9ff" />
          <Text style={styles.menuText}>Chấm công</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem} onPress={() => navigateTo('ReportModule')}>
          <Icon name="chart-bar" size={40} color="#00c9ff" />
          <Text style={styles.menuText}>Báo cáo</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem} onPress={() => Alert.alert('Khác', 'Tính năng này sẽ sớm được ra mắt!')}>
          <Icon name="dots-horizontal" size={40} color="#00c9ff" />
          <Text style={styles.menuText}>Giám sát</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem} onPress={() => navigateTo('SyncDataModule')}>
          <Icon name="sync" size={40} color="#00c9ff" />
          <Text style={styles.menuText}>Đồng bộ</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#141e30',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
    padding: 15,
    backgroundColor: '#1f4068',
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
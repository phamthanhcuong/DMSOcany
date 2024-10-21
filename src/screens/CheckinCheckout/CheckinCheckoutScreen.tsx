import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
  PermissionsAndroid,
} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import { launchCamera } from 'react-native-image-picker';
import { request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import Geocoder from 'react-native-geocoding';
import { isIos, COLORS } from '../../utils/constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Initialize Geocoding API
//Geocoder.init(GOOGLE_MAPS_API_KEY); // Replace with your Google Maps API key

const CheckinCheckoutScreen = () => {
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [location, setLocation] = useState<{
    latitude: number;
    longitude: number;
    address: string;
  } | null>(null);
  const [timer, setTimer] = useState<string>('0:00:00');
  const [isTiming, setIsTiming] = useState<boolean>(false);
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);
  const [startTime, setStartTime] = useState<number | null>(null);

  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location Permission',
          message: 'App needs access to your location to check in.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        getCurrentLocation();
      } else {
        Alert.alert('Permission Denied', 'Location permission is required to check in.');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const getCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          //const geocodeResponse = await Geocoder.from(latitude, longitude);
          const address = "";//geocodeResponse.results[0].formatted_address;

          setLocation({ latitude, longitude, address });
          Alert.alert('Location', `Address: ${address}\nLatitude: ${latitude}, Longitude: ${longitude}`);
        } catch (error) {
          console.error('Geocoding error:', error);
          setLocation({ latitude, longitude, address: 'Unable to retrieve address' });
          Alert.alert('Location', `Latitude: ${latitude}, Longitude: ${longitude}`);
        }
      },
      (error) => {
        Alert.alert('Error', 'Unable to fetch location. Please try again.');
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  };

  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Camera Permission',
          message: 'App needs access to your camera to take a picture.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        launchCameraWithPermission();
      } else {
        Alert.alert('Permission Denied', 'Camera permission is required to take a picture.');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const launchCameraWithPermission = () => {
    launchCamera(
      {
        mediaType: 'photo',
        saveToPhotos: true,
      },
      (response) => {
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.errorCode) {
          console.log('ImagePicker Error: ', response.errorMessage);
        } else {
          setImageUri(response.assets?.[0]?.uri || null);
        }
      }
    );
  };

  const handleCheckin = () => {
    isTiming ? stopTimer() : startTimer();
    if (!isIos) {
      requestLocationPermission();
      requestCameraPermission();
    }
    launchCameraWithPermission();
    getCurrentLocation();
  };

  const startTimer = async () => {
    const storedStartTime = await AsyncStorage.getItem('timerStartTime');
    const storedDate = await AsyncStorage.getItem('timerStartDate');
    const currentDate = new Date().toLocaleDateString();

    if (storedStartTime && storedDate === currentDate) {
      setIsTiming(true);
      return;
    }

    const currentTime = startTime || new Date().getTime();
    setStartTime(currentTime);

    const startDate = currentDate;
    await AsyncStorage.setItem('timerStartDate', startDate);

    const id = setInterval(() => {
      const elapsedTime = new Date().getTime() - currentTime;
      const hours = Math.floor(elapsedTime / (1000 * 60 * 60));
      const minutes = Math.floor((elapsedTime % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((elapsedTime % (1000 * 60)) / 1000);
      setTimer(`${hours}:${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`);
    }, 1000);

    setIntervalId(id);
    AsyncStorage.setItem('timerStartTime', currentTime.toString());
  };

  const stopTimer = async () => {
    const currentDate = new Date().toLocaleDateString();
    const storedDate = await AsyncStorage.getItem('timerStartDate');

    if (storedDate === currentDate) {
      setIsTiming(false);
      //Alert.alert('Timer stopped', 'Bạn đã dừng timer thành công trong ngày hiện tại.');
    } else {
      //Alert.alert('New Day', 'Ngày đã thay đổi. Timer sẽ được reset.');
      //resetTimer();
    }
  };

  const resetTimer = () => {
    setTimer('0:00:00');
    setIsTiming(false);
    setStartTime(null);
    if (intervalId) clearInterval(intervalId);
    setIntervalId(null);
    AsyncStorage.removeItem('timerStartTime');
    AsyncStorage.removeItem('timerStartDate');
  };

  const restoreTimerState = async () => {
    const storedStartTime = await AsyncStorage.getItem('timerStartTime');
    const storedDate = await AsyncStorage.getItem('timerStartDate');
    const currentDate = new Date().toLocaleDateString();

    if (storedStartTime && storedDate === currentDate) {
      setStartTime(parseInt(storedStartTime));
      setIsTiming(true);
    }
    else {
      resetTimer();
    }
  };


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Chấm công</Text>
      <Text style={styles.date}>{new Date().toLocaleDateString()}</Text>

      <TouchableOpacity onPress={handleCheckin} style={styles.checkinButton}>
        <Text style={styles.buttonText}>{imageUri ? 'ĐÃ CHECK-IN' : 'BẮT ĐẦU'}</Text>
      </TouchableOpacity>

      <Text style={styles.timer}>{timer}</Text>

      {imageUri && <Image source={{ uri: imageUri }} style={styles.capturedImage} />}

      {location && (
        <Text style={styles.locationText}>
          Vị trí: {location.address} ({location.latitude}, {location.longitude})
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#141e30',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    color: '#ffffff',
    fontWeight: 'bold',
  },
  date: {
    fontSize: 18,
    color: '#00c9ff',
    marginVertical: 8,
  },
  checkinButton: {
    backgroundColor: '#00c9ff',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginVertical: 10,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  timer: {
    fontSize: 30,
    color: '#ffffff',
    marginVertical: 16,
  },
  capturedImage: {
    width: 200,
    height: 200,
    borderRadius: 10,
    marginVertical: 20,
  },
  locationText: {
    color: '#ffffff',
    fontSize: 16,
    marginTop: 10,
  },
});


export default CheckinCheckoutScreen;
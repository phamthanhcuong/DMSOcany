import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, TouchableOpacity, Alert, Animated } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useDispatch } from 'react-redux';
import { login } from '../../redux/slices/authSlice';
import { AppDispatch } from '../../redux/store';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const LoginScreen: React.FC = () => {
  const [username, setUserName] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();
  const glowAnim = new Animated.Value(0);

  const handleLogin = async () => {
    if (!username || !password) {
      Alert.alert('Lỗi', 'Tài khoản và Mật khẩu không được để trống');
      return;
    }

    setLoading(true);
    try {
      await dispatch(login({ username, password })).unwrap();
      Alert.alert('Thành công', 'Đăng nhập thành công');
    } catch (error) {
      Alert.alert('Lỗi', 'Đăng nhập thất bại');
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = () => {
    Alert.alert('Quên mật khẩu', 'Tính năng "Quên mật khẩu" sẽ sớm được ra mắt!');
  };

  const handleFaceIDLogin = () => {
    Alert.alert('Face ID', 'Tính năng "Đăng nhập bằng Face ID" sẽ sớm được ra mắt!');
  };

  // Animation for glowing effect
  Animated.loop(
    Animated.sequence([
      Animated.timing(glowAnim, {
        toValue: 1,
        duration: 1500,
        useNativeDriver: true,
      }),
      Animated.timing(glowAnim, {
        toValue: 0,
        duration: 1500,
        useNativeDriver: true,
      }),
    ]),
  ).start();

  // Style for glowing effect
  const animatedStyle = {
    shadowColor: '#0a84ff',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: glowAnim,
    shadowRadius: 10,
  };

  return (
    <LinearGradient colors={['#001f3f', '#005bb5']} style={styles.gradient}>
      <View style={styles.container}>
        <Text style={styles.title}>Welcome to the Future</Text>

        <Animated.View style={[styles.inputContainer, animatedStyle]}>
          <TextInput
            style={styles.input}
            placeholder="Tài khoản"
            placeholderTextColor="#8a8a8a"
            value={username}
            onChangeText={setUserName}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </Animated.View>

        <Animated.View style={[styles.inputContainer, animatedStyle]}>
          <TextInput
            style={styles.input}
            placeholder="Mật khẩu"
            placeholderTextColor="#8a8a8a"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
        </Animated.View>

        <TouchableOpacity onPress={handleForgotPassword}>
          <Text style={styles.forgotPassword}>Quên mật khẩu?</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.loginButton, animatedStyle]} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>{loading ? 'Loading...' : 'Đăng nhập'}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.faceIDButton, animatedStyle]} onPress={handleFaceIDLogin}>
          <Icon name="face-recognition" size={30} color="#fff" />
          <Text style={styles.faceIDText}>Đăng nhập bằng Face ID</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 36,
    color: '#fff',
    marginBottom: 40,
    fontWeight: 'bold',
    textShadowColor: 'rgba(0, 0, 0, 0.7)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 6,
  },
  inputContainer: {
    width: '90%',
    marginBottom: 15,
    borderRadius: 25,
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#f0f0f0',
    borderRadius: 25,
    paddingHorizontal: 20,
    color: '#333',
    fontSize: 16,
    borderWidth: 2,
    borderColor: '#0a84ff',
  },
  forgotPassword: {
    color: '#b0c4de',
    marginBottom: 20,
    textDecorationLine: 'underline',
  },
  loginButton: {
    width: '90%',
    height: 50,
    backgroundColor: '#0d47a1',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  faceIDButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    padding: 10,
    borderRadius: 25,
    backgroundColor: '#0a84ff',
  },
  faceIDText: {
    color: '#fff',
    marginLeft: 10,
    fontSize: 18,
  },
});

export default LoginScreen;
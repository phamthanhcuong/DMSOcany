import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, Alert } from 'react-native';
import { useDispatch } from 'react-redux';
import { login } from '../../redux/slices/authSlice'; // Import action login từ authSlice
import { AppDispatch } from '../../redux/store'; // Đảm bảo rằng bạn đã có kiểu AppDispatch từ store

const LoginScreen: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const dispatch: AppDispatch = useDispatch();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Lỗi', 'Email và mật khẩu không được để trống');
      return;
    }

    setLoading(true);
    
    try {
      // Thực hiện dispatch action login
      await dispatch(login({ email, password })).unwrap();
      Alert.alert('Thành công', 'Đăng nhập thành công');
    } catch (error) {
      Alert.alert('Lỗi', 'Đăng nhập không thành công');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Đăng Nhập</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      
      <TextInput
        style={styles.input}
        placeholder="Mật khẩu"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      
      {loading ? (
        <Text>Đang xử lý...</Text>
      ) : (
        <Button title="Đăng Nhập" onPress={handleLogin} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
});

export default LoginScreen;

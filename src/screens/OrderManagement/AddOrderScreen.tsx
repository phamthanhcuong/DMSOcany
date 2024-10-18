import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

const AddOrderScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>AddOrderScreen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  message: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
});

export default AddOrderScreen;



import React, { useEffect } from 'react';
import { View, FlatList, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCustomers } from '../../redux/slices/customerSlice'; // Đường dẫn đến customerSlice

const CustomerList: React.FC = () => {
  const dispatch = useDispatch();
  const customers = useSelector((state: any) => state.customer.customers);
  const loading = useSelector((state: any) => state.customer.loading);
  const error = useSelector((state: any) => state.customer.error);

  useEffect(() => {
    dispatch(fetchCustomers() as any); // Sử dụng casting as any nếu TypeScript không nhận diện đúng kiểu
  }, [dispatch]);

  const renderItem = ({ item }: { item: any }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.itemText}>{item.name}</Text>
    </View>
  );

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (error) {
    return <Text style={styles.errorText}>Error: {error}</Text>;
  }

  return (
    <FlatList
      data={customers}
      renderItem={renderItem}
      keyExtractor={(item) => item.id.toString()}
    />
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  itemText: {
    fontSize: 18,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default CustomerList;

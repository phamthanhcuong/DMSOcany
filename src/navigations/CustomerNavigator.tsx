import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import CustomerListScreen from '../screens/CustomerManagement/CustomerListScreen';
//import AddCustomerScreen from '../screens/CustomerManagement/AddCustomerScreen';
// import EditCustomerScreen from '../screens/CustomerManagement/EditCustomerScreen'; // Nếu có màn hình chỉnh sửa
import NotFoundScreen from '../screens/NotFoundScreen'; // Màn hình không tìm thấy

const Stack = createStackNavigator();

const CustomerNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      initialRouteName="CustomerList"
    >
      <Stack.Screen 
        name="CustomerList" 
        component={CustomerListScreen} 
        options={{ headerShown: false }} 
      />
      {/* <Stack.Screen 
        name="AddCustomer" 
        component={AddCustomerScreen} 
        options={{ title: 'Add Customer' }} 
      />
      <Stack.Screen 
        name="EditCustomer" 
        component={EditCustomerScreen} 
        options={{ title: 'Edit Customer' }} 
      /> */}
      {/* Màn hình không tìm thấy */}
      <Stack.Screen 
        name="NotFound" 
        component={NotFoundScreen} 
        options={{ headerShown: false }} 
      />
    </Stack.Navigator>
  );
};

export default CustomerNavigator;

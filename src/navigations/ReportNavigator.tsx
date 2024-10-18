import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ReportScreen from '../screens/Report/ReportScreen';
import NotFoundScreen from '../screens/NotFoundScreen';

const Stack = createStackNavigator();

const ReportNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      initialRouteName="ReportScreen"
    >
      <Stack.Screen 
        name="ReportScreen" 
        component={ReportScreen} 
        options={{ headerShown: false }} 
      />

      {/* Màn hình không tìm thấy */}
      <Stack.Screen 
        name="NotFound" 
        component={NotFoundScreen} 
        options={{ headerShown: false }} 
      />
    </Stack.Navigator>
  );
};

export default ReportNavigator;

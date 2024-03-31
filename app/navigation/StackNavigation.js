import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screen/LoginScreen'
import TabNavigation from './TabNavigation';

const Stack = createStackNavigator();


const StackNavigation = () => {
  return (
    
    <Stack.Navigator initialRouteName='Login'>
    <Stack.Screen name="Login" component={LoginScreen}
    options={{
        headerShown:false
    }} />
    <Stack.Screen name='Home' component={TabNavigation} options={{
        headerShown:false
    }}/>
  </Stack.Navigator>
  )
}

export default StackNavigation

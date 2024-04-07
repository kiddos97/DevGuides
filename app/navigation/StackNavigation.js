import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { DrawerActions } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import LoginScreen from '../screen/LoginScreen';
import TabNavigation from './TabNavigation';
import color from '../../config/color';
import RegisterScreen from '../screen/RegisterScreen';
import ChatScreen from '../screen/ChatScreen';

const Stack = createStackNavigator();

const StackNavigation = () => {
  return (
    <Stack.Navigator initialRouteName='Login'>
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{
          headerShown:false
        }}
      />
      <Stack.Screen
        name='Homepage'
        component={TabNavigation}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
      name="Register"
      component={RegisterScreen}
      options={{
        headerShown:false
      }}/>
      <Stack.Screen
      name='Chat'
      component={ChatScreen}
      options={({route}) => ({
        title:route.params.user,
        headerBackTitleVisible:false
      })}/>
    </Stack.Navigator>
  );
}

export default StackNavigation;


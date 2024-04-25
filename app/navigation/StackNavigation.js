import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { DrawerActions } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import LoginScreen from '../screen/LoginScreen';
import TabNavigation from './TabNavigation';
import color from '../../config/color';
import RegisterScreen from '../screen/RegisterScreen';
import ChatScreen from '../screen/ChatScreen';
import MessageScreen from '../screen/MessageScreen';
import AntDesign from 'react-native-vector-icons/AntDesign';


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
     name='Message'
     component={MessageScreen}
     options={{
      headerBackTitleVisible:false,
      headerShown:false,
      tabBarIcon: () => <AntDesign name='message1' color={color.AppBackgroundColor} size={25}/>
     }}/>
      <Stack.Screen
      name='Chat'
      component={ChatScreen}
      options={({route}) => ({
        headerBackTitleVisible:false,
        title:route?.params?.username
      })}/>
    </Stack.Navigator>
  );
}

export default StackNavigation;


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
import ChatRoomHeader from '../components/ChatRoomHeader';
//import ChatRoomHeader from '../components/ChatRoomHeader';
import { useNavigation } from '@react-navigation/native';

const Stack = createStackNavigator();

const StackNavigation = () => {

  const navigation = useNavigation();


  const handlePress = () => {
    //navigation.dispatch(DrawerActions.openDrawer())
    navigation.navigate('Welcome');
  }
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
      header: () => <ChatRoomHeader title='Message' onPress={handlePress} icon='keyboard-backspace'/>
     }}/>
      <Stack.Screen
      name='Chat'
      component={ChatScreen}
      options={({route}) => ({
        headerBackTitleVisible:false,
        title:route.params.item.username
      })}/>
    </Stack.Navigator>
  );
}

export default StackNavigation;


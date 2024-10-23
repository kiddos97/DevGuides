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
import AccountScreen from '../screen/AccountScreen';
import PostComponent from '../components/PostComponent';
import PostScreen from '../screen/PostScreen';
import CommentScreen from '../screen/CommentScreen';

const Stack = createStackNavigator();

const StackNavigation = () => {

  const navigation = useNavigation();


  const handlePress = () => {
    //navigation.dispatch(DrawerActions.openDrawer())
    navigation.navigate('Welcome');
  }
  // const handleBack = () => {
  //   navigation.goBack();
  // }
  return (
    <Stack.Navigator
    screenOptions={{
      gestureEnabled:false
    }}
    initialRouteName='Login'>
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{
          headerShown:false,
          gestureEnabled:false
          
        }}
      />
      <Stack.Screen
        name='Homepage'
        component={TabNavigation}
        options={{
          headerShown: false, 
        gestureEnabled:false}}
      />
      <Stack.Screen
      name="Register"
      component={RegisterScreen}
      options={{
        headerShown:false,
        gestureEnable:false
      }}/>
    <Stack.Screen 
     name='Message'
     component={MessageScreen}
     options={{
      header: () => <ChatRoomHeader title='Message' onPress={handlePress} icon='keyboard-backspace' backgroundColor={color.button}/>
     }}/>
      <Stack.Screen
      name='Chat'
      component={ChatScreen}
      options={{
        headerShown:false,
        gestureEnabled:false
      }}
      />
      <Stack.Screen
      name='Profile'
      component={AccountScreen}
      options={{
        header:({route}) => 
        <ChatRoomHeader 
        onPress={()=>navigation.navigate('Welcome')} 
        backgroundColor={color.button} 
        icon='keyboard-backspace' 
        onPress2={() => navigation.navigate('Message')}
        />,
        gestureEnabled:false
      }}/>
      <Stack.Screen
      name='Post'
      component={PostScreen}
      options={{
        headerShown:false,
        gestureEnabled:false
      }}
      />
      <Stack.Screen
      name='Comment'
      component={CommentScreen}
      options={{
        gestureEnabled:false,
        header: () => <ChatRoomHeader onPress={handlePress} icon='keyboard-backspace' backgroundColor={color.button}/>
      }}/>
    </Stack.Navigator>
  );
}

export default StackNavigation;


import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { DrawerActions } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import LoginScreen from '../screen/LoginScreen';
import TabNavigation from './TabNavigation';
import color from '../../config/color';
import ChatRoomHeader from '../components/ChatRoomHeader';
import { useNavigation } from '@react-navigation/native';
import { lazy,Suspense } from 'react';
import { ActivityIndicator } from 'react-native';

const RegisterScreen = lazy(() => import('../screen/RegisterScreen'))
const ChatScreen = lazy(() => import('../screen/ChatScreen'))
const MessageScreen = lazy(() => import('../screen/MessageScreen'))
const AccountScreen = lazy(() => import('../screen/AccountScreen'))
const PostScreen = lazy(() => import('../screen/PostScreen'))
const CommentScreen = lazy(() => import('../screen/CommentScreen'))


const RegisterScreenWrapper = (props) => {
  
  return (
    <Suspense fallback={<ActivityIndicator size='small' color='#000'/>}>
    <RegisterScreen  {...props}/>
  </Suspense>

  )

}
const ChatScreenWrapper = (props) => {
  
  return (
    <Suspense fallback={<ActivityIndicator size='small' color='#000'/>}>
    <ChatScreen  {...props}/>
  </Suspense>

  )

}
const MessageScreenWrapper = (props) => {
  
  return (
    <Suspense fallback={<ActivityIndicator size='small' color='#000'/>}>
    <MessageScreen  {...props}/>
  </Suspense>

  )

}
const ProfileScreenWrapper = (props) => {
  
  return (
    <Suspense fallback={<ActivityIndicator size='small' color='#000'/>}>
    <AccountScreen  {...props}/>
  </Suspense>

  )

}
const PostScreenWrapper = (props) => {
  
  return (
    <Suspense fallback={<ActivityIndicator size='small' color='#000'/>}>
    <PostScreen  {...props}/>
  </Suspense>

  )

}
const CommentScreenWrapper = (props) => {
  
  return (
    <Suspense fallback={<ActivityIndicator size='small' color='#000'/>}>
    <CommentScreen  {...props}/>
  </Suspense>

  )

}

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
      component={RegisterScreenWrapper}
      options={{
        headerShown:false,
        gestureEnable:false
      }}/>
    <Stack.Screen 
     name='Message'
     component={MessageScreenWrapper}
     options={{
      header: () => <ChatRoomHeader title='Message' onPress={handlePress} icon='keyboard-backspace' backgroundColor={color.button}/>
     }}/>
      <Stack.Screen
      name='Chat'
      component={ChatScreenWrapper}
      options={{
        headerShown:false,
        gestureEnabled:false
      }}
      />
      <Stack.Screen
      name='Profile'
      component={ProfileScreenWrapper}
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
      component={PostScreenWrapper}
      options={{
        headerShown:false,
        gestureEnabled:false
      }}
      />
      <Stack.Screen
      name='Comment'
      component={CommentScreenWrapper}
      options={{
        gestureEnabled:false,
        header: () => <ChatRoomHeader onPress={handlePress} icon='keyboard-backspace' backgroundColor={color.button}/>
      }}/>
    </Stack.Navigator>
  );
}

export default StackNavigation;


import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import color from '../../config/color';
import ChatRoomHeader from '../components/ChatRoomHeader';
import { useNavigation } from '@react-navigation/native';
import { lazy,Suspense } from 'react';
import { ActivityIndicator } from 'react-native';

const HomeScreen = lazy(() => import('../screen/HomeScreen'))
const ChatScreen = lazy(() => import('../screen/ChatScreen'))
const MessageScreen = lazy(() => import('../screen/MessageScreen'))
const AccountScreen = lazy(() => import('../screen/AccountScreen'))
const PostScreen = lazy(() => import('../screen/PostScreen'))
const CommentScreen = lazy(() => import('../screen/CommentScreen'))
const CommentReplyScreen = lazy(() => import('../screen/CommentReplyScreen'))
const EditScreen = lazy(() => import('../screen/EditScreen'))


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

const CommentReplyScreenWrapper = (props) => {
  
  return (
    <Suspense fallback={<ActivityIndicator size='small' color='#000'/>}>
    <CommentReplyScreen  {...props}/>
  </Suspense>

  )

}
const HomeScreenWrapper = (props) => {
  
  return(
    <Suspense fallback={<ActivityIndicator size='small' color='"#000'/>}>
    <HomeScreen {...props}/>
  </Suspense>
  )}

const EditScreenWrapper = (props) => {
  return (
    <Suspense fallback={<ActivityIndicator size='small' color='#000'/>}>
    <EditScreen  {...props}/>
  </Suspense>
  )
}

const config = {
  animation: 'spring',
  config: {
    stiffness: 1000,
    damping: 500,
    mass: 3,
    overshootClamping: true,
    restDisplacementThreshold: 0.01,
    restSpeedThreshold: 0.01,
  },
};

const Stack = createStackNavigator();

const StackNavigation = () => {

  const navigation = useNavigation();


  const handlePress = () => {
    navigation.navigate('Main');
  }
  const handleComment = () => {
    navigation.navigate('Comment')
  }

  return (
    <Stack.Navigator
    screenOptions={{
      gestureEnabled:false
    }}
    initialRouteName='Main'>
      <Stack.Screen
        name='Main'
        component={HomeScreenWrapper}
        options={{
          headerShown: false, 
        gestureEnabled:false}}
      />
    <Stack.Screen 
     name='Message'
     component={MessageScreenWrapper}
     options={{
      headerShown:false
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
        headerShown:false,
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
        header: () => <ChatRoomHeader onPress={handlePress} icon='keyboard-backspace' backgroundColor={color.button}/>,
        unmountOnBlur: false
      }}/>
      <Stack.Screen
      name='CommentReply'
      component={CommentReplyScreenWrapper}
      options={{
        unmountOnBlur:false,
        ransitionSpec: {
          open: config,
          close: config,
        },
        headerShown:false,
        gestureEnabled:false,
      }}/>
       <Stack.Screen
      name='Edit'
      component={EditScreenWrapper}
      options={{
        headerShown:false,
        gestureEnabled:false
      }}
      />
    </Stack.Navigator>
  );
}

export default StackNavigation;


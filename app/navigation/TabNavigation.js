
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import color from '../../config/color';
import HomeScreen from '../screen/HomeScreen';
import MessageScreen from '../screen/MessageScreen';
import NotificationScreen from '../screen/NotificationScreen';
import ChatScreen from '../screen/ChatScreen';



const TabNavigation = () => {
  const Tab = createMaterialBottomTabNavigator();


  return (
 
  <Tab.Navigator 
  initialRouteName='Welcome'
  activeColor={color.white}
  labeled={false}
  barStyle={{ 
    backgroundColor: 'transparent',
    borderTopWidth: 0,
    position: 'absolute',
    left: 50,
    right: 50,
    bottom: 40,
    height: 75
  }}>
    <Tab.Screen 
        name="Welcome"
     component={HomeScreen}
     options={{
        tabBarIcon:() => <MaterialCommunityIcons name='home' color={color.AppBackgroundColor} size={25}/>
     }}
     />
      <Tab.Screen 
        name="Notification"
     component={NotificationScreen}
     options={{
        tabBarIcon:() => <MaterialIcons name='notifications' color={color.AppBackgroundColor} size={25}/>
     }}
     />
      </Tab.Navigator>
  


  )
}

export default TabNavigation

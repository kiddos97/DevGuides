
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import color from '../../config/color';
import HomeScreen from '../screen/HomeScreen';
import NotificationScreen from '../screen/NotificationScreen';
import SearchScreen from '../screen/SearchScreen';



const TabNavigation = () => {
  const Tab = createBottomTabNavigator()


  return (
 
  <Tab.Navigator 
  initialRouteName='Welcome'
  screenOptions={{
    headerShown: false, 
    tabBarStyle: {
      position: 'absolute',
      bottom: 0,
      height: 100,
      backgroundColor:'transparent',  
      elevation: 0, 
      borderTopWidth: 0, 
    },
    tabBarActiveBackgroundColor:'#252525',
    tabBarShowLabel: false,                  
  }}
>
    <Tab.Screen 
        name="Welcome"
     component={HomeScreen}
     options={{
        tabBarIcon:() => (
        <MaterialCommunityIcons name='home' color='#00bf63' size={25}
        />),
        gestureEnabled: false
       
     }}
     />
     <Tab.Screen
     name='Search'
     component={SearchScreen}
     options={{
      tabBarIcon: () => <MaterialCommunityIcons name='account-search' size={25} color='#00bf63'/>
     }}
    />
      <Tab.Screen 
        name="Notification"
     component={NotificationScreen}
     options={{
        tabBarIcon:() => <MaterialIcons name='notifications' color='#00bf63' size={25}/>
     }}
     />
      </Tab.Navigator>
  


  )
}

export default TabNavigation

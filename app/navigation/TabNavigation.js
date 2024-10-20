
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import color from '../../config/color';
import HomeScreen from '../screen/HomeScreen';
import NotificationScreen from '../screen/NotificationScreen';
import SearchScreen from '../screen/SearchScreen';



const TabNavigation = () => {
  const Tab = createMaterialBottomTabNavigator();


  return (
 
  <Tab.Navigator 
  initialRouteName='Welcome'
  labeled={false}
  barStyle={{ 
    bottom: 10,
    height: 100,
    position: 'absolute',
    backgroundColor:'transparent',
  }}
>
    <Tab.Screen 
        name="Welcome"
     component={HomeScreen}
     options={{
        tabBarColor:color.danger,
        tabBarIcon:() => (
        <MaterialCommunityIcons name='home' color='#8a8a8a' size={20}
        />),
       
     }}
     />
     <Tab.Screen
     name='Search'
     component={SearchScreen}
     options={{
      tabBarIcon: () => <MaterialCommunityIcons name='account-search' size={20} color='#8a8a8a'/>
     }}
    />
      <Tab.Screen 
        name="Notification"
     component={NotificationScreen}
     options={{
        tabBarIcon:() => <MaterialIcons name='notifications' color='#8a8a8a' size={20}/>
     }}
     />
      </Tab.Navigator>
  


  )
}

export default TabNavigation

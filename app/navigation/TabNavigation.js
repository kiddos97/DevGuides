
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import color from '../../config/color';
import HomeScreen from '../screen/HomeScreen';
import NotificationScreen from '../screen/NotificationScreen';




const TabNavigation = () => {
  const Tab = createMaterialBottomTabNavigator();


  return (
 
  <Tab.Navigator 
  initialRouteName='Welcome'
  labeled={false}
  barStyle={{ 
    backgroundColor:color.button,
  }}
>
    <Tab.Screen 
        name="Welcome"
     component={HomeScreen}
     options={{
        tabBarColor:color.danger,
        tabBarIcon:() => (
        <MaterialCommunityIcons name='home' color={color.Buttoncolor} size={25}
        />),
       
     }}
     />
      <Tab.Screen 
        name="Notification"
     component={NotificationScreen}
     options={{
        tabBarIcon:() => <MaterialIcons name='notifications' color={color.Buttoncolor} size={25}/>
     }}
     />
      </Tab.Navigator>
  


  )
}

export default TabNavigation

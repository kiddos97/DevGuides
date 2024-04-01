
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AccountScreen from '../screen/AccountScreen';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import color from '../../config/color';
import HomeScreen from '../screen/HomeScreen';



const TabNavigation = () => {
  const Tab = createMaterialBottomTabNavigator();


  return (
 
  <Tab.Navigator 
  initialRouteName='Home'
  activeColor={color.white}
  barStyle={{ 
    backgroundColor: color.backgroundColor
  }}>
    <Tab.Screen 
        name="Homepage"
     component={HomeScreen}
     options={{
        headerShown: false,
        tabBarLabel:'Home',
        tabBarIcon:() => <MaterialCommunityIcons name='home' color={color.white} size={25}/>
     }}
     />
      <Tab.Screen
      name="Account"
      component={AccountScreen}
      options={{
        headerShown:false
      }}/>
      </Tab.Navigator>
  


  )
}

export default TabNavigation


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
  labeled={false}
  barStyle={{ 
    backgroundColor: 'transparent',
    borderTopWidth: 0,
    position: 'absolute',
    left: 50,
    right: 50,
    bottom: 20,
    height: 100
  }}>
    <Tab.Screen 
        name="Homepage"
     component={HomeScreen}
     options={{
        tabBarIcon:() => <MaterialCommunityIcons name='home' color={color.white} size={25}/>
     }}
     />
      </Tab.Navigator>
  


  )
}

export default TabNavigation


import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screen/HomeScreen';
import { NavigationContainer } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AccountScreen from '../screen/AccountScreen';


const TabNavigation = () => {
    const Tab = createBottomTabNavigator();
  return (
   
  <Tab.Navigator initialRouteName='Home'>
    <Tab.Screen 
        name="Home"
     component={HomeScreen}
     options={{
        headerShown: false,
        tabBarLabel:'Home'
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

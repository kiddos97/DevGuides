import { createDrawerNavigator } from '@react-navigation/drawer';
import AccountScreen from '../screen/AccountScreen';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import TabNavigation from './TabNavigation';
import color from '../../config/color';
import StackNavigation from './StackNavigation';
const Drawer = createDrawerNavigator();

const DrawerNavigation = () => {
  return (

    
    <Drawer.Navigator 
    initialRouteName='Home'
    screenOptions={{
      drawerStyle:{
        backgroundColor:color.TextbackgroundColor
      }
    }}>
      <Drawer.Screen
      name='Home'
      component={StackNavigation}
      options={
        {headerShown:false}}/>
    <Drawer.Screen 
    name="Profile" 
    component={AccountScreen}  
    options={{ 
      drawerLabel: 'Profile',
      drawerLabelStyle:{
        color:color.AppBackgroundColor
      },
      drawerActiveTintColor:color.textinputColor }} />
    </Drawer.Navigator>
    
  )
}

export default DrawerNavigation

import { createDrawerNavigator } from '@react-navigation/drawer';
import AccountScreen from '../screen/AccountScreen';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import TabNavigation from './TabNavigation';
import color from '../../config/color';
import StackNavigation from './StackNavigation';
import { createContext } from 'react';



const Drawer = createDrawerNavigator();

const DrawerNavigation = ({route}) => {
  return (

    <Drawer.Navigator 
    initialRouteName='Home'
    screenOptions={{
      drawerStyle:{
        backgroundColor:color.white
      }
    }}>
      <Drawer.Screen
      name='Home'
      component={StackNavigation}
      initialParams={{route}}
      options={{headerShown:false}}/>
    <Drawer.Screen 
    name="Settings" 
    component={AccountScreen}  
    options={{ 
      drawerLabel: 'Settings',
      headerShown:false,
      drawerLabelStyle:{
        color:color.textcolor
      },
      drawerActiveTintColor:color.textinputColor }} />
    </Drawer.Navigator>

  )
}

export default DrawerNavigation

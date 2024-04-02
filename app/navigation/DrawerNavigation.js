import { createDrawerNavigator } from '@react-navigation/drawer';
import AccountScreen from '../screen/AccountScreen';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import TabNavigation from './TabNavigation';
import color from '../../config/color';
const Drawer = createDrawerNavigator();

const DrawerNavigation = () => {
  return (

    
    <Drawer.Navigator 
    initialRouteName='DevGuide'
    screenOptions={{
      drawerStyle:{
        backgroundColor:color.TextbackgroundColor
      }
    }}>
      <Drawer.Screen 
      name='DevGuide' 
      component={TabNavigation} 
      options={{ 
        headerShown:false,
        drawerLabel:'DevGuide',
        drawerLabelStyle:{
          color:color.AppBackgroundColor
        },
        drawerActiveTintColor:color.textinputColor}}/>
    <Drawer.Screen 
    name="Account" 
    component={AccountScreen}  
    options={{ 
      drawerLabel: 'Account',
      drawerLabelStyle:{
        color:color.AppBackgroundColor
      },
      drawerActiveTintColor:color.textinputColor }} />
    </Drawer.Navigator>
    
  )
}

export default DrawerNavigation

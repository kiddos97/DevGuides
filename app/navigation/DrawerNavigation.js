import { createDrawerNavigator } from '@react-navigation/drawer';
import AccountScreen from '../screen/AccountScreen';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import TabNavigation from './TabNavigation';
const Drawer = createDrawerNavigator();

const DrawerNavigation = () => {
  return (

    
    <Drawer.Navigator initialRouteName='DevGuide'>
      <Drawer.Screen name='DevGuide' component={TabNavigation} options={{ headerShown:false,drawerLabel:'DevGuide'}}/>
    <Drawer.Screen name="Account" component={AccountScreen}  options={{ drawerLabel: 'Account' }} />
    </Drawer.Navigator>
    
  )
}

export default DrawerNavigation

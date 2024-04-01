import { createDrawerNavigator } from '@react-navigation/drawer';
import AccountScreen from '../screen/AccountScreen';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import HomeScreen from '../screen/HomeScreen';
import StackNavigation from './StackNavigation';
const Drawer = createDrawerNavigator();

const DrawerNavigation = () => {
  return (

    
    <Drawer.Navigator>
    <Drawer.Screen name="Home" component={StackNavigation}
    options={{
        headerShown:false
    }} />
    <Drawer.Screen name="Account" component={AccountScreen}  options={{ drawerLabel: 'Account' }} />
    </Drawer.Navigator>
    
  )
}

export default DrawerNavigation

import { createDrawerNavigator } from '@react-navigation/drawer';
import AccountScreen from '../screen/AccountScreen';

const Drawer = createDrawerNavigator();

const DrawerNavigation = () => {
  return (
    <Drawer.Navigator>
    <Drawer.Screen name="Account" component={AccountScreen} />
  </Drawer.Navigator>
  )
}

export default DrawerNavigation

import { createDrawerNavigator } from '@react-navigation/drawer';
import color from '../../config/color';
import StackNavigation from './StackNavigation';
import ChatRoomHeader from '../components/ChatRoomHeader';
import SettingsScreen from '../screen/SettingsScreen';
import { useNavigation } from '@react-navigation/native';


const Drawer = createDrawerNavigator();

const DrawerNavigation = ({route}) => {
  const navigation = useNavigation();

  const handleBack = () => {
    navigation.navigate('Welcome');
  }
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
    component={SettingsScreen}  
    options={{ 
      drawerLabel: 'Settings',
      drawerLabelStyle:{
        color:color.textcolor
      },
      drawerActiveTintColor:color.white,
      header: () => <ChatRoomHeader  icon='keyboard-backspace' onPress={handleBack} backgroundColor={color.button} title='Settings'/> }} />
    </Drawer.Navigator>

  )
}

export default DrawerNavigation

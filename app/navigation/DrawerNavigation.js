import { createDrawerNavigator } from '@react-navigation/drawer';
import color from '../../config/color';
import StackNavigation from './StackNavigation';
import ChatRoomHeader from '../components/ChatRoomHeader';
import { useNavigation } from '@react-navigation/native';
import { lazy,Suspense } from 'react';
import { ActivityIndicator } from 'react-native';

const Drawer = createDrawerNavigator();

const SettingsScreen = lazy(() => import('../screen/SettingsScreen'))

const SettingsScreenWrapper = (props) => {
  
  return (

  <Suspense fallback={<ActivityIndicator size='small' color='#000' />}>
    <SettingsScreen {...props}/>
  </Suspense>

)}

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
        backgroundColor:color.white,
        
      }
    }}>
      <Drawer.Screen
      name='Home'
      component={StackNavigation}
      initialParams={{route}}
      options={{headerShown:false,
        swipeEnabled:false
       
      }}/>
    <Drawer.Screen 
    name="Settings" 
    component={SettingsScreenWrapper}  
    options={{ 
      drawerLabel: 'Settings',
      drawerLabelStyle:{
        color:color.textcolor
      },
      drawerActiveTintColor:color.white,
      swipeEnabled:false,
      header: () => <ChatRoomHeader  icon='keyboard-backspace' onPress={handleBack} backgroundColor={color.button} title='Settings'/> }} />
    </Drawer.Navigator>

  )
}

export default DrawerNavigation

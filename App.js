

import { NavigationContainer, useNavigation } from '@react-navigation/native';
import DrawerNavigation from './app/navigation/DrawerNavigation';
import { MenuProvider } from 'react-native-popup-menu';
import { AuthContextProvider } from './app/authContext';
import { StatusBar } from 'expo-status-bar';
import {useEffect,useState} from 'react'
import SplashScreen from './app/screen/SplashScreen';

export default function App() {

  const [loading,setLoading] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setLoading(false)

    },3000)

  },)
  return (

    <MenuProvider>
          <AuthContextProvider>
        <NavigationContainer>
          {loading ? <SplashScreen/> :   <DrawerNavigation/>}
      </NavigationContainer>
    </AuthContextProvider>
    <StatusBar style="light" />
    </MenuProvider>

       

   
   
 

  );
}







import { NavigationContainer, useNavigation } from '@react-navigation/native';
import DrawerNavigation from './app/navigation/DrawerNavigation';
import { MenuProvider } from 'react-native-popup-menu';
import { AuthContextProvider } from './app/authContext';
import { StatusBar } from 'expo-status-bar';
export default function App() {
  return (

    <MenuProvider>
          <AuthContextProvider>
        <NavigationContainer>
        <DrawerNavigation/>
      </NavigationContainer>
    </AuthContextProvider>
    <StatusBar style="light" />
    </MenuProvider>

       

   
   
 

  );
}



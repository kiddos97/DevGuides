

import { NavigationContainer, useNavigation } from '@react-navigation/native';
import DrawerNavigation from './app/navigation/DrawerNavigation';
import { MenuProvider } from 'react-native-popup-menu';
import { AuthContextProvider } from './app/authContext';

export default function App() {
  return (

    <MenuProvider>
          <AuthContextProvider>
        <NavigationContainer>
        <DrawerNavigation/>
      </NavigationContainer>
    </AuthContextProvider>
    </MenuProvider>

       

   
   
 

  );
}



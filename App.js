

import { NavigationContainer, useNavigation } from '@react-navigation/native';
import DrawerNavigation from './app/navigation/DrawerNavigation';

import { AuthContextProvider } from './app/authContext';

export default function App() {
  return (


    <AuthContextProvider>
        <NavigationContainer>
        <DrawerNavigation/>
      </NavigationContainer>
    </AuthContextProvider>
       

   
   
 

  );
}



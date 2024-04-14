

import { NavigationContainer, useNavigation } from '@react-navigation/native';
import DrawerNavigation from './app/navigation/DrawerNavigation';


export default function App({route}) {

  console.log(`route: ${route}`)
  return (



      <NavigationContainer>
        <DrawerNavigation/>
      </NavigationContainer>
   
 

  );
}



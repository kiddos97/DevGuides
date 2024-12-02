import { NavigationContainer} from '@react-navigation/native';
import DrawerNavigation from './app/navigation/DrawerNavigation';
import { MenuProvider } from 'react-native-popup-menu';
import { AuthContextProvider } from './app/authContext';
import { StatusBar } from 'expo-status-bar';
import {useEffect,useState} from 'react'
import SplashScreen from './app/screen/SplashScreen';
import store from './app/store';
import { Provider } from 'react-redux';
export default function App() {

  const [loading,setLoading] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setLoading(false)

    },3000)

  },[])
  return (

    <Provider store={store}>
        <MenuProvider>
          <AuthContextProvider>
        <NavigationContainer>
          {loading ? <SplashScreen/> :   <DrawerNavigation/>}
      </NavigationContainer>
    </AuthContextProvider>
    <StatusBar style="light" />
    </MenuProvider>
    </Provider>
  
  );
}





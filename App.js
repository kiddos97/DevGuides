
import { SafeAreaView, Text, View } from 'react-native';
import AppTextInput from './app/components/AppTextInput';
import LoginScreen from './app/screen/LoginScreen';
import HomeScreen from './app/screen/HomeScreen';
import TabNavigation from './app/navigation/TabNavigation';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import StackNavigation from './app/navigation/StackNavigation';
import DrawerNavigation from './app/navigation/DrawerNavigation';

export default function App() {
  return (


    <NavigationContainer>
    <DrawerNavigation/>
    </NavigationContainer>

  );
}




import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { lazy,Suspense } from 'react';
import { ActivityIndicator } from 'react-native';

const NotificationScreen = lazy(() => import('../screen/NotificationScreen'))
const SearchScreen = lazy(() => import('../screen/SearchScreen'))
const StackNavigation = lazy(() => import('./StackNavigation'))


const StackNavigationwrapper = (props) =>{
  return (
    <Suspense fallback={<ActivityIndicator size='small' color='"#000'/>}>
    <StackNavigation {...props}/>
  </Suspense>
  )}



const SearchScreenWrapper = (props) => {
  
    return(
      <Suspense fallback={<ActivityIndicator size='small' color='"#000'/>}>
        <SearchScreen  {...props}/>
      </Suspense>
    )}

const NotificationScreenWrapper = (props) => {
  
      return(
        <Suspense fallback={<ActivityIndicator size='small' color='"#000'/>}>
        <NotificationScreen  {...props}/>
      </Suspense>
      )}


const TabNavigation = () => {
  const Tab = createBottomTabNavigator()


  return (
 
  <Tab.Navigator 
  initialRouteName='Welcome'
  screenOptions={{
    headerShown: false, 
    tabBarStyle: {
      position: 'absolute',
      bottom: 0,
      height: 100,
      backgroundColor:'transparent',  
      elevation: 0, 
      borderTopWidth: 0, 
    },
    tabBarActiveBackgroundColor:'#252525',
    tabBarShowLabel: false,                  
  }}
>
    <Tab.Screen 
      name="Welcome"
     component={StackNavigationwrapper}
     options={{
        tabBarIcon:() => (
        <MaterialCommunityIcons name='home' color='#00bf63' size={25}
        />),
        gestureEnabled: false
       
     }}
     />
     <Tab.Screen
     name='Search'
     component={SearchScreenWrapper}
     options={{
      tabBarIcon: () => <MaterialCommunityIcons name='account-search' size={25} color='#00bf63'/>
     }}
    />
    <Tab.Screen 
        name="Notification"
        component={NotificationScreenWrapper}
     options={{
        tabBarIcon:() => <MaterialIcons name='notifications' color='#00bf63' size={25}/>
     }}
     />
      </Tab.Navigator>
  


  )
}

export default TabNavigation

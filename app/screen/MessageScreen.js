import React, {useState, useEffect,lazy,Suspense} from 'react'
import {View, Text, StyleSheet, Platform, StatusBar,ActivityIndicator} from 'react-native'
import color from '../../config/color';
import {  userRef, } from '../../FireBase/FireBaseConfig';
import { getDocs,query,where } from "firebase/firestore"; 
import { useAuth } from '../authContext';
import ChatRoomHeader from '../components/ChatRoomHeader';
import { useNavigation } from '@react-navigation/native';
const ChatList = lazy(() => import('../../List/ChatList'))

const MessageScreen = () => {


  const [users, setUsers] = useState([]);
  const navigation = useNavigation();
  const { user} = useAuth();

  useEffect(() => {
    if(user?.userId){
      grabUser();
    }
  },[])
  
  const handlePress = () => {
    navigation.navigate('Welcome');
  }

  const grabUser = async () => {

    try{
          const q  = query(userRef, where('userId','!=',user?.userId))
          const querySnapShot = await getDocs(q)
          let data = []
          querySnapShot.forEach(doc => {
            data.push({...doc.data()})
          })
          setUsers(data)
        }catch(error){
          console.error(`Failed to grab users: ${error}`)
    
        }

  }

  return (
    <View style={styles.screen}>
      <ChatRoomHeader title='Message' onPress={handlePress} icon='keyboard-backspace' backgroundColor={color.button}/>
      <View style={styles.container}>
      <View style={{marginTop:5}}>
       {users.length > 0 ? (
        <Suspense fallback={<ActivityIndicator size='small' color='#000'/>}>
            <ChatList currentUser={user} otherusers={users}/>
        </Suspense>
       ): (<View>
        <Text>Send a new message!</Text>
       </View>)}
       </View>
    </View>
  </View>
  )
}

const styles = StyleSheet.create({
    screen:{
      paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
      flex:1,
      backgroundColor:color.white
    },
    text:{
      color:'#fff',
      fontWeight:'bold',
      fontSize:15
      },
      container:{
        padding:10
      }
})
export default MessageScreen

import React, {useState, useEffect,lazy,Suspense} from 'react'
import {View, Text, StyleSheet, Platform, StatusBar,ActivityIndicator} from 'react-native'
import color from '../../config/color';
import {  userRef, } from '../../FireBase/FireBaseConfig';
import { getDocs,query,where } from "firebase/firestore"; 

import { useAuth } from '../authContext';

const ChatList = lazy(() => import('../../List/ChatList'))

const MessageScreen = () => {

 
  const [modalVisible, setModalVisible] = useState(false);
  const [users, setUsers] = useState([]);

  const { user} = useAuth();


  useEffect(() => {
    if(user?.userId){
      grabUser();
    }
  },[])
  

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
  

  const handleModal = () => {
    setModalVisible(true);
  }



  return (
    <View style={styles.screen}>
      <View style={styles.container}>
      <View style={{marginTop:10}}>
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
  container:{
    padding:10,
  },
    screen:{
      paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
      flex:1,
      backgroundColor:color.white
    },
    headingText:{
      textAlign:'center',
      fontSize:25,
      fontWeight:'bold',
      marginBottom:15,
      color:color.white

    },
    text:{
      color:'#fff',
      fontWeight:'bold',
      fontSize:15
      },
      messageIcon:{
        borderRadius:100,
        backgroundColor:color.grey,
        position:'absolute',
        bottom:20,
        right:20,
        padding:10,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 7,
        },
        shadowOpacity: 1,
        shadowRadius: 4.65,
      }
})
export default MessageScreen

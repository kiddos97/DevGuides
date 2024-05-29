import React, {useState, useEffect} from 'react'
import {View, Text, StyleSheet, Platform, StatusBar, TouchableOpacity, FlatList,Alert,ActivityIndicator} from 'react-native'
import SearchComponent from '../components/SearchComponent';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ListItem from '../../List/ListItem';
import ListItemDelete from '../../List/ListItemDelete'
import AntDesign from 'react-native-vector-icons/AntDesign';
import color from '../../config/color';
import NewMessageModal from '../components/NewMessageModal';
import {  db, userRef, roomRef } from '../../FireBase/FireBaseConfig';
import { collection, doc, setDoc,getDocs,query,where } from "firebase/firestore"; 
import ChatList from '../../List/ChatList';
import { useAuth } from '../authContext';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { getRoomID } from '../../utils';
import { useRoute } from '@react-navigation/native';

const MessageScreen = () => {

 
  //const [refreshing,setRefreshing] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [users, setUsers] = useState([]);




  const { user } = useAuth();
  console.log('message user uid:',user.uid)
  console.log('user id:', user?.userId)
  const route = useRoute();
  const {userid} = route?.params
  console.log('Message route:',userid)

  useEffect(() => {
    if(user?.userId){
      getUsers();
    }
  },[])
  

  const getUsers = async () => {
    //const q  = query(userRef, where('userId','!=',user?.userId))

    const roomId = getRoomID(user?.userId,userid);
    const roomDocRef = doc(db,'rooms',roomId)
    const subCollection = collection(roomDocRef,'messages');
    const q = query(subCollection,where('recipentName','!=',user?.username));
    try{
      const querySnapShot = await getDocs(q)
      let data = []
  
      querySnapShot.forEach(doc => {
        data.push({...doc.data()})
      })
  
      console.log('users:',data)
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
      <View style={{marginTop:30}}>
       {users.length > 0 ? (
       <ChatList currentUser={user} users={users}/>
       ): (<View>
        <Text>Send a new message!</Text>
       </View>)}
       </View>
    </View>

    <TouchableOpacity onPress={handleModal}  style={styles.messageIcon}>
        <AntDesign name='pluscircle' size={35} color={color.button}/>
       </TouchableOpacity>
       <NewMessageModal modalVisible={modalVisible} setModalVisible={setModalVisible}/>
  </View>
  )
}

const styles = StyleSheet.create({
  container:{
    padding:5,
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
      // listContainer:{
      //   flex:1,
      //   paddingHorizontal:10,
      //   marginVertical:10
      // }
   
})
export default MessageScreen

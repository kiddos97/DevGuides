import React, {useState, useEffect} from 'react'
import {View, Text, StyleSheet, Platform, StatusBar, TouchableOpacity, FlatList,SafeAreaView, ScrollView} from 'react-native'
import color from '../../config/color';
//import { message } from '../../Message/Message';
import SearchComponent from '../components/SearchComponent';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ListItem from '../../List/ListItem';
import ListItemDelete from '../../List/ListItemDelete'
import AntDesign from 'react-native-vector-icons/AntDesign';
//import axios from 'axios';
import { io } from "socket.io-client";
import NewMessageModal from '../components/NewMessageModal';



const MessageScreen = ({navigation}) => {


  const [messages, setMessages] = useState('');
  const [refreshing,setRefreshing] = useState(false);
  const [allchatrooms, setAllChatRooms] = useState([]);
  const [currentGroupName, setCurrentGroupName] = useState('')
  const [modalVisible, setModalVisible] = useState(false);

  const socket = io()
  useEffect(() => {
    
    socket.emit('getAllgroups');

    socket.on('groupList',(groups) => {
      setAllChatRooms(groups);
    })
    clientSide();
  },[socket])

  const clientSide = () => {
    try{
      const socket = io();
      socket.emit('createNewGroup',currentGroupName)
    }catch(error){
      console.error(`{error}`)
    }
  }

  // const handleDelete = (selectedMessage) => {

  // const newMessages = messages.filter((m) => m.id !== selectedMessage.id);
    
  //   setMessages(newMessages);
  // };

  const handlePress = () => {
    //navigation.dispatch(DrawerActions.openDrawer())
    navigation.navigate('Welcome');
  }
  const handleModal = () => {
    setModalVisible(true);
  }

  return (
    <View style={styles.screen}>
      <View style={styles.container}>
      <View style={styles.heading}>
        <View style={{marginTop:25}}>
        <TouchableOpacity onPress={handlePress}>
          <AntDesign name="back" color={color.dark} size={30} />
        </TouchableOpacity>
        </View>
        <Text style={styles.headingText}>Messages</Text>
        <SearchComponent/>
      </View>
      <TouchableOpacity onPress={handleModal}>
        <Text>New Message</Text>
      </TouchableOpacity>
      <NewMessageModal 
      modalVisible={modalVisible}
       setModalVisible={setModalVisible} 
       currentGroupName={currentGroupName} 
       setCurrentGroupName={setCurrentGroupName}/>
      {allchatrooms && allchatrooms.length > 0 ?       
      <FlatList
      data={allchatrooms}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <ListItem item={item}
      onPress={() => navigation.navigate('Chat',{userName: item.userName, id: item.id})} />} // Make sure ListitemSeparator is defined or import correctly
    /> : null }
    </View>
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
      backgroundColor:color.TextbackgroundColor,
    },
    heading:{
      marginBottom:20,
      marginVertical:35,
      padding:10,
    },
    headingText:{
      textAlign:'center',
      fontSize:25,
      fontWeight:'bold',
      marginBottom:15,
      color:color.AppBackgroundColor

    },
    text:{
      color:'#fff',
      fontWeight:'bold',
      fontSize:15
      },
   
})
export default MessageScreen

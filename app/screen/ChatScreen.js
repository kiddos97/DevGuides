
import {View, Text, StyleSheet,TouchableOpacity, Platform, StatusBar, SafeAreaView, FlatList}  from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import color from'../../config/color';
import React, { useState, useCallback, useEffect } from 'react'
import { GiftedChat, Send } from 'react-native-gifted-chat'
//import { io } from "socket.io-client";
import axios from 'axios';
import { socket } from '../../utils';
import MessageChat from '../components/MessageChat';
import AppTextInput from '../components/AppTextInput';
import Button from '../components/Button';

const ChatScreen = ({item, route}) => {

  const [allChatMessages, setallChatMessages] = useState([]);
  const [currentChatMessage, setCurrentChatMessage] = useState([]);

  const {userName, userid} = route.params


  useEffect(() => {
    socket.emit('findgroup',userid)
    socket.on('foundgroup', (allChatMessages) => setallChatMessages(allChatMessages))
  },[socket])
  const handleMessage = () => {
    const timeData ={
      hr: new Date().getHours() < 10 ? `0${new Date().getHours()}` : new Date().getHours(),
      mins: new Date().getMinutes() < 10 ? `0${new Date().getMinutes()}` : new Date().getMinutes()
    }

    if(userName){
      socket.emit('newChatMessage',{
        currentChatMessage,
        groupId:userid,
        userName,
        timeData
      })
      setCurrentChatMessage('')
    }
  }
  return (
   <View styles={styles.wrapper}>
    <View style={styles.innnerwrapper}>
      {
        allChatMessages && allChatMessages[0] ? (
          <FlatList
          data={allChatMessages}
          renderItem={({item}) => <MessageChat userName={userName} item={item}/>}/> )
          :''}
    </View>
    <View style={styles.messageinputContainer}>
      <View style={styles.messageinput}>
      <AppTextInput
      value={currentChatMessage}
      onChangeText={(value) => setCurrentChatMessage(value)}
      placeholder='Enter your Message'
      />
      </View>
      <View style={styles.button}>
      <Button title='Send' onPress={handleMessage}/>
    </View>
    </View>
   </View>

 
  )
}

const styles = StyleSheet.create({
  wrapper:{
    flex:1,
},
button:{
  width:'30%',
  borderRadius:50,
  alignItems:'center',
  justifyContent:'center',
},
messageinputContainer:{
  width:'100%',
  backgroundColor:'#fff',
  paddingVertical:30,
  paddingHorizontal:15,
  justifyContent:'center',
  flexDirection:'row',

},
messageinput:{
  borderWidth:1,
  padding:15,
  flex:1,
  borderRadius:50,
  marginRight:10
},
})

export default ChatScreen

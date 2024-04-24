
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

  const [messages, setMessages] = useState([])

  // const [allChatMessages, setallChatMessages] = useState([]);
  // const [currentChatMessage, setCurrentChatMessage] = useState([]);

  // const {user, userid} = route.params


  // useEffect(() => {
  //   socket.emit('findgroup',userid)
  //   socket.on('foundgroup', (allChatMessages) => setallChatMessages(allChatMessages))
  // },[socket])
  // const handleMessage = () => {
  //   const timeData ={
  //     hr: new Date().getHours() < 10 ? `0${new Date().getHours()}` : new Date().getHours(),
  //     mins: new Date().getMinutes() < 10 ? `0${new Date().getMinutes()}` : new Date().getMinutes()
  //   }

  //   if(user){
  //     socket.emit('newChatMessage',{
  //       currentChatMessage,
  //       groupId:userid,
  //       user,
  //       timeData
  //     })
  //     setCurrentChatMessage('')
  //   }
  // }
    useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: 'Hello developer',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any',
        },
      },
    ])
  }, [])

  const onSend = useCallback((messages = []) => {
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, messages),
    )
  }, [])

  const renderSend = (props) => {
    return (
      <Send
      {...props}
      >
        <View>
          <MaterialCommunityIcons
          style={{ marginBottom:10, marginRight:10}}
          name='send-circle'
          size={32}
          color='#2e64e5'/>
        </View>
      </Send>
    )}

  return (
    <View style={styles.screen}>
      <GiftedChat
          messages={messages}
          onSend={messages => onSend(messages)}
          user={{
          _id: 1,
          }}
          textInputStyle={styles.text}
          alwaysShowSend
          renderSend={renderSend}
          scrollToBottom
          isTyping={true}
          />
    </View>

 
  )
}

const styles = StyleSheet.create({
  screen:{
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

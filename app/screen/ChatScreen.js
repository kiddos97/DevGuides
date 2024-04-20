
import {View, Text, StyleSheet,TouchableOpacity, Platform, StatusBar, SafeAreaView}  from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import color from'../../config/color';
import React, { useState, useCallback, useEffect } from 'react'
import { GiftedChat, Send } from 'react-native-gifted-chat'
import { io } from "socket.io-client";
import axios from 'axios';

const ChatScreen = ({item}) => {
  const [messages, setMessages] = useState([])

  // useEffect(() => {
  //   setMessages([
  //     {
  //       _id: 1,
  //       text: 'Hello developer',
  //       createdAt: new Date(),
  //       user: {
  //         _id: 2,
  //         name: 'React Native',
  //         avatar: 'https://placeimg.com/140/140/any',
  //       },
  //     },
  //   ])
  // }, [])

  useEffect(() => {
    clientSide();
  },[])

 


  const clientSide = () => {// creating client connection
    try{
      const socket = io('http://localhost:3000'); 
      socket.on('message',(newMessage) => {
        setMessages((previousMessages) => {
        GiftedChat.append(previousMessages,newMessage)
      })})
    }catch(error){
      console.error(`${error}`)
    }
  }

  const onSend = useCallback((messages = []) => {
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, messages),
    )

    const newMessage = messages[0]

    sendMessgae(newMessage)
  }, [])


  const sendMessgae = async (newMessage) => {
    try{
      const response = await axios.post('http://localhost:3000/send-message' ,{
        message: newMessage,
        name: route.params.userName})
      console.log('Message sent:', response.data)
    }catch(error){
      console.error(`${error}`)
    }
  }



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
    )
  }

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
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    flex:1,
    marginBottom:10,
    padding:5
},
container:{
  marginVertical:50,
  padding: 5,
},
text:{
marginBottom:10
}
})

export default ChatScreen

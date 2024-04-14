
import {View, Text, StyleSheet,TouchableOpacity, Platform, StatusBar, SafeAreaView}  from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign';
import color from'../../config/color';
import React, { useState, useCallback, useEffect } from 'react'
import { GiftedChat } from 'react-native-gifted-chat'
import person from "../assets/person.jpg"


const ChatScreen = () => {
  const [messages, setMessages] = useState([])

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: 'Hello developer',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
          avatar: person,
        },
      },
    ])
  }, [])

  const onSend = useCallback((messages = []) => {
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, messages),
    )
  }, [])

  return (
    <View style={{flex:1, marginBottom:10, padding:5}}>
          <GiftedChat
    messages={messages}
    onSend={messages => onSend(messages)}
    user={{
      _id: 1,
    }}
    textInputStyle={styles.text}
    alwaysShowSend
  />
      </View>

 
  )
}

const styles = StyleSheet.create({
  screen:{
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    flex:1
},
container:{
  marginVertical:50,
  padding: 10
},
text:{
marginBottom:10,
padding:10
}
})

export default ChatScreen

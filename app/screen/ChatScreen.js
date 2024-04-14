
import {View, Text, StyleSheet,TouchableOpacity, Platform, StatusBar, SafeAreaView}  from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import color from'../../config/color';
import React, { useState, useCallback, useEffect } from 'react'
import { GiftedChat, Send } from 'react-native-gifted-chat'
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
          color='lightblue'/>
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
marginBottom:5,
}
})

export default ChatScreen

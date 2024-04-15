
import {View, Text, StyleSheet,TouchableOpacity, Platform, StatusBar, SafeAreaView}  from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import color from'../../config/color';
import React, { useState, useCallback, useEffect } from 'react'
import { GiftedChat, Send } from 'react-native-gifted-chat'
import person from "../assets/person.jpg"


const ChatScreen = () => {
  const [messages, setMessages] = useState([])

  useEffect(() => {
    fetchMessageHistory();
  }, [])


  const fetchMessageHistory = async () => {
    try {
      const response = await axios.get('http://192.168.86.41:3000/message-history');
      setMessages(response.data.messages);
    } catch (error) {
      console.error('Error fetching message history:', error);
    }
  };


  const onSend = async (newMessages = []) => {
    try {
      // Send new message to backend
      const response = await axios.post('http://192.168.86.41:3000/send-message', {
        message: newMessages[0],
      });
      // Update local message state with the new message
      setMessages((prevMessages) => GiftedChat.append(prevMessages, response.data.message));
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };


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

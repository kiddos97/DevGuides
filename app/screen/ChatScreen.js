
import {View, Text, StyleSheet,TouchableOpacity, Platform, KeyboardAvoidingView}  from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import color from'../../config/color';
import React, { useState, useCallback, useEffect, useLayoutEffect} from 'react'
import { GiftedChat, Send } from 'react-native-gifted-chat'
import { db } from '../../FireBase/FireBaseConfig';
import { collection, doc, setDoc,getDocs,query,where,onSnapshot,orderBy, Timestamp} from "firebase/firestore"; 
import { FIREBASE_APP } from '../../FireBase/FireBaseConfig';
import { getAuth,onAuthStateChanged } from 'firebase/auth';
import MessageList from '../components/MessageList';
import AppTextInput from '../components/AppTextInput';
import { getRoomID } from '../../utils';

const auth = getAuth(FIREBASE_APP);

const ChatScreen = ({ item, route }) => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if(user){
        createRoom(user?.uid, item?.userId);
      }
  })
    
  },[])

//   useEffect(() => {
//     onAuthStateChanged(auth, (user) => {
//          if(user.uid){
//              getUsers(user);
//          }
//      })
// },[])
  const createRoom = async (user,item) => {
    let roomId = getRoomID(user?.userId, item?.userId)
    await setDoc(doc(db,'rooms',roomId),{
      roomId,
      createdAt: Timestamp.fromDate(new Date())
    })
  };

  const handleSend = () => {
    console.log('send button pressed')
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : 'height'}
      style={styles.container}
    >
      <View style={styles.messagesContainer}>
        <MessageList messages={messages} />
      </View>
      <View style={styles.inputContainer}>
        <View style={styles.messageInput}>
          <AppTextInput
          onPress={handleSend}
            placeholder='Enter message....'
            backgroundColor={color.danger}
            icon='send'
          />
        </View>
        </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  messagesContainer: {
    flex: 1,
    paddingBottom: 10,
    padding:10 // Adjust this value according to your needs
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingBottom: Platform.OS === "ios" ? 20 : 10,
    borderRadius:30
  },
  messageInput: {
    flex: 1,
  },
  sendButton: {
    padding: 10,
  },
});

export default ChatScreen

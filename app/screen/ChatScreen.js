
import {View, Text, StyleSheet,TouchableOpacity, Platform, KeyboardAvoidingView}  from 'react-native'
import color from'../../config/color';
import React, { useState, useCallback, useEffect, useLayoutEffect, useRef} from 'react'
import {  addDoc, collection, doc, onSnapshot, orderBy, setDoc, Timestamp} from "firebase/firestore"; 
import MessageList from '../components/MessageList';
import AppTextInput from '../components/AppTextInput';
import { getRoomID } from '../../utils';
import { useAuth } from '../authContext';
import { db } from '../../FireBase/FireBaseConfig';
import { useRoute } from '@react-navigation/native';



const ChatScreen = () => {
  const [messages, setMessages] = useState([]);
  const route = useRoute();
  console.log('route:',route)
  // const { item } = route.params;
  const { user } = useAuth();
  console.log('user id:',user.uid)
  console.log('item id:',route?.params?.params?.userId)

  useEffect(() => {
    createRoom();

    let roomId = getRoomID(user?.uid,route?.params?.params?.userId)
    const docRef = doc(db,'rooms',roomId);
    const messageRef = collection(docRef,'messages')
    const q = query(messageRef, orderBy('createdAt','asc'));
    let unsub = onSnapshot(q, (snapshot) => {
      let allmessage = snapshot.docs.map(doc => {
        return doc.data()
      });
      setMessages([...allmessage])
  })
    return unsub
    
  },[])

  const createRoom = async () => {
    try{
      let roomId = getRoomID(user?.uid, route?.params?.userId)
      await setDoc(doc(db,'rooms',roomId),{
        roomId,
        createdAt: Timestamp.fromDate(new Date())
      })
      console.log("Room created successfully with ID:", roomId);
    } catch (error) {
      console.error("Error creating room:", error);
    }
  };

  const handleSend = async () => {
    try{
      let roomId = getRoomID(user?.uid, route?.params?.userId);
      const docRef = doc(db,'rooms',roomId);
      const messageRef = collection(docRef,'messages')


      const newDoc = await addDoc(messageRef,{
        userId:user?.uid,
        text:messageRef,
        senderName: user?.username,
        createdAt: Timestamp.fromDate(new Date())
      })

      console.log('new message id:', newDoc.id)
    }catch(error){
      console.error(`${error}`)
    }
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : 'height'}
      style={styles.container}
    >
      <View style={styles.messagesContainer}>
        <MessageList messages={messages} currentUser={user} />
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

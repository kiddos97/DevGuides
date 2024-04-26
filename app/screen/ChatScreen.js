
import {View, Text, StyleSheet,TouchableOpacity, Platform, KeyboardAvoidingView,TextInput}  from 'react-native'
import color from'../../config/color';
import React, { useState, useEffect, useRef} from 'react'
import {  addDoc, collection, doc, onSnapshot, orderBy, setDoc, Timestamp,query} from "firebase/firestore"; 
import MessageList  from '../components/MessageList';
import { getRoomID } from '../../utils';
import { useAuth } from '../authContext';
import { db } from '../../FireBase/FireBaseConfig';
import { useRoute } from '@react-navigation/native';
import CustomKeyboardView from '../components/CustomKeyboardView';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Feather from 'react-native-vector-icons/Feather';

const ChatScreen = () => {
  const [messages, setMessages] = useState([]);
  const route = useRoute();
  console.log('route:',route)
  // const { item } = route.params;
  const { user } = useAuth();
  console.log('user id:',user.userId)
  console.log('item id:',route?.params?.item?.userId)

  const textRef = useRef('');
  const inputRef = useRef(null);

  useEffect(() => {
    createRoom();

    let roomId = getRoomID(user?.userId,route?.params?.item?.userId)
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
    
  },[]);

  const createRoom = async () => {
    try{
      let roomId = getRoomID(user?.userId, route?.params?.item?.userId)
      await setDoc(doc(db,'rooms',roomId),{
        roomId,
        createdAt: Timestamp.fromDate(new Date())
      })
      console.log("Room created successfully with ID:", roomId);
    } catch (error) {
      console.error("Error creating room:", error);
    }
  };
  console.log('Message',messages)

  const handleSend = async () => {
    let message = textRef.current.trim();
    if(!message) return;
    try{
      let roomId = getRoomID(user?.userId, route?.params?.item?.userId);
      const docRef = doc(db,'rooms',roomId);
      const messageRef = collection(docRef,'messages')
      textRef.current ="";
      if(inputRef) inputRef?.current?.clear();

      const newDoc = await addDoc(messageRef,{
        userId:user?.userId,
        text:message,
        senderName: user?.username,
        createdAt: Timestamp.fromDate(new Date())
      })

      // setMessages(prevMessages => [...prevMessages, {
      //   userId: user?.userId,
      //   text: message,
      //   senderName: user?.username,
      //   createdAt: Timestamp.fromDate(new Date())
      // }]);

      console.log('new message id:', newDoc.id)
    }catch(error){
      console.error(`${error}`)
    }
  }

  return (
    <CustomKeyboardView
    inChat={true}
      behavior={Platform.OS === "ios" ? "padding" : 'height'}
      style={styles.container}
    >
      <View style={styles.messagesContainer}>
        <MessageList messages={messages} currentUser={user} />
      </View>
      <View style={{marginBottom:hp(1.7), paddingTop:5}}>
      <View style={styles.inputContainer}>
        <View style={styles.messageInput}>
          <TextInput
          style={[styles.textinput,{fontSize:hp(2)}]}
            ref={inputRef}
            onChangeText={value => textRef.current = value}
            placeholder='Enter message....'
          />
          <TouchableOpacity onPress={handleSend}>
            <View style={styles.sendButton}>
            <Feather
            name='send'
            size={hp(2.7)}
            color='#737373'/>
            </View>
          </TouchableOpacity>
        </View>
        </View>
      </View>
      
    </CustomKeyboardView>
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
    justifyContent:'space-between',
    alignItems:'center',
    marginRight:3,
    marginLeft:3,
    paddingBottom: Platform.OS === "ios" ? 20 : 10,
  },
  messageInput: {
    flexDirection:'row',
    justifyContent:'space-between',
    backgroundColor:color.white,
    borderWidth:2,
    borderColor:color.grey,
    padding:5,
    borderRadius:30
  },
  textinput:{
    flex:1,
    marginRight:2
  },
  sendButton: {
    padding: 10,
    borderRadius:100,
    marginRight:1,
    backgroundColor:color.grey
  },
});

export default ChatScreen

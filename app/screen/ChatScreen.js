
import {View, Text, StyleSheet,TouchableOpacity, Platform, KeyboardAvoidingView,TextInput}  from 'react-native'
import color from'../../config/color';
import React, { useState, useEffect, useRef} from 'react'
import {  addDoc, collection, doc, onSnapshot, orderBy, setDoc, Timestamp,query, getDoc} from "firebase/firestore"; 
import MessageList  from '../components/MessageList';
import { getRoomID } from '../../utils';
import { useAuth } from '../authContext';
import { IdRef, db, roomRef } from '../../FireBase/FireBaseConfig';
import { useRoute } from '@react-navigation/native';
import CustomKeyboardView from '../components/CustomKeyboardView';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Feather from 'react-native-vector-icons/Feather';
import ChatRoomHeader from '../components/ChatRoomHeader';
import { useNavigation } from '@react-navigation/native';

const ChatScreen = () => {
  const [messages, setMessages] = useState([]);
 

  const route = useRoute();
  const { item } = route.params;
  const { user } = useAuth();//current user logged in

  const navigation = useNavigation();

  const textRef = useRef('');
  const inputRef = useRef(null);

  
  useEffect(() => {
    const loadMessages = (roomId) => {
      const docRef = doc(db, 'rooms', roomId);
      const messageRef = collection(docRef, 'messages');
      const q = query(messageRef, orderBy('createdAt', 'asc'));
      let unsub = onSnapshot(q, (snapshot) => {
        let allMessages = snapshot.docs.map((doc) => doc.data());
        setMessages([...allMessages]);
      });
      return unsub;
    };
  
    const roomId = route?.params?.userid
      ? getRoomID(user?.userId, route?.params?.userid)
      : item?.userId
      ? getRoomID(user?.userId, item.userId)
      : null;
  
    if (roomId) {
      createRoom();
      const unsubscribe = loadMessages(roomId);
      return () => unsubscribe();
    }
  
  }, [route?.params?.userid, item?.userId]); // Dependency array
  

  const createRoom = async () => {
    try{
      const roomId = route?.params?.userid
      ? getRoomID(user?.userId, route?.params?.userid)
      : item?.userId
      ? getRoomID(user?.userId, item.userId)
      : null;
      await setDoc(doc(db,'rooms',roomId),{
        roomId,
        createdAt: Timestamp.fromDate(new Date())
      })
    } catch (error) {
      console.error("Error creating room:", error);
    }
  };
  console.log('Message',messages)

  const handleSend = async () => {
    let message = textRef.current.trim();
    if(!message) return;
    try{
      const roomId = route?.params?.userid
      ? getRoomID(user?.userId, route?.params?.userid)
      : item?.userId
      ? getRoomID(user?.userId, item.userId)
      : null;
      const docRef = doc(db,'rooms',roomId);
      const messageRef = collection(docRef,'messages')
      textRef.current ="";
      if(inputRef) inputRef?.current?.clear();
      
      const recipentNamec = route?.params?.userid 
  ? route?.params?.name 
  : item?.userId 
  ? item.username 
  : 'Unknown Recipient';


      const newDoc = await addDoc(messageRef,{
        userId:user?.userId,
        text:message,
        senderName: user?.username,
        recipentName:recipentNamec,
        createdAt: Timestamp.fromDate(new Date())
      })
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
      <ChatRoomHeader 
      title={route?.params?.name} 
      backgroundColor={color.button} 
      icon='keyboard-backspace'
      onPress={() => navigation.navigate('Welcome')}/>
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
    backgroundColor:'#fff'
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

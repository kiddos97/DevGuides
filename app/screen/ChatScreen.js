
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
  const [document, setDocument] = useState(null)
  const route = useRoute();
  console.log('Chat route:',route)
  // const { item } = route.params;
  const { user } = useAuth();
  console.log('Chat user id:',user.userId)
  console.log('Chat route name:',route?.params?.name)

  //const { userId} = route?.params

  // console.log('chat name: ',name)
  // console.log('chat id:', userId)
  console.log('userID: ', route?.params?.userId)

  const navigation = useNavigation();

  const textRef = useRef('');
  const inputRef = useRef(null);

  useEffect(() => {
    createRoom();
    getUser();

    let roomId = getRoomID(user?.userId,route?.params?.userId)
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

 
  const getUser = async () =>{
    const docRef = doc(db,'ID',route?.params?.userId)
    const docSnap = await getDoc(docRef)

    try{
      if(docSnap.exists()){
        setDocument(docSnap.data())
      }
    }catch(error){//set error
      console.error(`NO Document exists: ${error}`)
    }

    
  }

  const createRoom = async () => {
    try{
      let roomId = getRoomID(user?.userId,route?.params?.userId)
      await setDoc(doc(db,'rooms',roomId),{
        roomId,
        createdAt: Timestamp.fromDate(new Date())
      })
      console.log("Room created successfully with ID: ", roomId);
    } catch (error) {
      console.error("Error creating room:", error);
    }
  };
  console.log('Message',messages)

  const handleSend = async () => {
    let message = textRef.current.trim();
    if(!message) return;
    try{
      let roomId = getRoomID(user?.userId,route?.params?.userId);
      const docRef = doc(db,'rooms',roomId);
      const messageRef = collection(docRef,'messages')
      textRef.current ="";
      if(inputRef) inputRef?.current?.clear();

      const newDoc = await addDoc(messageRef,{
        userId:user?.userId,
        text:message,
        senderName: user?.username,
        recipentName:route?.params?.name,
        createdAt: Timestamp.fromDate(new Date())
      })

      const IDdoc = setDoc(doc(db,'ID',route?.params?.userId),{
        name:route?.params?.name,
        userId:route?.params?.userId
      })
      console.log('The id: ', IDdoc.id)
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

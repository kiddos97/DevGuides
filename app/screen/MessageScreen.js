import React, {useState, useEffect,lazy,Suspense,useCallback} from 'react'
import {View, Text, StyleSheet, Platform, StatusBar,ActivityIndicator,ScrollView,RefreshControl} from 'react-native'
import color from '../../config/color';
import {db } from '../../FireBase/FireBaseConfig';
import { getDocs,query,where,doc,collection } from "firebase/firestore"; 
import { useAuth } from '../authContext';
import ChatRoomHeader from '../components/ChatRoomHeader';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
const ChatList = lazy(() => import('../../List/ChatList'))


const MessageScreen = () => {


  const [users, setUsers] = useState([]);
  const navigation = useNavigation();
  const { user} = useAuth();
  const [refreshing, setRefreshing] = useState(false);
  const list_of_ids = useSelector((state)=> state.message.messagesID)

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await grabUser(); // Re-fetch user data
    setRefreshing(false); // End refreshing state
  }, [list_of_ids]);

  useEffect(() => {
    if(user?.userId){
      grabUser();
    }
  },[])
  
  const handlePress = () => {
    navigation.navigate('Main');
  }

  const grabUser = async () => {

    try{

          const docRef = collection(db,'MessageID')
          const q  = query(docRef, where('userId','!=',user?.userId))
          const querySnapShot = await getDocs(q)
          let data = []
          querySnapShot.forEach(doc => {
            data.push({...doc.data()})
          })
          setUsers(data)
        }catch(error){
          console.error(`Failed to grab users: ${error}`)
    
        }

  }

  return (
    <View style={styles.screen}>
      <ChatRoomHeader title='Message' onPress={handlePress} icon='keyboard-backspace' backgroundColor={color.button}/>
      <ScrollView
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}
      >
      <View style={styles.container}>
      <View style={{marginTop:5}}>
       {users.length > 0 ? (
        <Suspense fallback={<ActivityIndicator size='small' color='#fff'/>}>
            <ChatList currentUser={user} otherusers={users}/>
        </Suspense>
       ): (<View>
        <Text>Send a new message!</Text>
       </View>)}
       </View>
    </View>
      </ScrollView>
  </View>
  )
}

const styles = StyleSheet.create({
    screen:{
      paddingTop: Platform.OS === 'ios' ? StatusBar.currentHeight : 0,
      flex:1,
      backgroundColor:color.backgroundcolor
    },
    text:{
      color:'#fff',
      fontWeight:'bold',
      fontSize:15
      },
})
export default MessageScreen

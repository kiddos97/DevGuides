import React, {useState, useEffect} from 'react'
import {View, Text, StyleSheet, Platform, StatusBar, TouchableOpacity, FlatList,Alert,ActivityIndicator} from 'react-native'
import SearchComponent from '../components/SearchComponent';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ListItem from '../../List/ListItem';
import ListItemDelete from '../../List/ListItemDelete'
import AntDesign from 'react-native-vector-icons/AntDesign';
import color from '../../config/color';
import NewMessageModal from '../components/NewMessageModal';
import ChatRoom from '../components/ChatRoom';
import {  db, userRef } from '../../FireBase/FireBaseConfig';
import { collection, doc, setDoc,getDocs,query,where } from "firebase/firestore"; 
import ChatList from '../../List/ChatList';
import { useAuth } from '../authContext';


const MessageScreen = ({route,navigation}) => {

 
  //const [refreshing,setRefreshing] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [users, setUsers] = useState([]);




  const { user } = useAuth();
  console.log('message user uid:',user.uid)

  useEffect(() => {
    if(user?.uid){
      getUsers();
    }
  },[])
  

  const getUsers = async () => {
    const q = query(userRef, where('userId','!=',user?.uid))


    const querySnapShot = await getDocs(q)
    let data = []

    querySnapShot.forEach(doc => {
      data.push({...doc.data()})
    })

    console.log('users:',data)
    setUsers(data)
  }


  const handlePress = () => {
    //navigation.dispatch(DrawerActions.openDrawer())
    navigation.navigate('Welcome');
  }
  const handleModal = () => {
    setModalVisible(true);
  }


  return (
    <View style={styles.screen}>
      <View style={styles.container}>
      <View style={styles.heading}>
        <View style={{marginTop:25}}>
        <TouchableOpacity onPress={handlePress}>
          <AntDesign name="back" color={color.dark} size={30} />
        </TouchableOpacity>
        </View>
        <Text style={styles.headingText}>Messages</Text>
        <SearchComponent/>
      </View>
      <View>
       {users.length > 0 ? (
       <ChatList currentUser={user} users={users}/>
       ): (<View>
        <ActivityIndicator size='large' color={color.textcolor} />
       </View>)}
       </View>
    </View>
  </View>
  )
}

const styles = StyleSheet.create({
  container:{
    padding:5,
  },
    screen:{
      paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
      flex:1,
      backgroundColor:color.primary
    },
    heading:{
      marginBottom:20,
      marginVertical:35,
      padding:10,
    },
    headingText:{
      textAlign:'center',
      fontSize:25,
      fontWeight:'bold',
      marginBottom:15,
      color:color.white

    },
    text:{
      color:'#fff',
      fontWeight:'bold',
      fontSize:15
      },
      // listContainer:{
      //   flex:1,
      //   paddingHorizontal:10,
      //   marginVertical:10
      // }
   
})
export default MessageScreen

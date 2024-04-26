import { View, Text, TouchableOpacity,StyleSheet,Image, TouchableHighlight} from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useState, useEffect } from 'react';
import { MdWidthFull } from 'react-icons/md';
import person from '../assets/person.jpg'
import color from '../../config/color';
import { getRoomID } from '../../utils';
import { useAuth } from '../authContext';
import { db } from '../../FireBase/FireBaseConfig';
import { collection, doc,query,onSnapshot, orderBy } from "firebase/firestore"; 
const ChatRoom = ({item, onPress,currentUser}) => {

 
    const [lastMessage, setLastMessage] = useState(undefined);
    useEffect(() => {
       
    
        let roomId = getRoomID(currentUser?.userId,item?.userId)
        const docRef = doc(db,'rooms',roomId);
        const messageRef = collection(docRef,'messages')
        const q = query(messageRef, orderBy('createdAt','desc'));
        let unsub = onSnapshot(q, (snapshot) => {
          let allmessage = snapshot.docs.map(doc => {
            return doc.data()
          });
          setLastMessage(allmessage[0] ? allmessage[0]: null)
      })
        return unsub
        
      },[])

      const renderTime = () => {
        if(lastMessage){
            let date = lastMessage?.createdAt
            return formatDate(new Date(date?.seconds * 1000))
        }
      }

      const renderLastMessage =() => {
        if(typeof lastMessage == 'undefined') return 'Loading...'
        if(lastMessage){
            if(currentUser.userId= lastMessage.userId){
                return 'You: '+ lastMessage?.text
            }
            return lastMessage?.text;
        }else{
            return 'Say Hi'
        }
      }
  return (
 
    <TouchableHighlight
    underlayColor="grey"
    onPress={onPress}>
        <View style={styles.container}>
        <View style={styles.iconContainer}>
        </View>
         <Image style={styles.image} source={person} />
         <View style={styles.detailsContainer}>
            {/*Name and last message */}
             <Text numberOfLines={1} style={styles.title}>{item?.username}</Text>
             <Text  numberOfLines={2} style={styles.subTitle} >{renderTime()}</Text>
             <Text  numberOfLines={2} style={styles.subTitle} >{renderLastMessage()}</Text>
         </View>
         <MaterialCommunityIcons color={color.medium} name="chevron-right" size={25}/>
        </View>
    </TouchableHighlight>
   
  
  )
}

const styles = StyleSheet.create({
  container:{
      flexDirection:'row',
      padding: 15,
      alignItems:'center'
  },
  detailsContainer:{
      flex:1,
      marginLeft:10,
      justifyContent:'center'
  },
  iconContainer:{
      borderRadius:50,
  },
  image:{
      width:50,
      height: 50,
      borderRadius: 50,
      marginRight:10
  },
  title:{
      fontWeight: 500,
      marginBottom:5
      
  },
  subTitle:{
      color:'#6e6969'
  }
})

export default ChatRoom

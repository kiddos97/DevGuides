import { View, Text, TouchableOpacity,StyleSheet, TouchableHighlight} from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useState, useEffect } from 'react';
import { useAuth } from '../authContext';
import { db, roomRef} from '../../FireBase/FireBaseConfig';
import { collection, doc,query,onSnapshot, orderBy } from "firebase/firestore"; 
import { blurhash } from '../../utils/index';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { Image } from 'expo-image';
import { getRoomID,formatDate } from '../../utils';
const ChatRoom = ({next_item, onPress,User}) => {

 

  const {user } = useAuth();
 
    const [lastMessage, setLastMessage] = useState(undefined);
    useEffect(() => {
       
    
        roomId = getRoomID(User?.userId,next_item?.userId)
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
            if(User.userId == lastMessage.userId){
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
          <View>
          <Image
              style={{height:hp(4.3), aspectRatio:1, borderRadius:100}}
              placeholder={blurhash}
              transition={500}/>
          </View>
         <View style={styles.detailsContainer}>
            {/*Name and last message */}
             <Text numberOfLines={1} style={styles.title}>{next_item?.username}</Text>
             <Text  numberOfLines={2} style={styles.subTitle} >{renderLastMessage()}</Text>
         </View>
         <Text  numberOfLines={2} style={styles.subTitle} >{renderTime()}</Text>
        </View>
    </TouchableHighlight>
   
  
  )
}

const styles = StyleSheet.create({
  container:{
      flexDirection:'row',
      padding: 10,
      alignItems:'center',
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
      marginBottom:5,
      color:"#000"
      
  },
  subTitle:{
      color:'#6e6969'
  }
})

export default ChatRoom

import { View, Text, TouchableOpacity,StyleSheet} from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useState, useEffect } from 'react';
import { MdWidthFull } from 'react-icons/md';


const ChatRoom = ({item, onPress}) => {

  const [messages, setMessages] = useState('');

  useEffect(() => {
    setMessages(item.messages[item.messages.length - 1 ])
  })
  return (
    <TouchableOpacity onPress={onPress}>
       <View style={styles.chat}>
        <View style={styles.circle}>
        <MaterialCommunityIcons name='account'size={25}/>
        </View>
       <View style={styles.rightcontainer}>
        <Text style={styles.user}>{item.currentGroupName}</Text>
        <Text style={styles.message}>{messages?.text ? messages.text :"Tap to start messaging"}</Text>
       </View>
       <View>
        <Text style={styles.time}>
          {messages?.time ? messages.time: 'Now'}
        </Text>
       </View>
       </View>
    </TouchableOpacity>
  
  )
}

const styles = StyleSheet.create({
  chat:{
    width:'100%',
    flexDirection:'row',
    alignItems:'center',
    borderRadius:5,
    padding:10,
    backgroundColor:"#fff",
    height:80,
    marginBottom:10
  },
  user:{
    fontSize:10,
    marginBottom:5,
    fontWeight:'bold'
  },
  message:{
    fontSize:14,
    opacity:0.8
  },
  rightcontainer:{
    flexDirection:'row',
    justifyContent:'space-between',
    flex:1
  },
  time:{
    opacity:0.6
  },
  circle:{
  width:50,
  borderRadius:50,
  height:50,
  alignItems:'center',
  justifyContent:'center',
  borderWidth:2,
  marginRight:10
  }
});

export default ChatRoom

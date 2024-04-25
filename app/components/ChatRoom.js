import { View, Text, TouchableOpacity,StyleSheet,Image, TouchableHighlight} from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useState, useEffect } from 'react';
import { MdWidthFull } from 'react-icons/md';
import person from '../assets/person.jpg'
import color from '../../config/color';
const ChatRoom = ({item, onPress}) => {

 

  // useEffect(() => {
  //   setMessages(item.messages[item.messages.length - 1 ])
  // })
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
             <Text  numberOfLines={2} style={styles.subTitle} >Time</Text>
             <Text  numberOfLines={2} style={styles.subTitle} >Last Message</Text>
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

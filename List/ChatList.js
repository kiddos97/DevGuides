import React from 'react'
import {View, Text,FlatList,ScrollView} from 'react-native'
import ChatRoom from '../app/components/ChatRoom'
import { useNavigation } from '@react-navigation/native';


const separator = () => {
  return <View style={{height:1,width:'100%',backgroundColor:'#8a8a8a'}}/>
}

const ChatList = ({otherusers,currentUser}) => {
    const navigation = useNavigation();

  return (
   <View>

    {otherusers.map((item) =>(
      <View style={{padding:10}}key={Math.random()}>
          <ChatRoom
                    
                    User={currentUser}
                    onPress={() => navigation.navigate('Chat',{item})}
                    next_item={item}
                   />
      </View>
                  
    ))}
   </View>
  )
}
export default ChatList

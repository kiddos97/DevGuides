import React from 'react'
import {View, Text,FlatList, StyleSheet,SafeAreaView} from 'react-native'
import ChatRoom from '../app/components/ChatRoom'
import { useNavigation } from '@react-navigation/native';


const separator = () => {
  return <View style={{height:1,width:'100%',backgroundColor:'#8a8a8a'}}/>
}

const ChatList = ({otherusers,currentUser}) => {
    const navigation = useNavigation();

  return (
   <View>
    <FlatList
     data={otherusers}
     contentContainerStyle={{paddingVertical:20}}
     ItemSeparatorComponent={separator}
     renderItem={({item}) =>
     <ChatRoom
     User={currentUser}
     onPress={() => navigation.navigate('Chat',{item})}
     next_item={item}
    />}
    keyExtractor={item => Math.random()}
     />
   </View>
  )
}
export default ChatList

import React from 'react'
import {View, Text,FlatList, StyleSheet,SafeAreaView} from 'react-native'
import ChatRoom from '../app/components/ChatRoom'
import { useNavigation } from '@react-navigation/native';


const ChatList = ({otherusers,currentUser}) => {
    const navigation = useNavigation();

  return (
   <SafeAreaView>
    <FlatList
     data={otherusers}
     contentContainerStyle={{paddingVertical:40}}
     renderItem={({item,index}) =>
     <ChatRoom
     User={currentUser}
     onPress={() => navigation.navigate('Chat',{item})}
     next_item={item}
    />}
    keyExtractor={item => Math.random()}
     />
   </SafeAreaView>
  )
}
const styles = StyleSheet.create({
      text: {
        fontSize: 18, // Increasing font size for better readability
        color: '#000', // Ensuring text color is visible
      },
})
export default ChatList

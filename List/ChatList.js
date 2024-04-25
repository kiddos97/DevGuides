import React from 'react'
import {View, Text,FlatList, StyleSheet} from 'react-native'
import ChatRoom from '../app/components/ChatRoom'
import { useNavigation } from '@react-navigation/native';


const ChatList = ({users}) => {
    const navigation = useNavigation();
  return (
   <View style={styles.screen}>
     <FlatList
     data={users}
     keyExtractor={(item) => item.id}
     renderItem={({item}) =>
     <ChatRoom
     onPress={() => navigation.navigate('Chat',{username:item?.username})}
     item={item}
    />}
     />
   </View>
  )
}
const styles = StyleSheet.create({
    screen:{
        felx:1
    }
})
export default ChatList

import React, {useState} from 'react'
import {View, Text, StyleSheet, Platform, StatusBar, TouchableOpacity, FlatList,SafeAreaView} from 'react-native'
import color from '../../config/color';
import { message } from '../../Message/Message';


import ListItem from '../../List/ListItem';

import ListItemDelete from '../../List/ListItemDelete'

const MessageScreen = () => {


const [messages, setMessages] = useState(message);
const [refreshing,setRefreshing] = useState(false);

const handleDelete = (selectedMessage) => {

  const newMessages = messages.filter((m) => m.id !== selectedMessage.id);
  
  setMessages(newMessages);
};
  return (
    <SafeAreaView style={styles.screen}>
    <FlatList
      data={messages}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <ListItem
          title={item.title}
          subTitle={item.description}
          image={item.image}
          onPress={() => console.log('message selected', item)}
          renderRightActions={() => 
          <ListItemDelete onPress={ () => handleDelete(item)}/>}
          renderLeftActions={() => (
            <TouchableOpacity onPress={() => console.log('archived pressed')}>   
              <View
            style={{
              width:70,
              backgroundColor:'blue',
              height:'100%',
              justifyContent:'center',
              alignItems:'center'
            }}
            ><Text style={styles.text}>Archive</Text></View></TouchableOpacity>
       
          )}
        />
        
      )} // Make sure ListitemSeparator is defined or import correctly
      refreshing={refreshing} //pull to refresh
      onRefresh={() => {setMessages([  {
        id: 2, title: 'Emmanuel Imarhiagbe', description: 'Hey how is it going',image:require('../assets/person.jpg')
    },
    {
      id: 1, title: 'Isa Kuhn', description: 'Are you home, please tell me you are home',image:require('../assets/profile.jpg')
  },
  
  
  ])}}
    />
  </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    screen:{
      paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
      flex:1
       
    },
    text:{
      color:'#fff',
      fontWeight:'bold',
      fontSize:15
      }
})
export default MessageScreen

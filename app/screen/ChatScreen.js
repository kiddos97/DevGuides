import React from 'react'
import {View, Text, StyleSheet,}  from 'react-native'

const ChatScreen = ({route}) => {
  return (
   <View>
    <Text>{route.params.userName}</Text>
   </View>
  )
}

export default ChatScreen

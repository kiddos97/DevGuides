import React from 'react'
import {View,Text, StyleSheet } from 'react-native'

const NotificationScreen = () => {
  return (
   <View style={styles.container}>
    <Text>Notification</Text>
   </View>
  )
}
const styles = StyleSheet.create({
    container:{
        padding:10,
        marginVertical:70
    }
})
export default NotificationScreen

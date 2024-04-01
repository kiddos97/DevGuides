import React from 'react'
import {View, Text, StyleSheet} from 'react-native'
import color from '../../config/color';
const MessageScreen = () => {
  return (
    <View style={styles.container}>
    <Text>Hi</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        padding:10,
        marginVertical:70,
       
    }
})
export default MessageScreen

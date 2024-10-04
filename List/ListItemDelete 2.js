import React from 'react'

import { StyleSheet,TouchableOpacity,View,Text } from 'react-native' 


const ListItemDelete = ( { onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
        <View
        style={styles.container}
          >
            <Text style={styles.text}>Delete</Text>
          </View>
    </TouchableOpacity>
  )
}
const styles = StyleSheet.create({
    container:{
        backgroundColor: 'red',
          width: 70,
          height: '100%',
          justifyContent:'center',
          alignItems:'center'
    },
    text:{
        color:'#fff',
        fontWeight:'bold',
        fontSize:15
        }
})
export default ListItemDelete

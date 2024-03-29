import React from 'react'
import { SafeAreaView, Text, View, StyleSheet, TextInput} from 'react-native'

const AppTextInput = () => {
  return (
    
   <SafeAreaView>
    <View style={style.usernameContainer}>
      <TextInput
      placeholder='User Name'/>
      </View>
      <View style={style.passwordContainer}>
        <TextInput placeholder='password'/>
      </View>
   </SafeAreaView>
  )
}


const style = StyleSheet.create({

  usernameContainer: {
    borderWidth: 2,
    borderColor: 'black',
    padding: 20,
    borderRadius: 35,
    margin: 10
  },
  passwordContainer: {
    borderWidth: 2,
    borderColor: 'black',
    padding: 20,
    borderRadius: 35,
    margin: 10
  }

});



export default AppTextInput

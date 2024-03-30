import React from 'react'
import { SafeAreaView, Text, View, StyleSheet, TextInput} from 'react-native'
import color from '../../config/color'

const AppTextInput = () => {
  return (
    
   <>
    <View style={styles.usernameContainer}>
      <TextInput
      placeholder='User Name'
      placeholderTextColor={color.AppBackgroundColor}
      />
      </View>
      <View style={styles.passwordContainer}>
        <TextInput
        placeholder='password'
        placeholderTextColor={color.AppBackgroundColor}/>
      </View>
      </>
   
  )
}


const styles = StyleSheet.create({

  usernameContainer: {
    borderWidth: 2,
    borderColor: color.borderColor,
    padding:20,
    borderRadius: 35,
    margin: 10,
    backgroundColor:color.TextbackgroundColor
  },
  passwordContainer: {
    borderWidth: 2,
    padding: 20,
    borderColor:color.borderColor,
    borderRadius: 35,
    margin: 10,
    backgroundColor:color.TextbackgroundColor
  }

});



export default AppTextInput

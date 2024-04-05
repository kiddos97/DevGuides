import React from 'react'
import { SafeAreaView, Text, View, StyleSheet, TextInput} from 'react-native'
import color from '../../config/color'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

const AppTextInput = ({placeholder,backgroundColor,borderColor,secureTextEntry,icon, onChangeText, onBlur}) => {
  return (
    
  
    <View style={[styles.usernameContainer,{backgroundColor,borderColor}]}>
      
      <TextInput
      secureTextEntry={secureTextEntry}
      placeholder={placeholder}
      placeholderTextColor={color.AppBackgroundColor}
      onChangeText={onChangeText}
      onBlur={onBlur}
      />
      <View style={styles.inputContainer}>
       {icon && <MaterialCommunityIcons name={icon} size={25} style={styles.icon} color={color.medium}/>}
       </View>
      </View>
      
   
  )
}


const styles = StyleSheet.create({

  usernameContainer: {
    borderRadius: 25,
    flexDirection:'row',
    padding: 15,
    marginVertical: 10,
    justifyContent:'space-between',
  },
  icon:{
    margin:10
},

});


export default AppTextInput

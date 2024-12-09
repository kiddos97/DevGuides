import React from 'react'
import { SafeAreaView, Text, View, StyleSheet, TextInput} from 'react-native'
import color from '../../config/color'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { TouchableOpacity } from 'react-native-gesture-handler'

const AppTextInput = ({onPress,placeholder,backgroundColor,borderColor,secureTextEntry,icon, onChangeText, onBlur,textAlign,maxLength,iconcolor,values,onFocus}) => {
  return (
    
  
    <View style={[styles.usernameContainer,{backgroundColor:backgroundColor,borderColor:borderColor}]}>
      <TextInput
      value={values}
      secureTextEntry={secureTextEntry}
      textAlign={textAlign}
      maxLength={maxLength}
      style={styles.inputColor}
      placeholder={placeholder}
      placeholderTextColor='#8a8a8a'
      onChangeText={onChangeText}
      onBlur={onBlur}
      onFocus={onFocus}
      />  
      <View style={styles.inputContainer}>
        <TouchableOpacity onPress={onPress}>
        {icon && <MaterialCommunityIcons name={icon} size={25} style={styles.icon} color={iconcolor}/>}
        </TouchableOpacity>
       </View>
      </View>
      
   
  )
}


const styles = StyleSheet.create({

  usernameContainer: {
    borderRadius: 10,
    flexDirection:'row',
    padding: 5,
    marginVertical: 10,
    justifyContent:'space-between',
    borderWidth:2,
    
  },
  inputColor:{
        color:'#ffffff'
  },
  icon:{
    margin:10
},

});


export default AppTextInput

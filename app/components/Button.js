import React from 'react'
import {View, Text, StyleSheet, TouchableOpacity, TouchableHighlight} from 'react-native'
import color from '../../config/color';
import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';

const Button = ({ onPress,title, backgroundColor, color, disabled, borderColor,fontSize}) => {

    

  
  return (
   
    <View >
        <TouchableHighlight
        activeOpacity={4}
        disabled={disabled}
        style={[styles.buttonContainer, {backgroundColor:backgroundColor, borderColor:borderColor,}]}
        onPress={onPress}
        >
            <Text style={[styles.text,{color:color,fontSize:fontSize}]}>{title}</Text>
        </TouchableHighlight>
    </View>
  )
  
}

const styles = StyleSheet.create({

    buttonContainer:{
        borderWidth:2,
        borderRadius: 25,
        padding:10,
    },
    text:{
        textAlign:'center',
        fontWeight:'bold'
    },

});
export default Button

import React from 'react'
import {View, Text, StyleSheet, TouchableOpacity, TouchableHighlight} from 'react-native'
import color from '../../config/color';
import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';

const Button = ({ onPress,title, backgroundColor, color}) => {

    

  
  return (
   
    <View >
        <TouchableHighlight
        activeOpacity={4}
        style={[styles.buttonContainer, {backgroundColor}]}
        onPress={onPress}
        >
            <Text style={[styles.text,{color}]}>{title}</Text>
        </TouchableHighlight>
    </View>
  )
  
}

const styles = StyleSheet.create({

    buttonContainer:{
        borderWidth:2,
        borderRadius: 30,
        padding:10,
        borderColor: color.white
    },
    text:{
        textAlign:'center',
        fontSize: 20,
        fontWeight:'bold'
    },

});
export default Button

import React from 'react'
import {View, Text, StyleSheet, TouchableOpacity, TouchableHighlight} from 'react-native'
import color from '../../config/color';
import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';

const Button = ({ LoginPress, RegisterPress}) => {

    

  
  return (
   <View>
    <View>
        <TouchableHighlight
        activeOpacity={4}
        underlayColor={color.buttonColor1}
        style={styles.buttonContainer}
        onPress={LoginPress}
        >
            <Text style={styles.text}>Login</Text>
        </TouchableHighlight>
    </View>
    <View>
        <TouchableHighlight 
        activeOpacity={4}
        underlayColor={color.buttonColor1}
        style={styles.buttonContainer1}
        onPress={RegisterPress}>
        <View>
            <Text style={styles.text}>Register</Text>
        </View>
        </TouchableHighlight>
    </View>
    <View style={styles.textContainer}>
        <TouchableOpacity onPress={() => console.log('forgot username pressed')}>
        <Text style={styles.text1}>Forgot username</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => console.log('forgot password pressed')}>
        <Text style={styles.text1}>Forgot password</Text>
        </TouchableOpacity>
    </View>
   </View>
  )
}

const styles = StyleSheet.create({

    buttonContainer:{
        borderWidth:2,
        borderRadius: 35,
        padding:20,
        borderColor: color.white
    },
    buttonContainer1:{
        borderWidth:2,
        borderRadius: 35,
        borderColor:color.white,
        padding:20,
        marginTop:15,
    },
    textContainer:{
        marginTop:15,
        flexDirection:'row',
        justifyContent:'space-evenly'
    },
    text:{
        color:color.white,
        textAlign:'center',
        fontSize: 20,
        fontWeight:'bold'
    },
    text1:{
        color:color.white,
        textAlign:'center',
        fontSize: 10,
        fontWeight:'bold'
    }
});
export default Button

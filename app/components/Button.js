import React from 'react'
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native'
import color from '../../config/color';
import { LinearGradient } from 'expo-linear-gradient';

const Button = () => {
  return (
   <View>
    <View>
        <TouchableOpacity onPress={() => console.log('Login button pressed')}>
        <LinearGradient
        // Button Linear Gradient
        colors={[color.buttonColor2, color.buttonColor3]}
        start= {{x: 0.1, y: 0.2}}
        style={styles.buttonContainer}>
        <Text style={styles.text}>Login</Text>
      </LinearGradient>
        </TouchableOpacity>
    </View>
    <View>
        <TouchableOpacity onPress={() => console.log('Register button pressed')}>
        <LinearGradient
        // Button Linear Gradient
        colors={[color.buttonColor2, color.buttonColor3]}
        start= {{x: 0.1, y: 0.2}}
        style={styles.buttonContainer1}>
        <Text style={styles.text}>Register</Text>
      </LinearGradient>
        </TouchableOpacity>
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
        backgroundColor:color.buttonColor1
    },
    buttonContainer1:{
        borderWidth:2,
        borderRadius: 35,
        padding:20,
        marginTop:15,
        shadowOpacity:0.3,
        shadowRadius: 3,
        shadowOffset:{width:-2, height: 4}
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

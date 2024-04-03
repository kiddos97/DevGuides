import React from 'react'
import {SafeAreaView, View, Text,StyleSheet,Platform,StatusBar, TouchableOpacity} from 'react-native';
import { Formik, Field, Form } from 'formik';
import AppTextInput from '../components/AppTextInput';
import color from '../../config/color';
import Button from '../components/Button';


const handleRegister = () => {
    console.log('Register!!!!')
}

const RegisterScreen = () => {
  return (
   <SafeAreaView style={styles.screen}>
    <View style={styles.container}>
    <View style={styles.headingcontainer}>
    <Text style={styles.heading}>Register</Text>
    <Text style={styles.bottomText}>Create a new account</Text>
    </View>
    <Formik
    initialValues={{email:'', password:''}}>
        <>
        <View>
        <AppTextInput 
        icon='account'
        placeholder='User Name' 
        backgroundColor={color.light}/>
        <AppTextInput
        icon='email' 
        placeholder='Email' 
        backgroundColor={color.light}/>
        <AppTextInput 
        icon='lock'
        secureTextEntry
        placeholder='Password' 
        backgroundColor={color.light}
        /> 
        <AppTextInput
        icon='lock'
        secureTextEntry
        placeholder='Confirm Password' 
        backgroundColor={color.light}/>
            </View>
            <View style={styles.buttoncontainer}>
            <Button title='Register' onPress={handleRegister} backgroundColor={color.AppBackgroundColor} color={color.white} />
            </View>
            <View style={styles.textContainer}>
        <TouchableOpacity onPress={() => console.log('forgot username pressed')}>
        <Text style={styles.text}>Forgot username</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => console.log('forgot password pressed')}>
        <Text style={styles.text}>Forgot password</Text>
        </TouchableOpacity>
    </View>
            </>
    </Formik>
    </View>
   </SafeAreaView>
  )
}


const styles = StyleSheet.create({

    buttoncontainer:{
        padding:20
    },
    container:{
        padding:20
    },
    screen:{
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
        backgroundColor:color.TextbackgroundColor,
        flex:1

    },
    heading:{
        fontSize:25,
        textAlign:'center',
        color:color.AppBackgroundColor,
        fontWeight:'bold'

    },
    bottomText:{
        textAlign:'center',
        marginTop:20,
        fontSize:15,
        color:color.AppBackgroundColor
    },
    headingcontainer:{
        marginVertical:40,
    },
    textContainer:{
        marginTop:15,
        flexDirection:'row',
        justifyContent:'space-evenly'
    },
    text:{
        color:color.AppBackgroundColor,
        textAlign:'center',
        fontSize: 12,
        fontWeight:'bold'
    },
    text1:{
        color:color.AppBackgroundColor,
        fontSize: 12,
        fontWeight:'bold',
        marginLeft:10
    },
})
export default RegisterScreen

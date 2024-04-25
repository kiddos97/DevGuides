import React, {useState} from 'react'
import {SafeAreaView, View, Text,StyleSheet,Platform,StatusBar, TouchableOpacity,Alert} from 'react-native';
import { Formik, Field, Form } from 'formik';
import AppTextInput from '../components/AppTextInput';
import color from '../../config/color';
import Button from '../components/Button';
import * as Yup from 'yup';
import { FIREBASE_APP } from '../../FireBase/FireBaseConfig';
import { getAuth, createUserWithEmailAndPassword} from 'firebase/auth';
import { collection, doc, setDoc,getDocs,query } from "firebase/firestore"; 
import {  db } from '../../FireBase/FireBaseConfig';



const RegisterScreen = ({navigation}) => {
    const handleRegister = async (values, {resetForm} )=> {
        const auth = getAuth(FIREBASE_APP);

        try{
            const response = await createUserWithEmailAndPassword(auth, values.email, values.password)
            if(response){
                resetForm({values:initialValues})
                navigation.navigate('Login')
                Alert.alert('Success','You have registered!')
            }
            await setDoc(doc(db,'users', response?.user?.uid),{
                username:values.username,
                userId: response?.user?.uid
            });

            return {success:true, data:response?.user}
        }catch(error){
            console.error(error)
        }
    }    

    const validationSchema = Yup.object().shape({
        // name: Yup.string()
        // .min(3, 'Too Short')
        // .max(50, 'Too long')
        // .required('Please enter your full name'),
        username: Yup.string()
        .min(8)
        .max(10)
        .required('Username is required'),
        email: Yup.string()
        .email('Invalid email')
        .required('Please enter your email'),
        password: Yup.string()
        .min(8, 'Password must contain at least 8 characters')
        .max(50)
        .required('Please enter your password')
        .matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/),
        confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('Please enter password again'),
      });

    const initialValues = {
        username:'',
        email:'', 
        password:'', 
        confirmPassword:''}

    return (
        <SafeAreaView style={styles.screen}>
            <View style={styles.container}>
                <View style={styles.headingcontainer}>
                    <Text style={styles.heading}>Register</Text>
                    <Text style={styles.bottomText}>Create a new account</Text>
                </View>
                <Formik
                   initialValues={initialValues}
                    onSubmit={handleRegister}
                    validationSchema={validationSchema}
                >
                    {({handleChange, handleSubmit, values, setFieldTouched,touched, errors, isValid}) => (
                        <>
                            <View>
                            <AppTextInput
                                    icon='account'
                                    placeholder='Username'
                                    backgroundColor={color.light}
                                    value={values.username}
                                    onChangeText={handleChange('username')}
                                    onBlur={() => setFieldTouched('username')}
                                />
                                {touched.username && errors.username &&( <Text style={styles.errormessage}>{errors.username}</Text>)}
                                <AppTextInput
                                    icon='email'
                                    keyboardType='email-address'
                                    placeholder='Email'
                                    backgroundColor={color.light}
                                    value={values.email}
                                    onChangeText={handleChange('email')}
                                    onBlur={() => setFieldTouched('email')}
                                />
                                {touched.email && errors.email && (<Text style={styles.errormessage}>{errors.email}</Text>)}
                                <AppTextInput
                                    icon='lock'
                                    secureTextEntry
                                    placeholder='Password'
                                    backgroundColor={color.light}
                                    value={values.password}
                                    onChangeText={handleChange('password')}
                                    onBlur={() => setFieldTouched('password')}
                                />
                                {touched.password && errors.password  && (<Text style={styles.errormessage}>{errors.password}</Text>)}
                                <AppTextInput
                                    icon='lock'
                                    secureTextEntry
                                    placeholder='Confirm Password'
                                    backgroundColor={color.light}
                                    value={values.confirmPassword}
                                    onChangeText={handleChange('confirmPassword')}
                                    onBlur={() => setFieldTouched('confirmPassword')}
                                />
                                {touched.confirmPassword && errors.confirmPassword &&( <Text style={styles.errormessage}>{errors.confirmPassword}</Text>)}
                            </View>
                            <View style={styles.buttoncontainer}>
                                <Button title='Register' 
                                disabled={!isValid}
                                onPress={handleSubmit} 
                                backgroundColor={isValid ? "#395B64" : '#A5C9CA'} 
                                color={color.white} />
                            </View>
                            <View style={styles.textContainer}>
                                    <Text style={styles.text}>Have an account?</Text>
                                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                                    <Text style={styles.text1}>Login</Text>
                                </TouchableOpacity>
                            </View>
                        </>
                    )}
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
    errormessage:{
        color: color.danger,
        textAlign:'center'
    },
    screen:{
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
        backgroundColor:color.secondary,
        flex:1

    },
    heading:{
        fontSize:25,
        textAlign:'center',
        color:color.textcolor,
        fontWeight:'bold'

    },
    bottomText:{
        textAlign:'center',
        marginTop:20,
        fontSize:15,
        color:color.textcolor
    },
    headingcontainer:{
        marginVertical:10,
    },
    textContainer:{
        marginTop:10,
        flexDirection:'row',
        alignSelf:'center'
    },
    text:{
        color:color.textcolor,
        textAlign:'center',
        fontSize: 12,
        fontWeight:'bold'
    },
    text1:{
        color:color.textcolor,
        fontSize: 12,
        fontWeight:'bold',
        marginLeft:10
    },
})
export default RegisterScreen

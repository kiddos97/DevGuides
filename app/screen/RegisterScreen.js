import React, {useState} from 'react'
import {SafeAreaView, View, Text,StyleSheet,Platform,StatusBar, TouchableOpacity,Alert, ActivityIndicator, Image} from 'react-native';
import { Formik, Field, Form } from 'formik';
import AppTextInput from '../components/AppTextInput';
import color from '../../config/color';
import Button from '../components/Button';
import * as Yup from 'yup';
import { useAuth,  } from '../authContext';
import CustomKeyboardView from '../components/CustomKeyboardView';
import { LinearGradient } from 'expo-linear-gradient';





const RegisterScreen = ({navigation}) => {

    const [loading, setLoading] = useState(false);

    const { register } = useAuth();
    const handleRegister = async (values, {resetForm} )=> {
        setLoading(true);
        try{
            let response = await register(values.username, values.email, values.password)
            if(response){
                setLoading(false)
                resetForm({values:initialValues})
                navigation.navigate('Homepage')
                Alert.alert('Success','You have registered!')
            }
        }catch(error){
            setLoading(false)
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

            <View style={styles.container}>
                <Image
                style={styles.backImage}
                source={require('../assets/backimage.jpg')}/>
                <View style={styles.whitesheet}>
                <View style={styles.headingcontainer}>
                    <Text style={styles.heading}>Register</Text>
                    <Text style={styles.bottomText} >Create a new account</Text>
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
                                {
                                    loading ? (
                                        <ActivityIndicator size='large' color={color.white} />) 
                                    :(  <Button title='Register' 
                                    disabled={!isValid}
                                    onPress={handleSubmit} 
                                    backgroundColor={isValid ? color.button2 : color.button}
                                    borderColor={color.button} 
                                    color={isValid ? color.grey : color.white} />)
                                }
                              
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
               
            </View>
      
      
      
     
 
    
      
    )
}



const styles = StyleSheet.create({
    backImage:{
        width: '100%',
        height: 340,
        position:'absolute',
        top:0,
        resizedMode: 'cover',
        backgroundColor:color.danger
      },  
    whitesheet:{
        width:'100%',
        height:'75%',
        position:'absolute',
        bottom:0,
        backgroundColor:color.grey,
        borderTopLeftRadius: 60,
        padding:30
        
  } , 

    buttoncontainer:{
        padding:20
    },
    container:{
      flex:1
    },
    errormessage:{
        color: color.danger,
        textAlign:'center'
    },
    screen:{
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
        flex:1

    },
    heading:{
        fontSize:25,
        textAlign:'center',
        fontWeight:'bold',
        color:color.textcolor

    },
    headingcontainer:{
       padding:10
    },
    bottomText:{
        textAlign:'center',
        marginTop:10,
        fontSize:15,
        fontWeight:'bold',
        color:color.textcolor
    },
    textContainer:{
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

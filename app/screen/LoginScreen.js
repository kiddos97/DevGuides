import { SafeAreaView, View, StyleSheet,Text, Image, ActivityIndicator,Alert} from 'react-native'
import AppTextInput from '../components/AppTextInput'
import color from '../../config/color'
import Button from '../components/Button'
import { useState, useEffect } from 'react'
import * as Yup from 'yup';
import { Formik} from 'formik';
// import axios from 'axios'
//import {AsyncStorage} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FIREBASE_APP } from '../../FireBase/FireBaseConfig';
import { useAuth } from '../authContext'
import CustomKeyboardView from '../components/CustomKeyboardView'
import { LinearGradient } from 'expo-linear-gradient';





const LoginScreen = ({navigation}) => {
    const [isLoading, setLoading] = useState(false)
    const { login } = useAuth()

    // useEffect(() => {
    //     onAuthStateChanged(auth, (user) => {
    //         if(user){
    //             console.log(`${user.email} is signed in`)
    //         }
    //     })
    // },[])
    
    const LoginPress = async (values,{resetForm}) => {
        setLoading(true); // Set loading to true when login button is pressed
        try{
            const response = await login(values.email, values.password)
            if(response){
                setTimeout(() => {
                    setLoading(false);
                    resetForm({values:initialValues}) // Set loading to false after some time (simulating successful login)
                    navigation.navigate('Homepage');
                    Alert.alert('Success!!', 'you have logged in!');
                }, 2000); 
            }
        
        }catch(error){
            setLoading(false);
            if(error){
                console.error(`Unauthorized username and password ${error}`)
                Alert.alert('Login failed','Invalid username or password')
            }else{
                console.error(`Login failed: ${error}`)
                Alert.alert('Login failed','Error occurred!')
            }
           
        }
    }
    const RegisterPress = () => {
        navigation.navigate('Register')
    }
    const validationSchema = Yup.object().shape({
        email: Yup.string()
        .email('Invalid email')
        .required('Please enter your email'),
        password: Yup.string()
        .min(8, 'Password must contain at least 8 characters')
        .max(50)
        .required('Password is required')
        .matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/),
      });

      const initialValues = {
            email:'',
            password:''
        }
      


  return (
   
    <LinearGradient 
    colors={['#021253','#1ED7FE']}
    style={styles.container}>
           <View>
           <Image
           source={require('../assets/applogo.png')}
           style={styles.logo}/>
           <SafeAreaView>
           <Formik
           initialValues={initialValues}
           onSubmit={LoginPress}
           validationSchema={validationSchema}
           >
           {({handleSubmit,handleChange,values, errors,touched, setFieldTouched,isValid}) => (
                   <>
                   <View style={styles.UserContainer}>
                   <AppTextInput
                   keyboardTYpe='email-address'
                   icon='account' 
                   placeholder='email' 
                   backgroundColor={color.light}
                   onChangeText={handleChange('email')}
                   values={values.username}
                   onBlur={() => setFieldTouched('email')}
                   iconcolor={color.button}/>
                   {
                       touched.username && errors.username && (
                           <Text style={styles.errormessage}>{errors.username}</Text>
                       )
                   }
                   <AppTextInput
                   icon='lock'
                   secureTextEntry
                   placeholder='Password'
                   backgroundColor={color.light}
                   onChangeText={handleChange('password')}
                   values={values.password}
                   onBlur={() => setFieldTouched('password')}
                   iconcolor={color.button}/>
                   { touched.password && errors.password && (
                       <Text style={styles.errormessage}>{errors.password}</Text>
                   )}
                   </View>
                   <View style={styles.LoginContainer}>
                       {isLoading ? ( 
                       <ActivityIndicator size='large' color={color.white} />) : (
                       <Button onPress={handleSubmit} title='Login' backgroundColor={isValid ? color.button: color.button2} color={isValid ? color.grey:color.white} borderColor={color.button}/>
                       )
                       }
                       <View style={styles.textContainer}>
                           <Text style={styles.text}>
                               Don't have an account?
                           </Text>
                           <Text onPress={RegisterPress} style={styles.text1}>Sign Up</Text>
                       </View>
                       </View> 
                   </>
           )}
           </Formik>

           </SafeAreaView>
           
        
   </View>
   </LinearGradient>
  
 
  
  )
}


const styles = StyleSheet.create({
  
    errormessage:{
        color: color.danger,
        textAlign:'center'
    },
    container:{
        flex:1,
        padding:10
    },
    LoginContainer:{
        padding:30,
        marginTop:70,
    },
    logo:{
        width:170,
        height:170,
        alignSelf:'center',
        marginVertical:80,
        marginBottom: 10,
        borderRadius:100
    },
    UserContainer:{
        marginTop:50,
        padding:20
    },
    textContainer:{
        marginTop:15,
        flexDirection:'row',
        alignSelf:'center'
    },
    text:{
        color:color.textcolor,
        textAlign:'center',
        fontSize: 15,
        fontWeight:'bold'
    },
    text1:{
        color:color.textcolor,
        fontSize: 15,
        fontWeight:'bold',
        marginLeft:10
    },
    registercontainer:{
        marginTop:15
    },
})

export default LoginScreen

import { SafeAreaView, View, StyleSheet,Text, Image, ActivityIndicator, TouchableOpacity } from 'react-native'
import AppTextInput from '../components/AppTextInput'
import color from '../../config/color'
import Button from '../components/Button'
import { useState } from 'react'
import * as Yup from 'yup';
import { Formik} from 'formik';
import axios from 'axios'



const LoginScreen = ({navigation}) => {
    const [isLoading, setLoading] = useState(false)

 
    const LoginPress = async () => {
        setLoading(true); // Set loading to true when login button is pressed

        try{
            const res = await axios.post('http://192.168.86.41:3000/login')
            if(res.status === 200){
                   // Simulate login process with setTimeout
                   setTimeout(() => {
                    setLoading(false); // Set loading to false after some time (simulating successful login)
                    navigation.navigate('Home');
                }, 2000); // Adjust the time as needed
            }
        }catch(error){
            console.error(`Login failed: ${error}`)
        }

    }
    const RegisterPress = () => {
        navigation.navigate('Register')
    }

    
    const validationSchema = Yup.object().shape({
        username: Yup.string()
        .min(8)
        .max(10)
        .required('Username is required'),
        password: Yup.string()
        .min(8, 'Password must contain at least 8 characters')
        .max(50)
        .required('Password is required')
        .matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/),
      });


  return (
   
    <SafeAreaView style={styles.container}>
        <View>
            <Image
            style={styles.logo}
            source={require('../assets/applogo.png')}
            />
            </View>
            <Formik
            initialValues={{
                username:'',
                password:''
            }}
            onSubmit={LoginPress}
            validationSchema={validationSchema}
            >
            {({handleSubmit,handleChange,values, errors,touched, setFieldTouched}) => (
                    <>
                    <View style={styles.UserContainer}>
                    <AppTextInput
                    icon='account' 
                    placeholder='User Name' 
                    backgroundColor={color.light}
                    onChangeText={handleChange('usernmae')}
                    values={values.username}
                    onBlur={() => setFieldTouched('username')}/>
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
                    onBlur={() => setFieldTouched('password')}/>
                    { touched.password && errors.password && (
                        <Text style={styles.errormessage}>{errors.password}</Text>
                    )}
                    </View>
                    <View style={styles.LoginContainer}>
                        {isLoading ? ( 
                        <ActivityIndicator size='large' color={color.white} />) : (
                        <Button onPress={handleSubmit} title='Login' backgroundColor={color.light} color={color.AppBackgroundColor}/>
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
  
  )
}


const styles = StyleSheet.create({
    errormessage:{
        color: color.danger,
        textAlign:'center'
    },
    container:{
        flex:1,
        backgroundColor:color.AppBackgroundColor
    },
    LoginContainer:{
        padding:20,
        marginTop:70,
    },
    logo:{
        width:100,
        height:150,
        alignSelf:'center',
        marginTop:50,
        marginBottom: 20
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
        color:color.white,
        textAlign:'center',
        fontSize: 15,
        fontWeight:'bold'
    },
    text1:{
        color:color.white,
        fontSize: 15,
        fontWeight:'bold',
        marginLeft:10
    },
    registercontainer:{
        marginTop:15
    },
})

export default LoginScreen

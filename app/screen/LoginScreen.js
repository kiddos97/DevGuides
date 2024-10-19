import { SafeAreaView, View, StyleSheet,Text, Image, ActivityIndicator,Alert} from 'react-native'
import AppTextInput from '../components/AppTextInput'
import color from '../../config/color'
import Button from '../components/Button'
import { useState, useEffect } from 'react'
import * as Yup from 'yup';
import { Formik} from 'formik';
import { useAuth } from '../authContext'
import CustomKeyboardView from '../components/CustomKeyboardView'
import { StatusBar } from 'expo-status-bar';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'



const LoginScreen = ({navigation}) => {
    const [isLoading, setLoading] = useState(false)
    const { login } = useAuth()

    
    
    const LoginPress = async (values,{resetForm}) => {
        setLoading(true); // Set loading to true when login button is pressed
        try{
            const response = await login(values.email, values.password)
            if(response){
                setTimeout(() => {
                    setLoading(false);
                    resetForm({values: ''}) // Set loading to false after some time (simulating successful login)
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
   
  
           <View style={styles.container}>
           <Image
           source={require('../assets/DevGuide.png')}
           style={styles.logo}/>
           <View style={styles.welcome}>
            <View style={styles.welcomeHcontainer}>
            <Text style={styles.welcomeText}>Welcome to </Text>
            <Text style={styles.welcomeStext}>DevGuide</Text>
            </View>
            <View style={styles.welcomeLcontainer}>
            <Text style={styles.welcomeLtext}>The Most Popular Social Media App</Text>
            </View>
           </View>
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
                   placeholder='E-mail' 
                   backgroundColor="#252525"
                   borderColor="#8a8a8a"
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
                   backgroundColor="#252525"
                   borderColor="#8a8a8a"
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
                       <Button fontSize={20} onPress={handleSubmit} title='Login'color={isValid ? color.white:color.grey}/>
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
           
           <StatusBar style="light" />

   </View>
  
 
  
  )
}


const styles = StyleSheet.create({

    welcome:{
        padding:5,
       
    },
    welcomeText:{
        fontSize:30,
        marginLeft:20,
        color:'#ffffff',
        fontFamily:'Helvetica-light'
    },
    welcomeStext:{
        fontSize:30,
        color:'#7ed957',
        fontFamily:'Helvetica-light'
        
    },
    welcomeLtext:{
        fontSize:15,
        color:'#ffffff',
        fontFamily:'Helvetica-light'
    },
    welcomeHcontainer:{
        padding:8,
        flexDirection:'row'
    }
    ,
    welcomeLcontainer:{
        padding:10,
        marginLeft:20
    },
  
    errormessage:{
        color: color.danger,
        textAlign:'center'
    },
    container:{
        flex:1,
        padding:10,
        backgroundColor:"#1f1f1f"
    },
    LoginContainer:{
        padding:30,
        marginTop:50,
    },
    logo:{
        width:120,
        height:120,
        alignSelf:'left',
        marginVertical:90,
        marginBottom: 10,
    },
    UserContainer:{
        marginTop:30,
        padding:20
    },
    textContainer:{
        marginTop:15,
        flexDirection:'row',
        alignSelf:'center'
    },
    text:{
        color:'#8a8a8a',
        textAlign:'center',
        fontSize: 15,
        fontWeight:'bold'
    },
    text1:{
        color:'#8a8a8a',
        fontSize: 15,
        fontWeight:'bold',
        marginLeft:10
    },
    registercontainer:{
        marginTop:15
    },
    footer:{
        flex:1,
        height:100
    },
    footerContainer:{
        justifyContent:'center',
        alignItems:'center',
    }
})

export default LoginScreen

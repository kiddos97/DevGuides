
import { SafeAreaView, View, StyleSheet,Text, Image, ActivityIndicator, TouchableOpacity } from 'react-native'
import AppTextInput from '../components/AppTextInput'
import color from '../../config/color'
import Button from '../components/Button'
import { useState } from 'react'



const LoginScreen = ({navigation}) => {
    const [isLoading, setLoading] = useState(false)

 
      

    const LoginPress = () => {
        setLoading(true); // Set loading to true when login button is pressed
    // Simulate login process with setTimeout
    setTimeout(() => {
      setLoading(false); // Set loading to false after some time (simulating successful login)
      navigation.navigate('Home');
    }, 2000); // Adjust the time as needed
    }
    const RegisterPress = () => {
        navigation.navigate('Register')
    }

    


  return (
   
    <SafeAreaView style={styles.container}>
        <View>
            <Image
            style={styles.logo}
            source={require('../assets/applogo.png')}
            />
            </View>
            <View style={styles.UserContainer}>
                <AppTextInput
                icon='account' 
                placeholder='User Name' 
                backgroundColor={color.light}/>
                <AppTextInput
                icon='lock'
                secureTextEntry
                placeholder='Password' 
                backgroundColor={color.light}/>
                </View>
                <View style={styles.LoginContainer}>
                    {isLoading ? ( 
                    <ActivityIndicator size='large' color={color.white} />) : (
                    <Button onPress={LoginPress} title='Login' backgroundColor={color.light} color={color.AppBackgroundColor}/>
                    )
                    }
                    <View style={styles.textContainer}>
                        <Text style={styles.text}>
                            Don't have an account?
                        </Text>
                        <Text onPress={RegisterPress} style={styles.text1}>Sign Up</Text>
                    </View>
                        
                    </View>    
    </SafeAreaView>
  
  )
}


const styles = StyleSheet.create({
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

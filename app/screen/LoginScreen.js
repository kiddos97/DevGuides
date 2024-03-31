
import { SafeAreaView, View, StyleSheet,Text, Image, ActivityIndicator } from 'react-native'
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
        console.log('register button pressed')
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
                <AppTextInput/>
                </View>
                <View style={styles.LoginContainer}>
                    {isLoading ? ( 
                    <ActivityIndicator size='large' color={color.white} />) : (
                    <Button LoginPress={LoginPress} RegisterPress={RegisterPress}/>
                    )
                    }
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
        marginTop:50,
    },
    logo:{
        width:100,
        height:150,
        alignSelf:'center',
        marginTop:50,
        marginBottom: 20
    },
    UserContainer:{
        marginTop:70,
        padding:10
    }
})

export default LoginScreen

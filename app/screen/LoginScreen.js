
import { SafeAreaView, View, StyleSheet,Text, Image } from 'react-native'
import AppTextInput from '../components/AppTextInput'
import color from '../../config/color'

const LoginScreen = () => {
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
    </SafeAreaView>
  
  )
}


const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:color.AppBackgroundColor
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

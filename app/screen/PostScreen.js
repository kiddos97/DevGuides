import React from 'react'
import {View,Text,StyleSheet,SafeAreaView,TextInput,Platform} from 'react-native'
import {Image} from 'expo-image'
import { blurhash } from '../../utils/index'
import { useAuth } from '../authContext'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import CustomKeyboardView from '../components/CustomKeyboardView';
const PostScreen = () => {

    const { user } = useAuth()


  return (
    
    <CustomKeyboardView
    inChat={true}
    behavior={Platform.OS === "ios" ? "padding" : 'height'}>
          <SafeAreaView  style={styles.screen}>
            <View style={styles.container}>
                <View style={styles.cancelContainer}>
                <Text style={styles.text}>Cancel</Text>
                </View>
                <View style={styles.postContainer}>
                <Text style={styles.text}>Post</Text>
                </View>
            </View>
            <View style={styles.textcontainer}>
                <Image
                source={user?.profileImage}
                placeholder={{blurhash}}
                style={{height:hp(4.3), aspectRatio:1, borderRadius:100}}
                transition={500}
                />
                <TextInput
                style={styles.textarea}
                numberOfLines={10}
                multiline={true}
                placeholder='Enter a post......'
                
                />
            </View>
        </SafeAreaView> 
    </CustomKeyboardView> 
  )
}

const styles = StyleSheet.create({
    screen:{
        flex:1,
        backgroundColor:'#1f1f1f'
    },
    container:{
        padding:10,
        marginTop:20,
        flexDirection:'row',
        justifyContent:'space-between'
    },
    postContainer:{
        padding:5,
        borderRadius:10,
        width:90,
        backgroundColor:'#00bf63'
    },
    cancelContainer:{
        borderWidth:2,
        padding:5,
        borderRadius:10,
        width:90,
        backgroundColor:'#8a8a8a'
    },
    text:{
        textAlign:'center',
        color:'#ffffff',
        fontFamily:'Helvetica-light',
        fontSize:15
    },
    textcontainer:{
        borderWidth:4,
        flexDirection:'row',
        padding:10,
        marginTop:10
    },
    textarea:{
        padding:20,
        borderWidth:4
    }
})

export default PostScreen
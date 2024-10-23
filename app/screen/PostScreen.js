import React,{useEffect,useState} from 'react'
import {View,Text,StyleSheet,SafeAreaView,TextInput,Platform,Alert,ActivityIndicator} from 'react-native'
import {Image} from 'expo-image'
import { blurhash } from '../../utils/index'
import { useAuth } from '../authContext'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import CustomKeyboardView from '../components/CustomKeyboardView';
import { TouchableOpacity } from 'react-native-gesture-handler'
import {  addDoc, collection, doc, onSnapshot, orderBy, setDoc, Timestamp,query, getDoc} from "firebase/firestore"; 
import { IdRef, db, roomRef } from '../../FireBase/FireBaseConfig';
const PostScreen = ({navigation}) => {

    const { user } = useAuth()
    const [text,setText] = useState('')
    const [loading,setLoading] = useState(false)
    const hasUnsavedChanges = Boolean(text);

    const handlePost = async () => {
      setLoading(true)
        try{
          const docRef = doc(db,'post','postID')
          const postmessageRef = collection(docRef,'post-messages')
          const newDoc = await addDoc(postmessageRef,{
            name: user?.username,
            content:text,
            createdAt: Timestamp.fromDate(new Date())
          })
          setText('')
          setTimeout(() =>{
            setLoading(false)
            navigation.navigate('Welcome')
            Alert.alert('Success!!', 'post has sent!!');
          },1000)
        } catch (error) {
          console.error("Error creating room:", error);
        }
      };

      // Handle the "Cancel" button with unsaved changes check
  const handleCancel = () => {
    if (hasUnsavedChanges) {
      Alert.alert(
        'Discard changes?',
        'You have unsaved changes. Are you sure to discard them and leave the screen?',
        [
          { text: "Don't leave", style: 'cancel', onPress: () => {} },
          {
            text: 'Discard',
            style: 'destructive',
            onPress: () => navigation.navigate('Welcome'), // Navigate only if user confirms
          },
        ]
      );
    } else {
      navigation.navigate('Welcome'); // No unsaved changes, navigate immediately
    }
}

  return (
    
    <CustomKeyboardView
    inChat={true}
    behavior={Platform.OS === "ios" ? "padding" : 'height'}>
          <SafeAreaView  style={styles.screen}>
            <View style={styles.container}>
                <TouchableOpacity onPress={handleCancel}>
                    <View style={styles.cancelContainer}>
                    <Text style={styles.text}>Cancel</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={handlePost}>
                    <View style={styles.postContainer}>
                      {loading ? <View>
                        <ActivityIndicator  size='small' color='#fff'/>
                        </View> :<Text style={styles.text}>Post</Text> }
                    </View>
                </TouchableOpacity>
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
                value={text}
                onChangeText={setText}
                numberOfLines={10}
                multiline={true}
                placeholder='Enter a post......'
                placeholderTextColor='#ffffff'
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
    loading:{
      justifyContent:'center',
      alignItems:'center'
    },
    cancelContainer:{
        padding:5,
        borderRadius:10,
        width:90,
        backgroundColor:'#8a8a8a',
    },
    text:{
        textAlign:'center',
        color:'#ffffff',
        fontFamily:'Helvetica-light',
        fontSize:12
    },
    textcontainer:{
        flexDirection:'row',
        padding:10,
        marginTop:10
    },
    textarea:{
        padding:20,
        paddingTop:10,
        color:'#ffffff'
    }
})

export default PostScreen
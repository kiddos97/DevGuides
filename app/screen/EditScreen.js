import {View,Text,StyleSheet, TouchableOpacity} from 'react-native'
import { useState } from 'react';
import ChatRoomHeader from '../components/ChatRoomHeader';
import color from '../../config/color';
import { useNavigation } from '@react-navigation/native';
import AppTextInput from '../components/AppTextInput';
import Button from '../components/Button';
import { useAuth } from '../authContext';
import { db} from '../../FireBase/FireBaseConfig';
import { updateDoc,doc} from 'firebase/firestore';
import { getAuth,updatePassword} from 'firebase/auth'
const EditScreen = () => {

    const navigation = useNavigation();
    const {user} = useAuth()
    const currentuser = getAuth()

    

    const [name,setName] = useState('')
    const [username,setUsername] = useState('')
    const [password,setPassword] = useState('')
    const [jobtitle,setJobTitle] = useState('')
    const [focus,setFocus] = useState('')
    const [isloading,setLoading] = useState(false)

    const handleSubmit = async () =>{
        setLoading(true)
        try{
           const docRef = doc(db,'users',user.userId)
            await updateDoc(docRef,{
                    name:name,
                    username:username,
                    password:password,
                    jobtitle:jobtitle
            })
             updatePassword(currentuser.currentUser,password)
        }catch(e){
            console.log(`Error sending updates:${e}`)
        }
        finally{
            setLoading(false)
        }
    }
  return (
    <View style={styles.screen}>
         <ChatRoomHeader 
        onPress={()=>navigation.navigate('Profile',{user})} 
        backgroundColor={color.button}
        title='Edit Profile'
        icon='keyboard-backspace' 
        onPress2={() => navigation.navigate('Message')}
        />
        <View style={{padding:40}}>
            <Text>Name</Text>
            <AppTextInput
            icon='lock'
            placeholder='Name'
            borderColor={focus === 'name' ? '#00BF63' : '#8a8a8a'}
            backgroundColor="#252525"
            onChangeText={(text) => setName(text)}
            onFocus={() => setFocus('name')}
            values={name}
            />
            <Text>Username</Text>
            <AppTextInput
             icon='lock'
             placeholder='Username'
             borderColor={focus === 'username' ? '#00BF63' : '#8a8a8a'}
             backgroundColor="#252525"
             onChangeText={text => setUsername(text)}
             values={username}
             onFocus={() => setFocus('username')}/>
            <Text>Password</Text>
            <AppTextInput
             icon='lock'
             placeholder='Password'
             borderColor={focus === 'password' ? '#00BF63' : '#8a8a8a'}
             backgroundColor="#252525"
             onChangeText={(text)=>setPassword(text)}
             values={password}
             onFocus={() => setFocus('password')}/>
            <Text>Job Title</Text>
            <AppTextInput
             icon='lock'
             placeholder='Job Title'
             borderColor={focus === 'jobtitle' ? '#00BF63' : '#8a8a8a'}
             backgroundColor="#252525"
             onChangeText={(text)=>setJobTitle (text)}
             values={jobtitle}
             onFocus={() => setFocus('jobtitle')}/>
            <View style={{padding:40}}>
            <TouchableOpacity onPress={handleSubmit}>
            <Button
            title={isloading ? 'Submitting...' : 'Submit'}
            />
            </TouchableOpacity>
            </View>            
        </View>
    </View>
  )
}


const styles = StyleSheet.create({

    screen:{
        flex:1,
        backgroundColor:color.backgroundcolor
    }
})

export default EditScreen

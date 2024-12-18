import {View,Text,TextInput,TouchableOpacity} from 'react-native'
import { useState } from 'react';
import color from '../../config/color';
import ChatRoomHeader from '../components/ChatRoomHeader';
import { useNavigation } from '@react-navigation/native';
import Button from '../components/Button';
import { db} from '../../FireBase/FireBaseConfig';
import { updateDoc,doc} from 'firebase/firestore';
import { useAuth } from '../authContext';

const EditPhoneScreen = () => {
    const navigation = useNavigation()
    const [phone,setPhone] = useState('')
    const [username,setUsername] = useState('')
    const [isloading,setLoading] = useState(false)
    const [focus,setFocus] = useState('')
    const {user} = useAuth()


    const handleSubmit = async () =>{
        setLoading(true)
        try{
           const docRef = doc(db,'users',user.userId)
            await updateDoc(docRef,{
                    phone:phone,
            })
        }catch(e){
            console.log(`Error sending updates:${e}`)
        }
        finally{
            setLoading(false)
        }
    }
  return (
    <View style={{flex:1,backgroundColor:color.backgroundcolor}}>
        <ChatRoomHeader 
        onPress={()=>navigation.goBack()} 
        backgroundColor={color.button} 
        icon='keyboard-backspace'
        />
        <View style={{marginTop:50,padding:5}}>
        <View style={{padding:20}}>
        <TextInput
        style={{borderBottomWidth:0.5,padding:5,borderColor:focus === 'phone' ? '#00BF63' : '#8a8a8a'}}
        placeholder='Phone...'
        onFocus={() => setFocus('phone')}
        onChangeText={(text) => setPhone(text)}
        keyboardType='numeric'
        value={phone}
        />
        </View>
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

export default EditPhoneScreen
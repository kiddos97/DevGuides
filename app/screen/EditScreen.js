import {View,Text,SafeAreaView,StyleSheet} from 'react-native'
import ChatRoomHeader from '../components/ChatRoomHeader';
import color from '../../config/color';
import { useNavigation } from '@react-navigation/native';
import AppTextInput from '../components/AppTextInput';
import Button from '../components/Button';
const EditScreen = () => {

    const navigation = useNavigation();


    const handleSubmit = () =>{
        console.log('submit edit profile')
    }
  return (
    <View style={styles.screen}>
         <ChatRoomHeader 
        onPress={()=>navigation.navigate('Main')} 
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
            borderColor='#8a8a8a'
            backgroundColor="#252525"
            />
            <Text>Username</Text>
            <AppTextInput
             icon='lock'
             placeholder='Username'
             borderColor='#8a8a8a'
             backgroundColor="#252525"/>
            <Text>Password</Text>
            <AppTextInput
             icon='lock'
             placeholder='Password'
             borderColor='#8a8a8a'
             backgroundColor="#252525"/>
            <Text>Job Title</Text>
            <AppTextInput
             icon='lock'
             placeholder='Job Title'
             borderColor='#8a8a8a'
             backgroundColor="#252525"/>
            <View style={{padding:40}}>
            <Button
            title='Submit'
            onPress={handleSubmit}
            />
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

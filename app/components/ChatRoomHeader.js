import React,{useState} from 'react'
import { Platform, Text,StyleSheet,View,TouchableOpacity,Alert, ActivityIndicator} from 'react-native'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import color from '../../config/color';
import { Image } from 'expo-image';
import { blurhash } from '../../utils/index';
import { useAuth } from '../authContext';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import {
    Menu,
    MenuOptions,
    MenuOption,
    MenuTrigger,
  } from 'react-native-popup-menu';
import { MenuItems } from './CustomMenu';
  
const ChatRoomHeader = ({title,onPress,icon,onPress2,backgroundColor}) => {

    

    const ios = Platform.OS == 'ios'
    const { top } = useSafeAreaInsets(); 
    const { user,logout } = useAuth();
    const [isLoading, setLoading] = useState(false)
    const navigation = useNavigation();

    const Divider = () => {
        return (
            <View style={{width:'100%',padding:1,borderBottomWidth:2, borderColor:color.grey}}/>
        )
    }
    const handleLogout = async () => {
      setLoading(true)
      try{
        await logout();
        setTimeout(() => {
          setLoading(false); // Set loading to false after some time (simulating successful login)
          navigation.navigate('Login')
          Alert.alert('Success!','you have logged out!!')
      }, 2000);
     
      }catch(error){
        console.error(` Error failed: ${error}`)
      }
  
    }


   
    return (
    <View style={[styles.container,{paddingTop: ios ? top: top + 10,backgroundColor:backgroundColor}]}>
         <TouchableOpacity onPress={onPress}>
         { icon && <MaterialCommunityIcons name={icon} color={color.white} size={30} />}
        </TouchableOpacity>
        <View>
            <Text style={[styles.text,{fontSize:hp(3)}]}>{title}</Text>
        </View>
        <Menu>
      <MenuTrigger>
        <View>
        <Image
        style={{height:hp(4.3), aspectRatio:1, borderRadius:100}}
        source={user?.profileImage}
        placeholder={blurhash}
        transition={500}/>
        </View>
      </MenuTrigger>
      <MenuOptions
        customStyles={{
            optionsContainer:{
                borderRadius:10,
                marginTop:40,
                marginLeft:-30,
                borderCurve:'continuous',
                backgroundColor:color.white
            }
        }}
      
      >
        <MenuItems 
        text='Profile'
        value={null}
        icon={<MaterialCommunityIcons name='account' size={20} color={color.textcolor}/>}
        action={() => navigation.navigate('Profile',{user})}/>
        <Divider/>
         <MenuItems 
        text='Message'
        value={null}
        action={onPress2}
        icon={<MaterialCommunityIcons name='android-messages' size={20} color={color.textcolor}/>}/>
          <Divider/>

          {isLoading ? (<ActivityIndicator size='large' color='#000'/> ):(
             <MenuItems 
        text='Sign out'
        value={null}
        action={handleLogout}
        icon={<AntDesign name='logout' size={20} color={color.textcolor}/>}/>)}
      </MenuOptions>
    </Menu>
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        flexDirection:'row',
        justifyContent:'space-between',
        padding:20,
        paddingLeft:20,
        paddingRight:20,
        overflow:'hidden',
        borderBottomLeftRadius:20,
        borderBottomRightRadius:20,

    },
    text:{
        color:'#fff',
        fontWeight:'bold',
        textAlign:'center'
    }
})

export default ChatRoomHeader

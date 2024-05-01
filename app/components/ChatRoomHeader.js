import React from 'react'
import { Platform, Text,StyleSheet,View,TouchableOpacity} from 'react-native'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import color from '../../config/color';
import { Image } from 'expo-image';
import { blurhash } from '../../utils/index';
import { useAuth } from '../authContext';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import {
    Menu,
    MenuOptions,
    MenuOption,
    MenuTrigger,
  } from 'react-native-popup-menu';
import { MenuItems } from './CustomMenu';
  
const ChatRoomHeader = ({title,onPress,icon,onPress2,backgroundColor}) => {

    const navigation = useNavigation();

    const ios = Platform.OS == 'ios'
    const { top } = useSafeAreaInsets(); 
    const { user } = useAuth();
    // const handlePress = () => {
    //     //navigation.dispatch(DrawerActions.openDrawer())
    //     navigation.navigate(`${nav}`);


    const Divider = () => {
        return (
            <View style={{width:'100%',padding:1,borderBottomWidth:2, borderColor:color.grey}}/>
        )
    }
    //   }
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
        icon={<MaterialCommunityIcons name='account' size={20}/>}
        action={onPress}/>
        <Divider/>
         <MenuItems 
        text='Message'
        value={null}
        action={onPress2}
        icon={<MaterialCommunityIcons name='android-messages' size={20}/>}/>
      </MenuOptions>
    </Menu>
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        flexDirection:'row',
        justifyContent:'space-between',
        padding:10,
        paddingLeft:20,
        paddingRight:20,
        paddingBottom:6,
        overflow:'hidden',
        borderBottomLeftRadius:30,
        borderBottomRightRadius:30,

    },
    text:{
        color:'#fff',
        fontWeight:'bold',
        textAlign:'center'
    }
})

export default ChatRoomHeader

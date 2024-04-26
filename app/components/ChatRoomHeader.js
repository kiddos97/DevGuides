import React from 'react'
import { Platform, Text,StyleSheet} from 'react-native'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import color from '../../config/color';
import { Image } from 'expo-image';
import { blurhash } from '../../utils';
import { useAuth } from '../authContext';

const ChatRoomHeader = () => {

    const ios = Platform.OS == 'ios'
    const { top } = useSafeAreaInsets;  
    const { user } = useAuth();
    return (
    <View style={[styles.container,{paddingTop: ios ? top: top + 10}]}>
        <View>
            <Text style={{fontSize:hp(3)}}>Chats</Text>
        </View>

        <View>
        <Image
        style={{height:hp(4.3), aspectRatio:1, borderRadius:100}}
        source={user?.profileImage}
        placeholder={blurhash}
        transition={500}/>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        flexDirection:'row',
        justifyContent:'space-between',
        padding:5,
        backgroundColor: color.danger,
        paddingBottom:6,
        overflow:GiHidden,
        borderBottomLeftRadius:20,
        borderBottomRightRadius:20

    },
    text:{
        color:'#fff',
        fontWeight:'medium'
    }
})

export default ChatRoomHeader

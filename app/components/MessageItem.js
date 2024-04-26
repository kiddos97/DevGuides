import React from 'react'
import {Text} from 'react-native'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
export const MessageItem = ({message, currentUser}) => {

    if(currentUser?.userId == message?.userId){
        return (
            <View>
                <View>
                    <View>
                    <Text style={{fontSize: hp(1.9)}}>{message?.text}</Text>
                    </View>
                </View>
            </View>
        )
    }else{
        return (
            <View style={{width:wp(80)}}>
                <View>
                    <Text style={{fontSize:hp(1.9)}}>{message?.text}</Text>
                </View>
            </View>
        )
    }
}



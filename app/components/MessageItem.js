import React from 'react'
import {Text, StyleSheet} from 'react-native'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import color from '../../config/color';
export const MessageItem = ({message, currentUser}) => {

    if(currentUser?.userId == message?.userId){
        return (
            <View style={styles.container}>
                <View style={{width: wp(80)}}>
                    <View>
                    <Text style={{fontSize: hp(1.9)}}>{message?.text}</Text>
                    </View>
                </View>
            </View>
        )
    }else{
        return (
            <View style={[styles.leftcontainer,{width:wp(80)}]}>
                <View style={styles.lefttextcontainer}>
                    <Text style={{fontSize:hp(1.9)}}>{message?.text}</Text>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flexDirection:'row',
        justifyContent:'flex-end',
        marginBottom: 3,
        marginRight: 3
    },
    textContainer:{
        flex:1,
        alignSelf:'flex-end',
        borderRadius:5,
        backgroundColor:color.white

    },
    leftcontainer:{
        marginLeft:3,
        marginBottom:3
    },
    lefttextcontainer:{
        flex:1,
        alignSelf:'flex-start',
        padding:3,
        paddingLeft:5,
        paddingRight:5,
        backgroundColor:color.lightblue

    }
})



import React from 'react';
import { View, Text, StyleSheet, ViewComponent, SafeAreaView } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import color from '../../config/color';

const MessageItem = ({ message, currentUser }) => {
    console.log('message id:',message.userId)
    if (currentUser?.userId == message?.userId) {
        return (
            
            <View style={styles.container}>
                <View style={{width:wp(80)}}>
                    <View style={styles.textContainer}>
                    <Text style={{ fontSize: hp(1.9) }}>{message?.text}</Text>
                    </View>
                </View>
            </View>
        );
    } else {
        return (
            <View style={[styles.leftcontainer, , {width:wp(80)}]}>
                <View style={[styles.lefttextcontainer, { backgroundColor: color.lightblue }]}>
                        <Text style={{ fontSize: hp(1.9) }}>{message?.text}</Text>
                    </View>
            </View>
           
        );
    }
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginBottom: 3,
        marginRight: 3
    },
    textContainer: {
        borderRadius: 5,
        padding: 8,
        felx:1,
        alignSelf:'flex-end'
    },
    leftcontainer: {
        marginLeft: 3,
        marginBottom: 3
    },
    lefttextcontainer: {
        padding: 8,
        flex:1,
        alignSelf:'flex-start',
        paddingLeft:5,
        paddingRight:5,
        borderRadius:6

    }
});

export default MessageItem;



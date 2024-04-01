import React ,{useState} from 'react'
import {Text, View, StyleSheet, Image} from 'react-native'
import person from '../assets/person.jpg'
import color from '../../config/color';
import { TouchableOpacity } from 'react-native-gesture-handler';
const Cards = ({title,image,backgroundColor,navigation}) => {
    const handlePress = () => {
        console.log(title)
    }
    
  return (
    <TouchableOpacity onPress={handlePress}>
 <View style={[styles.container,{backgroundColor}]}>
    {image && ( <View style={styles.imagecontainer}>
        <Image
    style={styles.image}
    source={image}/>
     </View>)}
     <View style={styles.Textcontainer}>
     <Text style={styles.text}>{title}</Text>
     </View>
    </View>
    </TouchableOpacity>
  
  )
}

const styles = StyleSheet.create({
    container:{
        borderWidth: 2,
        borderRadius:8,
        borderColor:color.white,
        padding: 10,
        backgroundColor:color.TextbackgroundColor
       
    },
    imagecontainer:{
        flexDirection:'row',
        justifyContent:'center'
    },
    image:{
        width:100,
        height:100,
        borderRadius: 35
    },
    text:{
        color:color.AppBackgroundColor,
        fontWeight:'bold',
        textAlign:'center'
    },
    Textcontainer:{
        margin:10
    },
    messagetext:{
        marginVertical:5
    }
})

export default Cards

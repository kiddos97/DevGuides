import React ,{useState} from 'react'
import {Text, View, StyleSheet, Image} from 'react-native'
import person from '../assets/person.jpg'
import color from '../../config/color';
import { TouchableOpacity } from 'react-native-gesture-handler';
const Cards = ({title,text1,text2,image,backgroundColor,navigation, color}) => {
    const handlePress = () => {
        console.log(title)
    }
    
  return (
    <TouchableOpacity onPress={handlePress}>
 <View style={styles.container}>
    {image && ( <View style={styles.imagecontainer}>
        <Image
    style={styles.image}
    source={image}/>
     </View>)}
     <View style={styles.Textcontainer}>
     <Text style={[styles.text,{color:color}]}>{title}</Text>
     {text1 && (<Text style={styles.message}>{text1}</Text>)}
     {text2 && (<Text style={styles.message}>
      {text2}
    </Text>)}
     </View>
    </View>
    </TouchableOpacity>
  
  )
}

const styles = StyleSheet.create({
    container:{
        borderWidth:'0.5px',
        borderRadius:8,
        width:80,
        paddingTop:5,
        borderColor:'#8a8a8a',
        backgroundColor:"#252525"
    },
    imagecontainer:{
        flexDirection:'row',
        justifyContent:'center'
    },
    image:{
        width:30,
        height:30,
        borderRadius:100
    },
    text:{
        textAlign:'center',
        fontFamily:'Helvetica-light',
        fontSize:10
    },
    Textcontainer:{
        margin:10
    },
    messagetext:{
        marginVertical:5
    },
    message:{
        color:'#ffffff',
        fontWeight:'bold',
    }
})

export default Cards

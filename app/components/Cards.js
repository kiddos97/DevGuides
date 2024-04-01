import React ,{useState} from 'react'
import {Text, View, StyleSheet, Image} from 'react-native'
import person from '../assets/person.jpg'
import color from '../../config/color';
const Cards = ({title,image, backgroundcolor}) => {
    
  return (
   <View style={[styles.container,{ backgroundcolor }]}>
    {image && ( <View style={styles.imagecontainer}>
        <Image
    style={styles.image}
    source={image}/>
     </View>)}
   <Text>{title}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        borderWidth: 1,
        borderRadius:8,
        padding: 1,
       
    },
    imagecontainer:{
        flexDirection:'row',
        justifyContent:'space-between'
    },
    image:{
        width:30,
        height:30,
        borderRadius: 35
    },
    text:{
        color:color.white
    },
    Textcontainer:{
        margin:10
    },
    messagecontainer:{
        marginVertical:5
    }
})

export default Cards

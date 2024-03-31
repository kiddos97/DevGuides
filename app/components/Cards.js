import React from 'react'
import {Text, View, StyleSheet, Image} from 'react-native'
import person from '../assets/person.jpg'
import color from '../../config/color';
const Cards = ({title}) => {
  return (
   <View style={styles.container}>
    <View style={styles.imagecontainer}>
    <Image
    style={styles.image}
    source={person}/>
    <Text style={styles.text}>01/01/2001 1:00pm</Text>
    </View>
    <View style={styles.Textcontainer}>
    <Text style={styles.text}>{title}</Text>
    <View style={styles.messagecontainer}>
    <Text style={styles.text}>{title}</Text>
    </View>
    </View>
   </View>
  )
}

const styles = StyleSheet.create({
    container:{
        borderWidth: 1,
        borderRadius:8,
        padding: 1,
        backgroundColor:color.backgroundColor
       
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

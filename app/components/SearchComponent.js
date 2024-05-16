import React from 'react'
import { TextInput, View, StyleSheet, TouchableOpacity } from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign'
import color from '../../config/color';

const SearchComponent = ({backgroundColor,color,onPress}) => {
  return (
   <View style={[styles.searchContainer,{backgroundColor:backgroundColor}]}>
    <TextInput
    style={styles.textinput}
    placeholder='Search.....'
    placeholderTextColor='#fff'/>
    <View style={styles.iconContainer}>
        <TouchableOpacity onPress={onPress}>
        <AntDesign d
        name='search1'
        size={25}
        color={color}/>
        </TouchableOpacity>
    </View>
    </View>
  )
}

const styles = StyleSheet.create({

    iconContainer:{
        padding:10
    },
    searchContainer:{
        flexDirection:'row',
        padding: 5,
        borderRadius:30,
        justifyContent:'space-between',
          shadowColor: '#000',
        shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 1,
    shadowRadius: 4.65,

    },
    textinput: {
        color: color.white,
        fontSize: 15,
    },


})
export default SearchComponent

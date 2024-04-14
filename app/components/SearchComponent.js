import React from 'react'
import { TextInput, View, StyleSheet, TouchableOpacity } from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign'
import color from '../../config/color';

const SearchComponent = () => {
  return (
   <View style={styles.searchContainer}>
    <TextInput
    style={styles.textinput}
    placeholder='Search.....'
    placeholderTextColor={color.white}/>
    <View style={styles.iconContainer}>
        <TouchableOpacity onPress={() => console.log('Search button pressed')}>
        <AntDesign
        name='search1'
        size={25}/>
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
        borderWidth: 2,
        padding: 5,
        borderRadius:30,
        justifyContent:'space-between',
        backgroundColor:'rgba(0,0,0,0.3)',
        borderColor:color.AppBackgroundColor

    },
    textinput: {
        color: color.white,
        fontSize: 18,
    },


})
export default SearchComponent

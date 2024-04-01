import React from 'react'
import { TextInput, View, StyleSheet, TouchableOpacity } from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign'
import color from '../../config/color';

const SearchComponent = () => {
  return (
   <View style={styles.searchContainer}>
    <TextInput
    placeholder='Search.....'/>
    <View style={styles.iconContainer}>
        <TouchableOpacity onPress={() => console.log('Search button pressed')}>
        <AntDesign
        name='search1'
        size={20}/>
        </TouchableOpacity>
    </View>
    </View>
  )
}

const styles = StyleSheet.create({

    iconContainer:{
        padding:1
    },
    searchContainer:{

        flexDirection:'row',
        borderWidth: 1,
        padding: 5,
        borderRadius:35,
        justifyContent:'space-between',
        backgroundColor:color.white

    }

})
export default SearchComponent

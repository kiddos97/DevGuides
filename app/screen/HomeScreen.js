import React from 'react'
import {View, Text, StyleSheet} from 'react-native'
import SearchComponent from '../components/SearchComponent'

const HomeScreen = () => {
  return (
    <View style={styles.container}>
    <SearchComponent/>
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        padding:10
    }
})

export default HomeScreen

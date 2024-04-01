import React from 'react'
import {View, Text, StyleSheet,  TouchableHighlight, TouchableOpacity, FlatList, Platform,StatusBar, ActivityIndicator} from 'react-native'
import SearchComponent from '../components/SearchComponent'
import Cards from '../components/Cards'
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import color from '../../config/color';

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First Item',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
  },
];
const Separator = () => {
  return <View style={styles.separator}/>
  
}
const HomeScreen = () => {


  return (

    
    <View style={styles.container}>
      <View style={styles.searchcontainer}>
      <SearchComponent/>
      </View>
    <View style={styles.cardcontainer}>
      <FlatList
      data={DATA}
      keyExtractor={item => item.id}
      renderItem={({item}) => <Cards title={item.title}/>}
      ItemSeparatorComponent={Separator}/>
    </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
        marginVertical:55,
        backgroundColor:color.AppBackgroundColor,
        flex:1
    },
    cardcontainer:{
      marginTop:20,
      padding:10
    },
    separator:{
      height:5
    },
    searchcontainer:{
      padding:20
    }
})

export default HomeScreen

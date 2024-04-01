import React from 'react'
import {View, Text, StyleSheet,  TouchableHighlight, TouchableOpacity, FlatList, Platform,StatusBar, ActivityIndicator, Image,ImageBackground} from 'react-native'
import Cards from '../components/Cards'
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { GestureHandlerRootView, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import color from '../../config/color';
import person from '../assets/person.jpg';
import background from '../assets/background.jpg';
import {DrawerActions } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
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



const HomeScreen = ({navigation}) => {


  const handlePress = () => {
  
    navigation.openDrawer();
  }
  return (
    <ImageBackground
    style={styles.screen}
    source={background}>
      <View style={styles.container}>
        <View style={styles.Textcontainer}>
        <TouchableWithoutFeedback onPress={handlePress}>
            <MaterialCommunityIcons name="menu" color={color.white} size={30} />
          </TouchableWithoutFeedback>
        <View style={styles.test}>
        <Text style={styles.title}>DEVGUIDE</Text>
        </View>
        </View>
    <View style={styles.cardcontainer}>
      <FlatList
      data={DATA}
      keyExtractor={item => item.id}
      renderItem={({item}) => <Cards title={item.title}/>}
      ItemSeparatorComponent={Separator}/>
    </View>
    </View>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
    container:{
      marginVertical:50
    },
    cardcontainer:{
      marginTop:20,
      padding:10,
     
    },
    imagecontainer:{
      width:50,
      height:50,
      marginRight:20
    },
    separator:{
      height:5
    },
    searchcontainer:{
      padding:20,
      marginVertical:55,
      flexDirection:'row'
    },
    screen:{
      paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
      flex:1
  },
  Textcontainer:{
    marginTop:30,
    flexDirection:'row',
    padding:10
  },
  title:{
    fontWeight:'bold',
    textAlign:'center',
    color:color.white,
    fontSize:20,
    marginLeft:60
  },
  test:{
    alignSelf:'center',
    marginHorizontal:60
  }
})

export default HomeScreen

import React from 'react'
import {View, Text, StyleSheet,  TouchableHighlight, TouchableOpacity, FlatList, Platform,StatusBar, ActivityIndicator, Image,ImageBackground, ScrollView} from 'react-native'
import Cards from '../components/Cards'
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { GestureHandlerRootView, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import color from '../../config/color';
import person from '../assets/person.jpg';
import background from '../assets/background.jpg';
import javascript from '../assets/javascript.png';
import react from '../assets/react.png';
import python from '../assets/python.png';


const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    image: python,
    title: 'Python',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    image:react,
    title: 'React Native',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    image:javascript,
    title: 'Javascript',
  },
];


const Separator = () => {
  return <View style={{marginRight:10}}/>
}

const HomeScreen = ({navigation}) => {


  const handlePress = () => {
    
    navigation.openDrawer();
  }
  return (
    <ImageBackground
    style={styles.screen}
    source={background}>
      <ScrollView>
      <View style={styles.container}>
        <View style={styles.Textcontainer}>
        <TouchableWithoutFeedback onPress={handlePress}>
            <MaterialCommunityIcons name="menu" color={color.white} size={30} />
          </TouchableWithoutFeedback>
        <View style={styles.test}>
        <Text style={styles.title}>DEVGUIDE</Text>
        </View>
        </View>
        <View style={styles.link}>
          <TouchableOpacity onPress={() => console.log('text pressed')}><Text style={styles.linkText}>Resources</Text></TouchableOpacity>
          <TouchableOpacity onPress={() => console.log('text pressed')}><Text style={styles.linkText}>Community</Text></TouchableOpacity>
          <TouchableOpacity onPress={() => console.log('text pressed')}><Text style={styles.linkText}>Code</Text></TouchableOpacity>
          <TouchableOpacity onPress={() => console.log('text pressed')}><Text style={styles.linkText}>Learning Path</Text></TouchableOpacity>
        </View>
   <View style={styles.bodyContainer}>
    <Text style={styles.bodyText}>Welcome to DevGuide the 
    Ultimate source to connect new developers to the software world!</Text>
    <View style={{height:10}}></View>
    <Text style={styles.bodyText}>
      Here you are able to connect and work with other like-minded developers, from all different skills. Connect, meet and code!!!
    </Text>
   </View>
   <View style={styles.newcontainer}>
    <Text style={styles.newsText}>Quick Topics</Text>
    <FlatList
      data={DATA}
     horizontal
      keyExtractor={item => item.id}
      renderItem={({item}) => <Cards navigation={navigation} image={item.image} title={item.title} backgroundColor={color.white}/>}
      ItemSeparatorComponent={Separator}/>
   </View>
    </View>
      </ScrollView>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  bodyContainer:{
    padding:10
  },
  bodyText:{
    fontSize:15
  },
    container:{
      marginVertical:50
    },
    imagecontainer:{
      width:50,
      height:50,
      marginRight:20
    },
    link:{
      marginVertical:30,
      flexDirection:'row',
      justifyContent:'space-evenly'
    },
    linkText:{
      textAlign:'center',
      color:color.AppBackgroundColor,
      fontSize:15,
      fontWeight:'bold'
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
  },
  newcontainer:{
    marginVertical:30,
    padding:10,
  },
  newsText:{
    fontSize:20,
    fontWeight:'bold',
    color:color.AppBackgroundColor,
    marginBottom:10
  },
})

export default HomeScreen

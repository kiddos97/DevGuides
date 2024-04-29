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
import { useNavigation } from '@react-navigation/native';
import ChatRoomHeader from '../components/ChatRoomHeader';
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


const Message = {
    text:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' +'Quam vulputate dignissim suspendisse in. Id volutpat lacus laoreet non. ' 
    
  }



const Separator = () => {
  return <View style={{marginRight:10}}/>
}

const HomeScreen = () => {

  const navigation = useNavigation();

  const handlePress = () => {
    //navigation.dispatch(DrawerActions.openDrawer())
    navigation.openDrawer();
  }

  const handleMessage = () => {
    navigation.navigate('Message')
  }

  // const handleAccount = () => {
  //   navigation.navigate('Profile')
  // }
  return (
    <ImageBackground
    style={styles.screen}
    source={background}>
        <View style={styles.container}>
        <View>
          <ChatRoomHeader title='DevGuides'  onPress={handlePress} icon='menu' icon2='android-messages' onPress2={handleMessage}/>
        </View>
        <View style={styles.link}>
          <TouchableOpacity onPress={() => console.log('text pressed')}><Text style={styles.linkText}>Resources</Text></TouchableOpacity>
          <TouchableOpacity onPress={() => console.log('text pressed')}><Text style={styles.linkText}>Community</Text></TouchableOpacity>
          <TouchableOpacity onPress={() => console.log('text pressed')}><Text style={styles.linkText}>Code</Text></TouchableOpacity>
          <TouchableOpacity onPress={() => console.log('test pressed')}><Text style={styles.linkText}>Learning Path</Text></TouchableOpacity>
        </View>
        <ScrollView>
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
      keyExtractor={item => item.id.toString()}
      renderItem={({item}) => <Cards navigation={navigation} image={item.image} title={item.title} backgroundColor={color.white}/>}
      ItemSeparatorComponent={Separator}/>
   </View>
  <View>
  <Text style={styles.updatetext}>
      Updates
    </Text>
    <View style={styles.updatecard}>
      <Cards backgroundColor={color.white} text1={Message.text}/>
    </View>
  </View>
  </ScrollView>
    </View>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  bodyContainer:{
    padding:20
  },
  bodyText:{
    fontSize:15
  },
    imagecontainer:{
      width:50,
      height:50,
      marginRight:20
    },
    link:{
      marginVertical:25,
      flexDirection:'row',
      justifyContent:'space-evenly'
    },
    messageContainer:{
      marginLeft:40
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
    marginLeft:40
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
  updatecontainer:{
    padding:10
  },
  updatetext:{
    padding:10,
    fontWeight:'bold',
    color:color.AppBackgroundColor,
    fontSize:20
  },
  updatecard:{
    padding:10
  }
})

export default HomeScreen

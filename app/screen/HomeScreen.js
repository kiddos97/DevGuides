import React from 'react'
import {View, Text, StyleSheet,  TouchableHighlight, TouchableOpacity, FlatList, Platform,StatusBar, ActivityIndicator,ImageBackground, ScrollView} from 'react-native'
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
import { useRoute } from '@react-navigation/native';
import { useAuth } from '../authContext';
import { blurhash } from '../../utils/index'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { Image } from 'expo-image';
const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    image: python,
    title: 'Python',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    image:react,
    title: 'React',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    image:javascript,
    title: 'Javascript',
  },
  {
    id: '48694a0f-3da1-471f-bd96-145571e29d72',
    image:javascript,
    title: 'Javascript',
  },
  {
    id: 'ff8694a0f-3da1-471f-bd96-145571e29d72',
    image:javascript,
    title: 'Javascript',
  },
  {
    id: '6y8694a0f-3da1-471f-bd96-145571e29d72',
    image:javascript,
    title: 'Javascript',
  },
];


const Separator = () => {
  return <View style={{marginRight:10}}/>
}

const HomeScreen = () => {

 
  const navigation = useNavigation();

 

  //current User logged in
  const {user} = useAuth()
  console.log('Welcome username: ',user)

  const handlePress = () => {
    navigation.openDrawer();
  }

  const handleMessage = () => {
    navigation.navigate('Message')
  }

  
  return (
    <View
    style={styles.screen}
    >
       
        <View>
          <ChatRoomHeader
          title='DevGuides'
          onPress={handlePress}
          icon='menu'
          icon2='android-messages'
          onPress2={handleMessage}
          backgroundColor={color.button}
          />
        </View>
        <View style={styles.link}>
          <TouchableOpacity onPress={() => console.log('text pressed')}><Text style={styles.linkText}>Resources</Text></TouchableOpacity>
          <TouchableOpacity onPress={() => console.log('text pressed')}><Text style={styles.linkText}>Community</Text></TouchableOpacity>
          <TouchableOpacity onPress={() => console.log('text pressed')}><Text style={styles.linkText}>Code</Text></TouchableOpacity>
          <TouchableOpacity onPress={() => console.log('test pressed')}><Text style={styles.linkText}>Learning Path</Text></TouchableOpacity>
        </View>
        <View style={styles.newcontainer}>
    <Text style={styles.newsText}>Quick Topics</Text>
    <FlatList
      data={DATA}
     horizontal
      keyExtractor={item => item.id.toString()}
      renderItem={({item}) => <Cards navigation={navigation} color='#ffffff' image={item.image} title={item.title} backgroundColor={color.grey}/>}
      ItemSeparatorComponent={Separator}/>
   </View>
   <ScrollView>
   <View style={styles.card}>
    <View style={styles.imageText}>
    <Image
        style={{height:hp(4.3), aspectRatio:1, borderRadius:100}}
        source={user?.profileImage}
        placeholder={{blurhash}}
        transition={500}/>
    <View>
    <Text style={styles.userPost}>Isa Kuhn</Text>
    <Text style={styles.userTime}>Time</Text>
    </View>
    </View>
    <View style={styles.postContainer}>
      <Text style={styles.postText}>🚀 Excited to see where #WebDevelopment is heading! 
        The rise of #AI, #PWAs, and #WebAssembly is going to change the game. 
        Time to level up our coding skills! 💻🔥 #TechTrends #FutureIsNow
      </Text>
    </View>
  </View>
  </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  card:{
    padding:20,
  },
  image:{
    width:30,
    height:30,
    borderRadius:100
},
imageText:{
  flexDirection:'row',
  
}
,
userPost:{
  fontFamily:'Helvetica-light',
  color:'#ffffff',
  marginLeft:50

}
,
userTime:{
  fontFamily:'Helvetica-light',
  color:'#ffffff',
  marginLeft:50,
  marginTop:5

}
,
postContainer:{
  marginTop:10,
  padding:10,
  backgroundColor:'#252525',
  borderBottomLeftRadius:20,
  borderBottomRightRadius:20

},
postText:{
  fontFamily:'Helvetica-light',
  color:'#ffffff',
},

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
      marginVertical:20,
      flexDirection:'row',
      justifyContent:'space-evenly'
    },
    messageContainer:{
      marginLeft:40
    },
    linkText:{
      textAlign:'center',
      color:'#ffffff',
      fontSize:15,
      fontFamily:'Helvetica-light'
    },
    separator:{
      height:5
    },
    screen:{
      paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
      flex:1,
      backgroundColor:'#1f1f1f'
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
  newcontainer:{
    marginVertical:10,
    padding:5,
  },
  newsText:{
    fontSize:20,
    fontFamily:'Helvetica-light',
    color:'#ffffff',
    marginBottom:10
  },
  updatecontainer:{
    padding:10
  },
  updatetext:{
    padding:10,
    fontWeight:'bold',
    color:'#ffffff',
    fontSize:20
  },
  updatecard:{
    padding:10
  }
})

export default HomeScreen

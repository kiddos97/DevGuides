import React,{useState,useEffect,lazy, Suspense} from 'react'
import {View, Text, StyleSheet,TouchableOpacity, FlatList, Platform,StatusBar, ActivityIndicator} from 'react-native'
import color from '../../config/color';
import javascript from '../assets/javascript.png';
import react from '../assets/react.png';
import python from '../assets/python.png';
import { useNavigation } from '@react-navigation/native';
import ChatRoomHeader from '../components/ChatRoomHeader';;
import { useAuth } from '../authContext';

import {  collection, doc, onSnapshot, orderBy, setDoc, Timestamp,query, getDocs,where} from "firebase/firestore"; 
import {db} from '../../FireBase/FireBaseConfig';

const PostComponent = lazy(() => import('../components/PostComponent'))
const Cards = lazy(() => import('../components/Cards'))



const DATA1 = [
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

  const [post, setPost] = useState([])

  useEffect(() => {
      fetchPosts(); 
  }, [post]); 
  
  const fetchPosts = async () => {
    try {
   
      const docRef = doc(db, 'post','postID')
      const postmessagRef = collection(docRef, 'post-messages')
      const q = query(postmessagRef,orderBy('createdAt', 'desc'));
      const querySnapShot = await getDocs(q);
      let data = [];
      querySnapShot.forEach(doc => {
        data.push({ ...doc.data(),id:doc.id });
      })
      setPost([...data]);
    }  catch (e) {
    console.log(`Error: ${e}`);
  }
};
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
          onPress={handlePress}
          title={'Welcome back ' + user?.username}
          icon='menu'
          icon2='new-message'
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
      data={DATA1}
     horizontal
      keyExtractor={item => item.id.toString()}
      renderItem={({item}) =>
        <Suspense fallback={<ActivityIndicator size='small' color='#000'/>}>
          <Cards navigation={navigation} color='#ffffff' image={item.image} title={item.title} backgroundColor={color.grey}/>
        </Suspense>}
      ItemSeparatorComponent={Separator}/>
   </View>
    <FlatList
    data={post}
    renderItem={({item}) => <Suspense fallback={<ActivityIndicator size='small' color='#000'/>}>
      <PostComponent name={item.name} content={item.content} date={item.createdAt.toDate().toLocaleString()}/>
      </Suspense>}
    keyExtractor={(item)=> item.id}
    />
    </View>
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
    padding:10,
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

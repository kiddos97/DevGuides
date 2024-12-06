
import {View, Text, StyleSheet, ScrollView, TouchableOpacity,Dimensions,ActivityIndicator} from 'react-native'
import {lazy,Suspense} from 'react'
import color from '../../config/color';
import { useNavigation } from '@react-navigation/native';
import {useState, useEffect} from 'react';
import { useAuth } from '../authContext';
import { Image } from 'expo-image';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { useRoute } from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {db} from '../../FireBase/FireBaseConfig';
import {getDoc,doc } from 'firebase/firestore';
import ChatRoomHeader from '../components/ChatRoomHeader';
import SmallButton from '../components/SmallButton';
import { FlatGrid} from 'react-native-super-grid'
import FollowComponent from '../components/FollowComponent';

const blurhash =
  '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';


const PostComponent = lazy(() => import('../components/PostComponent'))
 
const AccountScreen = () => {

  const [users, setUsers] = useState('')
  const [scrollPercentage, setScrollPercentage] = useState(0);
  const totalPages = 2;
  const { width, height } = Dimensions.get('window');
  const { user } = useAuth();
  let route  = useRoute();
  const {userId} = route?.params
  const isCurrentUser = user?.userId === route?.params?.user?.userId;

  const navigation = useNavigation();

  const skills = ['Python','react','react native','Javascript','SQL','HTML/CSS']
  const follow_items = [{count:500,content:'following'},{count:2000,content:'followers'},{count:100,content:'posts'}]

  useEffect(() => {
    if(userId){
      fetchUser();
    }
  

  },[userId])

  const fetchUser = async () => {
    const userDoc = doc(db,'users',userId)
    try{
      const userDocRef = await getDoc(userDoc);
      if(userDocRef.exists()){
        setUsers(userDocRef.data())
      }
    }catch(error){
      console.error(`No such document ${error}`)
    }
  }

  const handleScroll = (event) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const contentWidth = width * totalPages; // Total scrollable width
    const percentage = Math.min((offsetX / (contentWidth - width)) * 100, 100);
    setScrollPercentage(percentage);
  };
  



  return (
    <View style={styles.screen}>
      <ChatRoomHeader 
        onPress={()=>navigation.navigate('Welcome')} 
        backgroundColor={color.button} 
        icon='keyboard-backspace' 
        onPress2={() => navigation.navigate('Message')}
        />
      <ScrollView>
      <View style={styles.profileContainer}>
        <View style={{flexDirection:'row', justifyContent:'space-between'}}>
        <Image
            style={{height:hp(15), aspectRatio:1, borderRadius:100}}
            source={user?.profileImage}
            placeholder={{blurhash}}
            transition={500}/>
            <View style={{marginTop:20,flexDirection:'row', justifyContent:'space-evenly'}}>
            <Text style={{fontSize:30, color:'#fff'}}>  {
                  isCurrentUser ? (<Text style={styles.username}>@{user?.username}</Text>) 
                  : (<Text style={styles.username}>@{users.username}</Text>)
                }</Text>
                {!isCurrentUser && (
            <TouchableOpacity style={{paddingLeft:20}}onPress={() => navigation.navigate('Chat',{userid:userId,name:users?.username})}>
              <AntDesign name='message1' size={25} color='#00BF63'/>
            </TouchableOpacity>)}
            </View>
            </View>
            <View style={{alignItems:'flex-end',flexDirection:'column',marginBottom:20}}>
            <Text style={styles.title}>Full Stack Developer</Text>
            <Text style={styles.location}>Ann Arbor,MI</Text>
            </View>
            <View style={styles.textcontainer}>
              <View style={{flexDirection:'column',alignItems:'stretch'}}>
                <View style={{flexDirection:'row', justifyContent:'space-around'}}>
                  {follow_items.map((item,index)=>{
                    return <FollowComponent key={index} count={item.count} content={item.content}/>
                  })}
                </View>
              </View>
            </View>
            <View style={styles.aboutContainer}>
              <View style={{flexDirection:'row', justifyContent:'space-around'}}>
                <SmallButton name='Post'/>
                <SmallButton name='Projects'/>
              </View>
              </View>
              <View>
                <ScrollView
                 style={{ flex: 1 }}
                 horizontal={true}
                 showsHorizontalScrollIndicator={false}
                 onScroll={(event) => {
                  handleScroll(event)
                 }}
                 scrollEventThrottle={16}
                 pagingEnabled={true}
                >
                   <View style={{width,height}}>
                    <View style={{paddingLeft:85,justifyContent:'center',alignItems:'flex-start'}}>
                    <View style={{marginTop:5,borderWidth:1,borderColor:'#000',width:50,borderColor:'#00BF63'}}></View>
                    </View>
                    {skills.map((skill,index) => {
                      return <Suspense key={index} fallback={<ActivityIndicator size='small' color='#000'/>}>
                        <View style={{padding:10}}>
                        <PostComponent/>
                      </View>
                        </Suspense>
                    })}
                   </View>
              <View style={{width,height}}>
                    <View style={{paddingRight:120,justifyContent:'center',alignItems:'flex-end'}}>
                    <View style={{marginTop:5,borderWidth:1,borderColor:'#000',width:50,borderColor:'#00BF63'}}></View>
                    </View>
                    <View style={{padding:10,paddingRight:50}}>
                    <FlatGrid
                      itemDimension={150}
                      data={skills}
                      renderItem={({ item }) => 
                        ( 
                        <View style={{backgroundColor:'#252525',padding:30,borderRadius:25,}}>
                          <Text style={{textAlign:'center'}}>{item}</Text>
                          </View>
                      )}
                      />
                    </View>
             </View>
                </ScrollView>
              </View>
      </View>
      </ScrollView> 
    </View>
   
  )
}

const styles = StyleSheet.create({
  aboutContainer:{
    marginTop:10,
    padding:10,
  },
  aboutText:{
    fontSize:15,
    fontWeight:'bold'
  },
  profileContainer:{
    marginTop:20,
    padding:10,
  },
  screen:{
    backgroundColor:'#1F1F1F',
    flex:1
  },
  space:{
    height:30
  },
  container:{
    marginVertical:70,
    padding:10,
    flexDirection:'row',
    },
  container1:{
      backgroundColor:color.white,
       
  },
  text:{
    fontSize:12,
    fontWeight:'bold',
    letterSpacing:1,
    padding:5
  },
  textcontainer:{
    marginTop:10,
    padding:10,
  },
  username:{
    fontSize:30,
    letterSpacing:1,
    fontWeight:'bold',
   fontFamily:'Helvetica-light'
  },
  location:{
    fontSize:15,
    color:'#fff',
    fontFamily:'Helvetica-light'
  },
  title:{
    fontSize:15,
    color:'#fff',
    fontFamily:'Helvetica-light'
  },
  progressBarContainer: {
    height: 2,
    width: "100%",
    backgroundColor: "#e0e0e0",
    position: "absolute",
  },
  progressBar: {
    height: "100%",
    backgroundColor: '#00BF63',
  },


})
export default AccountScreen

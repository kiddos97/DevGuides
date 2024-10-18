
import {View, Text, StyleSheet, TouchableWithoutFeedback, Alert, ActivityIndicator, ScrollView, TouchableOpacity} from 'react-native'
import color from '../../config/color';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import {useState, useEffect} from 'react';
import { useAuth } from '../authContext';
import { Image } from 'expo-image';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { blurhash } from '../../utils/index';
import { useRoute } from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { userRef,db} from '../../FireBase/FireBaseConfig';
import { query,getDoc,doc } from 'firebase/firestore';
const AccountScreen = () => {

  const [users, setUsers] = useState('')

  const { user } = useAuth();

  let route  = useRoute();

  const {userId} = route?.params


  // console.log('user:',userId)
  // console.log('Profile searched user userId:', userId)
 
  // console.log('username:',route?.params?.user?.username)

  const isCurrentUser = user?.userId === route?.params?.user?.userId;

 

  const navigation = useNavigation();


  const skills = [ // this i will be coming from the database and can be updatred by the user
    { name:'Python'},
  {name:'JavaScript'},
  {name:'React Native'}
  ]

  // console.log('userName: ',users.username)
  // console.log('username:',route?.params?.user?.username)

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
 

  return (
    <View style={styles.screen}>
      <ScrollView>
      <View style={styles.profileContainer}>
        <View style={{flexDirection:'row', justifyContent:'space-between'}}>
        <Image
            style={{height:hp(15), aspectRatio:1, borderRadius:100}}
            source={user?.profileImage}
            placeholder={blurhash}
            transition={500}/>
            {!isCurrentUser && (
            <TouchableOpacity onPress={() => navigation.navigate('Chat',{userid:userId,name:users?.username})}>
              <AntDesign name='message1' size={30}/>
            </TouchableOpacity>)}
            </View>
            <View style={styles.textcontainer}>
              <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                {
                  isCurrentUser ? (<Text style={styles.text}>{user?.username}</Text>) 
                  : (<Text style={styles.text}>{users.username}</Text>)
                }
              <MaterialCommunityIcons name='account-edit-outline' size={25}/>
              </View>
            <Text style={styles.text}>Software Engineer, Austin TX</Text>
            <View style={styles.buttonContainer}>
            </View>
            </View>
            <View style={styles.aboutContainer}>
              <View style={{flexDirection:'row', justifyContent:'space-between'}}>
              <Text style={styles.aboutText}>About</Text>
              <TouchableOpacity onPress={() => console.log('icon pressed')}>
              <MaterialCommunityIcons name='account-edit-outline' size={25}/>
              </TouchableOpacity>
              </View>
              <View style={styles.textcontainer}>
                <Text>
                  I am a young man that likes to get his ass ate by his hot girlfriend isa kuhun
                </Text>
              </View>
              </View>
              <View style={styles.aboutContainer}>
              <View style={{flexDirection:'row', justifyContent:'space-between'}}>
              <Text style={styles.aboutText}>Skills</Text>
              <TouchableOpacity onPress={() => console.log('icon pressed')}>
              <MaterialCommunityIcons name='account-edit-outline' size={25}/>
              </TouchableOpacity>
              </View>
              <View style={styles.textcontainer}>
               {skills.map((skill,index) => (
                <Text key={index} style={styles.text}>{'* ' + skill.name}</Text>
               ))}
              </View>
              </View>
              <View style={styles.aboutContainer}>
              <Text style={styles.aboutText}>Mentor Review</Text>
              <View style={styles.textcontainer}>
                <Text>
                  Isa Kuhn is an amazing mentee, picking up the material at a fast rate!
                </Text>
              </View>
              </View>
      </View>
      </ScrollView>
      
    </View>
   
  )
}

const styles = StyleSheet.create({
  aboutContainer:{
    marginTop:30,
    backgroundColor:color.button2,
    padding:10,
    borderBottomRightRadius:35,
    borderBottomLeftRadius: 35,
  },
  aboutText:{
    fontSize:15,
    fontWeight:'bold'
  },
  buttonContainer:{
    flexDirection:'row',
    marginTop:20,
    justifyContent:'space-around'
  },
  profileContainer:{
    padding:10,
    paddingTop:10,

  },
  screen:{
    backgroundColor:color.white,
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
    backgroundColor:color.button2

    
  },

})
export default AccountScreen

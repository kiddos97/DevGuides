
import {View, Text, StyleSheet, TouchableWithoutFeedback, Alert, ActivityIndicator, ScrollView} from 'react-native'
import color from '../../config/color';
import ListItem from '../../List/ListItem';
import person from '../assets/person.jpg'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useState} from 'react';
import { useAuth } from '../authContext';
import { Image } from 'expo-image';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { blurhash } from '../../utils/index';
import Button from '../components/Button';
import { useRoute } from '@react-navigation/native';
import backimage from '../assets/backimage.jpg';

const AccountScreen = () => {


  const { user } = useAuth();
  const route  = useRoute();

  console.log('route id:',route?.params.user?.userId)
  console.log('user id:',user?.userId)

  const isCurrentUser = user?.userId === route?.params?.user?.userId;


 

  return (
    <View style={styles.screen}>
      <ScrollView>
      <View style={styles.profileContainer}>
        <Image
            style={{height:hp(15), aspectRatio:1, borderRadius:100}}
            source={user?.profileImage}
            placeholder={blurhash}
            transition={500}/>
            <View style={styles.textcontainer}>
            <Text style={styles.text}>{route?.params?.user?.username}</Text>
            <Text style={styles.text}>Software Engineer, Austin TX</Text>
            </View>
            <View style={styles.buttonContainer}>
              {!isCurrentUser && (<Button title='message'/>)}
              <Button title='connect' backgroundColor={color.button} color={color.white} borderColor={color.button}/>
            </View>
            <View style={styles.aboutContainer}>
              <Text style={styles.aboutText}>About</Text>
              <View style={styles.textcontainer}>
                <Text>
                  I am a young man that likes to get his ass ate by his hot girlfriend isa kuhun
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
    borderWidth:2,
    marginTop:30,
    backgroundColor:color.grey,
    height:100,
    padding:10
   

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
  },
  textcontainer:{
    marginTop:10,
  }
})
export default AccountScreen

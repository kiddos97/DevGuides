import React,{useState} from 'react'
import {View,StyleSheet,Text,TouchableOpacity,TouchableHighlight} from 'react-native'
import { blurhash } from '../../utils/index'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { Image } from 'expo-image';
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import { useAuth } from '../authContext';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';

const PostComponent = ({content,date,name}) => {

    const [press,setIsPress] = useState(false)
    const [count, setCount] = useState(0)
    const {user} = useAuth();

    const navigation = useNavigation();

    const handleLike = () => {
        setCount(count + 1)
    }
  return (
    <View style={styles.card}>
    <View style={styles.imageText}>
    <Image
        style={{height:hp(4.3), aspectRatio:1, borderRadius:100}}
        source={user?.profileImage}
        placeholder={{blurhash}}
        transition={500}/>
    <View>
    <Text style={styles.userPost}>{name}</Text>
    <View style={styles.userLocationContainer}>
    <Text style={styles.userTime}>Time</Text>
    <Text style={styles.userLocation}>Near Domain Street</Text>
    </View>
    </View>
    </View>
    <View style={styles.postContainer}>
      <Text style={styles.postText}>{content}
      </Text>
      <Text style={styles.postDate}>{date}</Text>
    </View>
    <View style={styles.reactionContainer}>
    <TouchableHighlight
                 onShowUnderlay={() => setIsPress(true)}
                 onHideUnderlay={() => setIsPress(false)}
                 underlayColor='#0097b2'
                 onPress={handleLike}
                 style={styles.reactionIcon}
                 >
                 <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                     <MaterialCommunityIcons name={press ? "heart" : "cards-heart-outline"} size={20} color={press ? '#fff':""}/>
                     <Text style={styles.reactionText}>{count} Like</Text>
                 </View>
                 </TouchableHighlight>
        <TouchableOpacity onPress={() => navigation.navigate('Comment')} style={styles.reactionIcon}>
        <MaterialCommunityIcons name="comment-processing-outline" size={20} color='#ffffff'/>
          <Text style={styles.reactionText}>Comment</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.reactionIcon}>
          <EvilIcons name='retweet' size={20} color='#ffffff'/>
          <Text style={styles.reactionText}>Repost</Text>
        </TouchableOpacity>
      </View>
  </View>
  )
}


const styles = StyleSheet.create({
    card:{
        padding:10,
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
      marginTop:5,
      fontSize:10
    
    },
    userLocationContainer:{
        flexDirection:'row',
    },
    userLocation:{
        fontFamily:'Helvetica-light',
        color:'#ffffff',
        marginLeft:150,
        marginTop:5,
        fontSize:10,
    },
    postContainer:{
      marginTop:10,
      padding:20,
      backgroundColor:'#252525',
      borderBottomLeftRadius:20,
      borderBottomRightRadius:20,
    
    },
    postText:{
      fontFamily:'Helvetica-light',
      color:'#ffffff',
    },
    postDate:{

      marginTop:10,
      paddin:5,
      fontSize:9,
      color:'#8a8a8a',
      fontFamily:'Helvetica-light',
      

    },

    reactionContainer:{
      flexDirection:'row',
      justifyContent:'space-evenly',
      marginTop:20
    },
    reactionIcon:{
      padding:5,
      width:110,
      flexDirection:'row',
      borderRadius:10,
      backgroundColor:'#252525',
    },
    reactionText:{
      color:'#ffffff',
      marginLeft:10,
      fontFamily:'Helvetica-light',
      fontSize:15
     
    },
})



export default PostComponent
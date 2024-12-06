import React,{useState} from 'react'
import {View,StyleSheet,Text,TouchableOpacity,TouchableHighlight} from 'react-native'
import { blurhash } from '../../utils/index'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { Image } from 'expo-image';
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import { useAuth } from '../authContext';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';

const PostComponent = ({content,date,name,id}) => {

    const [press,setIsPress] = useState(false)
    const [count, setCount] = useState(0)
    const {user} = useAuth();

    const navigation = useNavigation();

    const handleLike = () => {
        setCount(count + 1)
    }
  return (
    <View style={styles.card}>
    <View style={styles.postContainer}>
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
      <Text style={styles.postText}>{content}
      </Text>
      <Text style={styles.postDate}>{date}</Text>
      <View style={{borderBottomColor:'#8a8a8a',borderBottomWidth:'0.5px',marginTop:30}}></View>
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
                     <Text style={styles.reactionText}>{count}</Text>
                 </View>
                 </TouchableHighlight>
        <TouchableOpacity onPress={() => navigation.navigate('Comment',{id})} style={styles.reactionIcon}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <MaterialCommunityIcons name="comment-processing-outline" size={20} color='#ffffff'/>
            <Text style={styles.reactionText}>{count}</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.reactionIcon}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <EvilIcons name='retweet' size={20} color='#ffffff'/>
          <Text style={styles.reactionText}>{count}</Text>
          </View>
        </TouchableOpacity>
      </View>
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
      marginBottom:10
      
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
        marginTop:5,
        marginLeft:100,
        fontSize:10,
    },
    postContainer:{
      marginTop:10,
      padding:5,
      backgroundColor:'#252525',
      borderBottomLeftRadius:20,
      borderBottomRightRadius:20,
      borderTopRightRadius:20,
      borderTopLeftRadius:20
    
    },
    postText:{
      fontFamily:'Helvetica-light',
      color:'#ffffff',
      marginLeft:10
    },
    postDate:{

      marginTop:10,
      paddin:5,
      fontSize:9,
      color:'#8a8a8a',
      fontFamily:'Helvetica-light',
      marginLeft:10
    },

    reactionContainer:{
      flexDirection:'row',
      justifyContent:'space-between',
      marginTop:10
    },
    reactionIcon:{
      padding:5,
      flexDirection:'row',
    },
    reactionText:{
      color:'#ffffff',
      marginLeft:10,
      fontFamily:'Helvetica-light',
      fontSize:15
     
    },
})



export default PostComponent
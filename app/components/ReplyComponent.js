import React,{useState} from 'react'
import {View,StyleSheet,Text,TouchableOpacity,TouchableHighlight} from 'react-native'
import { blurhash } from '../../utils/index'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { Image } from 'expo-image';
import { useAuth } from '../authContext';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
const ReplyComponent = ({name,content}) => {

    const navigation = useNavigation();
    const [press,setIsPress] = useState(false)
    const [count, setCount] = useState(0)
    const [showReply,setShowReply] = useState(false)
    const {user} = useAuth();


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
      {/* <Text style={styles.postDate}>{date}</Text> */}
      <View style={styles.reactionContainer}>
    <TouchableHighlight
                 onShowUnderlay={() => setIsPress(true)}
                 onHideUnderlay={() => setIsPress(false)}
                 underlayColor='#0097b2'
                 onPress={handleLike}
                 style={styles.reactionIcon}
                 >
                 <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                     <MaterialCommunityIcons name={press ? "heart" : "cards-heart-outline"} size={20}/>
                     <Text style={styles.reactionText}>{count}</Text>
                 </View>
                 </TouchableHighlight>
        <TouchableOpacity style={styles.reactionIcon}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <MaterialCommunityIcons name="comment-processing-outline" size={20}/>
                <Text style={styles.reactionText}>0</Text>
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
      marginBottom:20
      
    }
    ,
    userPost:{
      fontFamily:'Helvetica-light',
      color:'#000',
      marginLeft:50
    
    }
    ,
    userTime:{
      fontFamily:'Helvetica-light',
      color:'#000',
      marginLeft:50,
      marginTop:5,
      fontSize:10
    
    },
    userLocationContainer:{
        flexDirection:'row',
    },
    userLocation:{
        fontFamily:'Helvetica-light',
        color:'#000',
        marginLeft:100,
        marginTop:5,
        fontSize:10,
    },
    postContainer:{
      marginTop:10,
      padding:20,
      borderBottomLeftRadius:20,
      borderBottomRightRadius:20,
      borderTopRightRadius:20,
      borderTopLeftRadius:4
    
    },
    postText:{
      fontFamily:'Helvetica-light',
      color:'#000',
    },
    postDate:{
      marginTop:5,
      paddin:5,
      fontSize:9,
      color:'#8a8a8a',
      fontFamily:'Helvetica-light',
      

    },

    reactionContainer:{
      flexDirection:'row',
      justifyContent:'space-around',
      marginTop:20

    },
    reactionIcon:{
      padding:5,
      width:100,
      flexDirection:'row',
      borderRadius:10,
    },
    reactionText:{
      color:'#000',
      marginLeft:10,
      fontFamily:'Helvetica-light',
      fontSize:10,
      textAlign:'center',
    },
    replies:{
      textAlign:'center',
      fontSize:10
    },
    repliesContainer:{
      marginTop:10
    }
})
export default ReplyComponent
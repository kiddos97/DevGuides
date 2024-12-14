import React,{useState,useEffect} from 'react'
import {View,StyleSheet,Text,TouchableOpacity,TouchableHighlight} from 'react-native'
import { blurhash } from '../../utils/index'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { Image } from 'expo-image';
import { useAuth } from '../authContext';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import ReplyComponent from './ReplyComponent';
import {  addDoc, collection, doc, onSnapshot, orderBy, setDoc, Timestamp,query, getDocs} from "firebase/firestore"; 
import { IdRef, db, roomRef } from '../../FireBase/FireBaseConfig';

const CommentComponent = ({content,name}) => {
    const [press,setIsPress] = useState(false)
    const [count, setCount] = useState(0)
    const [showReply,setShowReply] = useState(false)
    const [reply,setReply] = useState([])
    const {user} = useAuth();

    const navigation = useNavigation();

    const handleLike = () => {
        setCount(count + 1)
    }

    useEffect(() => {
      fetchReply()
    },[])

      
  const fetchReply = async () => {
    try {
      const docRef = doc(db, 'post','postID')
      const postmessageRef = collection(docRef, 'post-messages')
      const replymessageRef = doc(postmessageRef,'sPgBSFVL9frm0RLgoikW')
      const messageReply = collection(replymessageRef,'reply-message')
      const q = query(messageReply,orderBy('createdAt', 'desc'));
      const querySnapShot = await getDocs(q);
      let data = [];
      querySnapShot.forEach(doc => {
        data.push({ ...doc.data(),id:doc.id });
      })
      console.log('DATAMAN:',data)
      setReply([...data]);
    }  catch (e) {
    console.log(`Error: ${e}`);
  }
};

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
        <TouchableOpacity onPress={() => navigation.navigate('CommentReply')} style={styles.reactionIcon}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <MaterialCommunityIcons name="comment-processing-outline" size={20}/>
                <Text style={styles.reactionText}>{count}</Text>
            </View>
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={() => setShowReply(!showReply)}>
        <View style={styles.replycontainer}>
        <Text style={styles.replies}>
          <View style={{borderBottomWidth:0.5,width:25,borderColor:'#8a8a8a '}}/>    view 0 replies</Text>
        </View>
      </TouchableOpacity>
      { showReply && reply.map((replies,index) => {
        return <ReplyComponent key={index} name={replies.name} content={replies.content}/>
      })}
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
      color:'#fff',
      marginLeft:50
    
    }
    ,
    userTime:{
      fontFamily:'Helvetica-light',
      color:'#fff',
      marginLeft:50,
      marginTop:5,
      fontSize:10
    
    },
    userLocationContainer:{
        flexDirection:'row',
    },
    userLocation:{
        fontFamily:'Helvetica-light',
        color:'#fff',
        marginLeft:100,
        marginTop:5,
        fontSize:10,
    },
    postContainer:{
      marginTop:10,
      padding:10,
      borderBottomLeftRadius:20,
      borderBottomRightRadius:20,
      borderTopRightRadius:20,
      borderTopLeftRadius:4
    
    },
    postText:{
      fontFamily:'Helvetica-light',
      color:'#fff',
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
      color:'#fff',
      marginLeft:10,
      fontFamily:'Helvetica-light',
      fontSize:10,
      textAlign:'center',
    },
    replies:{
      fontSize:10,
      marginLeft:20,
      textAlign:'center'
    },
    replycontainer:{
      marginTop:5,
      flexDirection:'row',
      justifyContent:'center'
        }
})

export default CommentComponent
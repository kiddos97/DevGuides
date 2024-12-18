import React,{lazy,Suspense,useEffect,useState} from 'react'
import {View,Text,StyleSheet,FlatList,Platform,ScrollView, TextInput,TouchableOpacity, ActivityIndicator,KeyboardAvoidingView,SafeAreaView} from 'react-native'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Feather from 'react-native-vector-icons/Feather';
import { addDoc, collection,onSnapshot, Timestamp,query, getDocs,where,or,updateDoc} from "firebase/firestore"; 
import { db} from '../../FireBase/FireBaseConfig';
import { useAuth } from '../authContext';
import { useSelector,useDispatch } from 'react-redux';
import { addComment } from '../features/PostandComments/socialSlice';
import { useRoute } from '@react-navigation/native';
import ChatRoomHeader from '../components/ChatRoomHeader';
import color from '../../config/color';
import { useNavigation } from '@react-navigation/native';
const CommentComponent = lazy(() => import('../components/CommentComponent'))
const PostComponent = lazy(() => import('../components/PostComponent'))

const CommentScreen = () => {
  const {user} = useAuth()
  const route = useRoute()
  const {id} = route?.params
  const [currentComment,setCurrentComment] = useState([])
  const [comments, setComment] = useState([])
  const [loading,setLoading] = useState(false)
  const [text,setText] = useState('')
  const dispatch = useDispatch()
  const navigation = useNavigation()
  //const postIds = useSelector(state => state.social.posts.allIds);
  useEffect(() => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      grabCurrentPost();
      fetchID()
    },2000)
  },[])
  const fetchID = async () => {
    if(id){
      unsub = onSnapshot(collection(db,'posts',id,'comments'),(querySnapShot) => {
        try{
            let data = []
            querySnapShot.forEach(doc =>{
              data.push({ ...doc.data(),id:doc.id });
            })
            setComment([...data])
        }catch(e){
          console.log(e)
        }
      }
      ) 
    }
  }
  const handlePress = () => {
    navigation.goBack();
  }

  const handleSend = async () => { // will handle sending the comment to firebase, and parentId key and set value to postId ( id of post)
    try{
      const commentMessageRef = collection(db,'posts',id,'comments')
      const newDoc = await addDoc(commentMessageRef,{
        parentId:null,
        name:user?.username,
        content:text,
        createdAt: Timestamp.fromDate(new Date())
      })
      await updateDoc(newDoc,{
        id:newDoc.id
      })
      console.log('comment id:',newDoc.id)
      dispatch(addComment({id:newDoc.id,postId:id,content:text})) // grab the new comment id add to redux store.
      setText('')
    }catch(e){
      console.log('Error:',e)
    }
  }
const grabCurrentPost = async () => { 
  /// grabbing the current comment can use postId to grab current comment from redux store
  try{
    const docRef = collection(db, 'posts')
    // const postmessageRef = collection(docRef,)
    const q = query(
      docRef,
      or(
        where('id', '==', id)
      )
    );
    const querySnapShot = await getDocs(q)
    let data = []
    querySnapShot.forEach(doc => {
      data.push({...doc.data(),id:doc.id})
    })
    console.log(data)
    setCurrentComment([...data])
  }catch(e){
    console.error('ERROR:',e)
  }
  
}

  return (

      <KeyboardAvoidingView
    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    keyboardVerticalOffset={60} 
    style={styles.container}
    >
       <ChatRoomHeader onPress={handlePress} icon='keyboard-backspace' backgroundColor={color.button}/>
       <ScrollView
       keyboardShouldPersistTaps="never">
       <View>
        {currentComment.map((comment) => {
          return <Suspense key={comment.id} fallback={<ActivityIndicator size='small' color='#fff'/>}>
            <PostComponent name={comment.name} content={comment.content}/>
          </Suspense>
        })}</View>
        {comments.map((comment) => {
         
          return <Suspense key={comment.id}  fallback={<ActivityIndicator size='small' color='#fff'/>}>
                  <CommentComponent content={comment.content} name={comment.name} comment_id={comment.id} post_id={id}/>
            </Suspense>
        })}
        </ScrollView>
        <View>
       <View style={styles.inputContainer}>
         <View style={styles.messageInput}>
         <TextInput
         value={text}
         onChangeText={(item) => setText(item)}
         style={[styles.textinput,{fontSize:hp(1.5)}]}
           placeholder='Comment....'
           placeholderTextColor="#000"
         />
         <TouchableOpacity onPress={handleSend}>
           <View style={styles.sendButton}>
           <Feather
           name='send'
           size={hp(2.0)}
           color='#737373'/>
           </View>
         </TouchableOpacity>
       </View>
        </View>
       </View>
       </KeyboardAvoidingView>
    
    
   
  )
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:color.backgroundcolor
  },
  textinput:{
    flex:1,
    marginRight:2,
    padding:5
  },
  messageInput: {
    flexDirection:'row',
    justifyContent:'space-between',
    borderColor:'#8a8a8a',
    borderWidth:0.5,
    borderRadius:20,
  },
  sendButton: {
    padding: 15,
    marginRight:1,
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent:'space-between',
    alignItems:'center',
    marginRight:3,
    marginLeft:3,
    padding:5,
    paddingBottom:30
  },
  
})

export default CommentScreen
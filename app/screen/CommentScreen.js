import React,{lazy,Suspense,useEffect,useState} from 'react'
import {View,Text,StyleSheet,FlatList,Platform,ScrollView, TextInput,TouchableOpacity, ActivityIndicator} from 'react-native'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Feather from 'react-native-vector-icons/Feather';
import CustomKeyboardView from '../components/CustomKeyboardView';
import { addDoc, collection, doc, onSnapshot, orderBy, setDoc, Timestamp,query, getDocs,where,or} from "firebase/firestore"; 
import { db} from '../../FireBase/FireBaseConfig';
import { useAuth } from '../authContext';
import { useSelector,useDispatch } from 'react-redux';
import { addComment } from '../features/PostandComments/socialSlice';
import { useRoute } from '@react-navigation/native';


const CommentComponent = lazy(() => import('../components/CommentComponent'))
const PostComponent = lazy(() => import('../components/PostComponent'))
const list_comments = [
  {
    id: '1',
    parent_id: '0',
    name: 'david',
    image: '',
    text: 'this is parent cooment 1',
  }, 
];

// fixed the functionality of the comment sending to the firebase and then rednering on the screen, depending on render may add a lazy affect

const CommentScreen = () => {
  const {user} = useAuth()
  const route = useRoute()
  const {id} = route.params
  const [currentComment,setCurrentComment] = useState([])
  const [comments, setComment] = useState([])
  const [postid,setPostId] = useState([])
  const [text,setText] = useState('')
  const dispatch = useDispatch()
  //const postIds = useSelector(state => state.social.posts.allIds);
  useEffect(() => {
    setTimeout(() => {
      grabCurrentComment();
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
  // const grabComment = async () => { //grabbing all of the comments, will take a postId to grab comments only for a certain post
  //   try{
  //     const docRef = doc(db,'post','postID')
  //     const comment = collection(docRef,'post-messages')
  //     const comment_message = doc(comment,'sPgBSFVL9frm0RLgoikW')
  //     const message_comment = collection(comment_message,'comment-message')
  //     const q = query(message_comment,orderBy('createdAt', 'desc'));
  //     const querySnapShot = await getDocs(q);
  //     let data = [];
  //     querySnapShot.forEach(doc => {
  //       data.push({ ...doc.data(),id:doc.id });
  //     })
  //     setComment([...data]);
  //   }  catch (e) {
  //   console.log(`Error: ${e}`);
  // }
  // }

  const handleSend = async () => { // will handle sending the comment to firebase, and parentId key and set value to postId ( id of post)
    try{
      const commentMessageRef = collection(db,'posts',id,'comments')
      const newDoc = await addDoc(commentMessageRef,{
        parentId:null,
        name:user?.username,
        content:text,
        createdAt: Timestamp.fromDate(new Date())
      })
      console.log('comment id:',newDoc.id)
      dispatch(addComment({id:newDoc.id,postId:id,content:text})) // grab the new comment id add to redux store.
      setText('')
    }catch(e){
      console.log('Error:',e)
    }
  }
const grabCurrentComment = async () => { 
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
    <CustomKeyboardView inChat={true}
    behavior={Platform.OS === "ios" ? "padding" : 'height'}
    style={styles.container}>
       <ScrollView style={styles.list}>
       <View>
        {currentComment.map((comment) => {
          return <Suspense key={comment.id} fallback={<ActivityIndicator size='small' color='#000'/>}>
            <PostComponent name={comment.name} content={comment.content}/>
          </Suspense>
        })}</View>
        {comments.map((comment) => {
         
          return <Suspense key={comment.id}  fallback={<ActivityIndicator size='small' color='#000'/>}>
                  <CommentComponent content={comment.content} name={comment.name}/>
            </Suspense>
        })}
        </ScrollView>
       <View style={{marginBottom:hp(1.7), paddingTop:5}}>
       <View style={styles.inputContainer}>
        <View style={styles.messageInput}>
          <TextInput
          value={text}
          onChangeText={(item) => setText(item)}
          style={[styles.textinput,{fontSize:hp(1.5)}]}
            placeholder='Comment....'
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
       </CustomKeyboardView>
    
    
  )
}

const styles = StyleSheet.create({
  container:{
    flex:1,
  },
  textinput:{
    flex:1,
    marginRight:2
  },
  messageInput: {
    flexDirection:'row',
    justifyContent:'space-between',
    borderColor:'#8a8a8a',
    borderWidth:'0.5px',
    padding:2,
    borderRadius:20
  },
  sendButton: {
    padding: 5,
    marginRight:1,
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent:'space-between',
    alignItems:'center',
    marginRight:3,
    marginLeft:3,
    paddingBottom: Platform.OS === "ios" ? 20 : 10,
    padding:5,
  },
  list:{
    marginTop:10
  }
})

export default CommentScreen
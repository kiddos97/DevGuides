import React,{lazy,Suspense,useEffect,useState} from 'react'
import {View,Text,StyleSheet,FlatList,Platform,ScrollView, TextInput,TouchableOpacity, ActivityIndicator} from 'react-native'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Feather from 'react-native-vector-icons/Feather';
import CustomKeyboardView from '../components/CustomKeyboardView';
import {  addDoc, collection, doc, onSnapshot, orderBy, setDoc, Timestamp,query, getDocs,where,or} from "firebase/firestore"; 
import { db,  } from '../../FireBase/FireBaseConfig';
import { useAuth } from '../authContext';


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

  const [text,setText] = useState('')

  const {user} = useAuth()

  const [currentComment,setCurrentComment] = useState([])
  const [comments, setComment] = useState([])

  useEffect(() => {
    grabCurrentComment()

  },[])

  useEffect(() => {
    grabComment()
  },[comments])
  

  const grabComment = async () => { //grabbing all of the comments
    try{
      const docRef = doc(db,'post','postID')
      const comment = collection(docRef,'post-messages')
      const comment_message = doc(comment,'sPgBSFVL9frm0RLgoikW')
      const message_comment = collection(comment_message,'comment-message')
      const q = query(message_comment,orderBy('createdAt', 'desc'));
      const querySnapShot = await getDocs(q);
      let data = [];
      querySnapShot.forEach(doc => {
        data.push({ ...doc.data(),id:doc.id });
      })
      setComment([...data]);
    }  catch (e) {
    console.log(`Error: ${e}`);
  }
  }

  const handleSend = async () => { // will handle sending the comment to firebase

    try{
      const docRef = doc(db,'post','postID')
      const commentMessageRef = collection(docRef,'post-messages')
      const commentmessage = doc(commentMessageRef)
      const commentCollection = collection(commentmessage,'comment-message')
      const newDoc = await addDoc(commentCollection,{
        id:user?.userId,
        name:user?.username,
        content:text,
        createdAt: Timestamp.fromDate(new Date())
      })
      setText('')
    }catch(e){
      console.log(e)
    }
  
  }

const grabCurrentComment = async () => { /// grabbing the current comment 
  try{
    const docRef = doc(db, 'post','postID')
    const postmessageRef = collection(docRef, 'post-messages')
    const q = query(
      postmessageRef,
      or(
        where('id', '!=', user.userId),
        where('id', '==', user.userId)
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
        {comments.map((comment,index) => {
         
          return <Suspense key={index}  fallback={<ActivityIndicator size='small' color='#000'/>}>
                  <CommentComponent content={comment.text} name={comment.name}/>
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
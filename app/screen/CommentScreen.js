import React,{lazy,Suspense} from 'react'
import {View,Text,StyleSheet,FlatList,Platform,ScrollView, TextInput,TouchableOpacity, ActivityIndicator} from 'react-native'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Feather from 'react-native-vector-icons/Feather';
import CustomKeyboardView from '../components/CustomKeyboardView';


const CommentComponent = lazy(() => import('../components/CommentComponent'))
const comments = [
  { id: 1, text: "Great article! I learned a lot and can't wait to try this out. Thanks for sharing!" },
  { id: 2, text: "I disagree with a few points here, but overall it's a well-written piece. Thanks!" },
  { id: 3, text: "This is exactly what I was looking for. Appreciate the effort you put into explaining it." },
  { id: 4, text: "I think there’s an error in the code snippet in section 2. Anyone else notice this?" },
  { id: 5, text: "I have a question about a similar project I’m working on. Can anyone help?" },
  { id: 6, text: "Works as expected, but I think the instructions could be clearer. Otherwise, it’s great!" },
  { id: 7, text: "I had an issue with the setup, but customer service was quick to help. 5 stars!" },
  { id: 8, text: "Decent quality for the price, but not what I expected in terms of durability." },
  { id: 9, text: "I use this every day, and it's become essential for me. Highly recommend!" },
  { id: 10, text: "Could use a few improvements, but overall, a solid product!" },
  { id: 11, text: "OMG! This is amazing; can't believe how well it turned out!" },
  { id: 12, text: "Not sure I agree with this, but I respect your point of view." },
  { id: 13, text: "This post really resonated with me. Thank you for sharing your thoughts!" },
  { id: 14, text: "Any recommendations for something similar? I’d love to know!" },
  { id: 15, text: "Wow, I had no idea! Thanks for opening my eyes to this topic." }
];

const handleSend = () => {
  console.log('click')
}
const CommentScreen = () => {
  return (
    <CustomKeyboardView inChat={true}
    behavior={Platform.OS === "ios" ? "padding" : 'height'}
    style={styles.container}>
       <ScrollView>
        {comments.map((comment) => {
         
          return <Suspense key={comment.id}  fallback={<ActivityIndicator size='small' color='#000'/>}>
            <CommentComponent content={comment.text}/>
            </Suspense>
        })}
        </ScrollView>
       <View style={{marginBottom:hp(1.7), paddingTop:5}}>
       <View style={styles.inputContainer}>
        <View style={styles.messageInput}>
          <TextInput
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
    backgroundColor:'#fff',
    padding:40
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
})

export default CommentScreen
import { View, Text,StyleSheet,ScrollView} from 'react-native'
import MessageItem from './MessageItem'

const MessageList = ({messages,currentUser}) => {
  return (
    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{paddingTop:10}}>
      {
        messages.map((message,index) => {
          <MessageItem message={message} key={index} currentUser={currentUser}/>
        })
      }
    </ScrollView>
  )
}

const style = StyleSheet.create({
    
})

export default MessageList

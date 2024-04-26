import { View, Text,StyleSheet,ScrollView} from 'react-native'
import MessageItem from './MessageItem';

const MessageList = ({messages,currentUser}) => {
  return (
    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{paddingTop:70}}>
      {
        messages.map((message,index) => {
          return (
            <MessageItem message={message} key={index} currentUser={currentUser}/>
          )
          
        })
      }
    </ScrollView>
  )
}

export default MessageList





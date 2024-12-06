import {View,Text} from 'react-native'

const FollowComponent = ({content,count}) => {
  return (
    <View style={{flexDirection:'row', justifyContent:'space-around'}}>
                  <View style={{flexDirection:'column',alignItems:'center'}}>
                  <Text style={{color:'#fff',fontFamily:'Helvetica-light'}}>{count}</Text>
                  <Text style={{color:'#fff',fontFamily:'Helvetica-light'}}>{content}</Text>
                  <View style={{marginTop:5,borderWidth:1,borderColor:'#000',width:50,borderColor:'#00BF63'}}></View>
                  </View>
                  </View>
  )
}

export default FollowComponent
import {View,Text} from 'react-native'

const SmallButton = ({name}) => {
  return (

   
         <View style={{backgroundColor:'#00BF63', padding:10, borderRadius:100,width:100}}>
            <Text style={{textAlign:'center',fontFamily:'Helvetica-light',fontSize:15}}>{name}</Text></View>
   
    
  )
}

export default SmallButton
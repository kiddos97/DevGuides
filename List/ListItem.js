import React,{useState} from 'react'
import { View, StyleSheet, Image,Text, TouchableHighlight } from 'react-native'
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '../config/color';

const ListItem = ({item, title, subTitle, image, IconComponent,onPress, renderRightActions,renderLeftActions}) => {


    const [messages, setMessages] = useState('')



  useEffect(() => {
    setMessages(item.messages[item.messages -1]);
  },[])

  return (
    <GestureHandlerRootView> 
    <Swipeable renderLeftActions={renderLeftActions} renderRightActions={renderRightActions}> 
    <TouchableHighlight 
    underlayColor="grey"
    onPress={onPress}>
        <View style={styles.container}>
        <View style={styles.iconContainer}>
        {IconComponent}
        </View>
         {image && <Image style={styles.image} source={image} />}
         <View style={styles.detailsContainer}>
             <Text numberOfLines={1} style={styles.title}>{title}</Text>
             {messages?.text ? messages.text : "Tap to start messaging"}
             { subTitle && <Text  numberOfLines={2} style={styles.subTitle} >{subTitle}</Text>}
         </View>
         <MaterialCommunityIcons color={colors.medium} name="chevron-right" size={25}/>
        </View>
    </TouchableHighlight>
    </Swipeable>
    </GestureHandlerRootView>
   
    
 
  )
}

const styles = StyleSheet.create({
    container:{
        flexDirection:'row',
        padding: 15,
        alignItems:'center'
    },
    detailsContainer:{
        flex:1,
        marginLeft:10,
        justifyContent:'center'
    },
    iconContainer:{
        borderRadius:50,
    },
    image:{
        width:50,
        height: 50,
        borderRadius: 50,
        marginRight:10
    },
    title:{
        fontWeight: 500,
        marginBottom:5
        
    },
    subTitle:{
        color:'#6e6969'
    }
})

export default ListItem

import {
    MenuOption,
  } from 'react-native-popup-menu';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { View,Text,StyleSheet } from 'react-native'

export const MenuItems = ({text, action,value,icon}) => {
    return (
       
        
          <MenuOption onSelect={action}>
            <View style={{paddingLeft:4,paddingRight:4,flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
                <Text style={styles.text}>{text}</Text>
                <Text>{icon}</Text>
            </View>
          </MenuOption>
       
      
      
     
    )
}

const styles = StyleSheet.create({
  text:{
    fontWeight:'bold'
  }
})

import {
    MenuOption,
  } from 'react-native-popup-menu';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { View,Text } from 'react-native'

export const MenuItems = ({text, action,value,icon}) => {
    return (
       
        
          <MenuOption onSelect={() => action(value)}>
            <View style={{paddingLeft:4,paddingRight:4,flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
                <Text>{text}</Text>
                <Text>{icon}</Text>
            </View>
          </MenuOption>
       
      
      
     
    )
}


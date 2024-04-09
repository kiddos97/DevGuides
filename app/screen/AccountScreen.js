
import {View, Text, StyleSheet, TouchableWithoutFeedback} from 'react-native'
import color from '../../config/color';
import ListItem from '../../List/ListItem';
import person from '../assets/person.jpg'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
const AccountScreen = () => {

  const navigation = useNavigation();
  const handlePress = () => {
    //navigation.dispatch(DrawerActions.openDrawer())
    navigation.openDrawer();
  }
  return (
    <View style={styles.container}>
    <View>
      <View style={styles.header}> 
        <TouchableWithoutFeedback onPress={handlePress}>
            <MaterialCommunityIcons name="menu" color={color.white} size={30} />
          </TouchableWithoutFeedback>
          </View>
      <View style={styles.account}>
      <ListItem
         title='Emmanuel Imarhiagbe'
         subTitle="Osaroimarhiagbe@gmail.com"
         image={person}
      />
      </View>
      <View style={styles.space}></View>
      <View>
      <ListItem
      title='Isa Kuhn'
      image={person}/>
      </View>
      <View style={styles.container1}>
              <ListItem
               title='Log Out'
               IconComponent={<MaterialCommunityIcons name='logout' backgroundColor='#ffe66d' size={30}/>} 
               onPress={() => console.log('Logout')}
                />
                </View>
    </View>
    </View>
  )
}

const styles = StyleSheet.create({
  space:{
    heihgt:30
  },
    container:{
        padding:10,
        marginVertical:40,
       
    },
    container1:{
      backgroundColor:color.white,
      
      
  },
    header:{
      marginVertical:20,
      flexDirection:'row',
      marginBottom:20
    }
})
export default AccountScreen

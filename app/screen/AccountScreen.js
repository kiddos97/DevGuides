
import {View, Text, StyleSheet, TouchableWithoutFeedback, Alert, ActivityIndicator} from 'react-native'
import color from '../../config/color';
import ListItem from '../../List/ListItem';
import person from '../assets/person.jpg'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useState} from 'react';
const AccountScreen = () => {

  const [isLoading, setLoading] = useState(false)
  const navigation = useNavigation();
  const handlePress = () => {
    //navigation.dispatch(DrawerActions.openDrawer())
    navigation.openDrawer();
  }
  const handleLogout = async () => {
    setLoading(true)
    try{
      await AsyncStorage.removeItem('my-key')
      setTimeout(() => {
        setLoading(false); // Set loading to false after some time (simulating successful login)
        navigation.navigate('Login')
        Alert.alert('Success!','you have logged out!!')
    }, 2000);
   
    }catch(error){
      console.error(` Error failed: ${error}`)
    }

  }
  return (
    <View style={styles.screen}>
      <View>
      <View style={styles.container}>
        <TouchableWithoutFeedback onPress={handlePress}>
            <MaterialCommunityIcons name="menu" color={color.AppBackgroundColor} size={30} />
          </TouchableWithoutFeedback>
          <View style={styles.textcontainer}>
          <Text style={styles.text}>Account</Text>
          </View>
          </View>
      <View style={styles.account}>
      <ListItem
         title='Emmanuel Imarhiagbe'
         subTitle="Osaroimarhiagbe@gmail.com"
         image={person}
         onPress={() => console.log('Account Pressed')}
      />
      </View>
      <View style={styles.space}>
      </View>
      <View style={styles.container1}>
        {isLoading ?( 
        <ActivityIndicator size='large' color={color.AppBackgroundColor} />) :(
         <ListItem
         title='Log Out'
         IconComponent={<MaterialCommunityIcons name='logout' backgroundColor='#ffe66d' size={30}/>} 
         onPress={handleLogout}
                />)}
                </View>
      </View>
    </View>
   
  )
}

const styles = StyleSheet.create({
  account:{
    backgroundColor:color.white,
  },
  screen:{
    backgroundColor:color.light,
    flex:1
  },
  space:{
    height:30
  },
  container:{
    marginVertical:70,
    padding:10,
    flexDirection:'row',
    },
  container1:{
      backgroundColor:color.white,
       
  },
  text:{
    textAlign:'center',
    fontSize:30,
    fontWeight:'bold',
    color:color.AppBackgroundColor
  },
  textcontainer:{
    marginLeft:100,
  }
})
export default AccountScreen

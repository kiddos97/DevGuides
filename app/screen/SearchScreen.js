import React,{useState, useEffect} from 'react'
import {View, Text, SafeAreaView, StyleSheet,FlatList,Image, TouchableOpacity} from 'react-native';
import SearchComponent from '../components/SearchComponent';
import color from '../../config/color';
import person from '../assets/person.jpg'
import { userRef} from '../../FireBase/FireBaseConfig';
import { query } from 'firebase/firestore';

const SearchScreen = () => {

  const [searchQuery, setSearchQuery] = useState('')
  const [results, setResults] = useState([]);



  const handleSearch = async () => {
    if(searchQuery.trim() === '') return;
    try{
      const q = query(userRef,where('name','>=',searchQuery), where('name','<=',searchQuery + '\uf8ff'))
      const querySnapShot = await getDocs(q)
      let user = [];

      querySnapShot.forEach(doc => {
        user.push({...doc.data()})
      })
      setResults(user);

    }catch(error){
      console.error(`Cant find user: ${error}`)

    }

  }


  const skills = [ // this i will be coming from the database and can be updatred by the user
  { id:1,name:'Python',title:'Engineer'},
{id:2,name:'JavaScript',title:'Engineer'},
{id:3,name:'React Native',title:'Engineer'}
]
  return (
    <View style={styles.screen}>
        <View style={{padding:30, marginTop:40}}>
          <SearchComponent backgroundColor={color.grey} color={color.button} onPress={handleSearch}/>
        </View>
          <FlatList
          data={skills}
          keyExtractor={(item) => item.id}
          renderItem={({item}) =>
            <TouchableOpacity>
                <View style={{padding:10}}> 
              <View style={styles.userContainer}>
            <Image
            style={styles.image}
            source={person}/>
          <Text style={styles.text}>{item.name}</Text>
          <Text style={styles.text}>{item.title}</Text>
        </View>
        </View>
            </TouchableOpacity>
          
          }
          />
    </View>
  
  )
}

const styles = StyleSheet.create({
  screen:{
    flex:1,
    backgroundColor:color.white,
  },
  image:{
    width:50,
    height:50,
    borderRadius:100
  },
  userContainer:{
    padding:10,
    flexDirection:'row',
    backgroundColor:color.button,
    borderRadius:20

  },
  text:{
    marginLeft:10,
  }
})

export default SearchScreen

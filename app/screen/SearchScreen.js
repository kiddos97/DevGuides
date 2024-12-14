import React,{useState, useEffect} from 'react'
import {View, Text, SafeAreaView, StyleSheet,FlatList,Image, TouchableOpacity,ActivityIndicator} from 'react-native';
import SearchComponent from '../components/SearchComponent';
import color from '../../config/color';
import person from '../assets/person.jpg'
import { userRef} from '../../FireBase/FireBaseConfig';
import { getDocs,query,where } from "firebase/firestore"; 
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { addsearchID } from '../features/search/searchSlice';
import store from '../store';
import useDebounce from '../hooks/useDebounce';
const SearchScreen = () => {

  
  const [searchQuery, setSearchQuery] = useState('')
  const [results, setResults] = useState([]);
  const [loading,setLoading] = useState(false)
  const navigation = useNavigation();

  const debouncedsearch = useDebounce(searchQuery,8000)
  const dispatch = useDispatch()

  useEffect(() => {
    if (debouncedsearch) {
        setLoading(true);
        handleSearch(); // perform search here
    } else {
      setResults([]); // reset loading when search query is cleared
    }
}, [debouncedsearch]);


  const handleSearch = async () => {
    setLoading(true)
    if(searchQuery.trim() === '') return;
    try{
      const q = query(userRef,where('username','==',searchQuery))
      const querySnapShot = await getDocs(q)
      let user = [];
      querySnapShot.forEach(doc => {
        user.push({...doc.data(), id:doc.id})
        console.log('search id:',doc.id)
        dispatch(addsearchID({searchID:doc.id}))
      })
      setLoading(false)
      setResults(user);
      setSearchQuery('')
    }catch(error){
      console.error(`Cant find user: ${error}`)

    }

  }



  return (
    <View style={styles.screen}>
        <View style={{padding:30, marginTop:40}}>
          <SearchComponent 
          setSearchQuery={setSearchQuery}
          backgroundColor={color.grey}
          color='#00bf63'
          onPress={handleSearch}
          searchQuery={searchQuery}/>
        </View>
        {loading ? <ActivityIndicator size='small' color='#fff'/> :
               <FlatList
               data={results}
               keyExtractor={(item) => item.id}
               renderItem={({item}) =>
                 <TouchableOpacity onPress={() => navigation.navigate('Welcome',{screen:'SearchAccount',params:{userId:item.userId}})}>
                     <View style={{padding:10}}> 
                   <View style={styles.userContainer}>
                 <Image
                 style={styles.image}
                 source={person}/>
               <Text style={styles.text}>{item.username}</Text>
               {/* <Text style={styles.text}>{item.title}</Text> */}
             </View>
             </View>
                 </TouchableOpacity>
               
               }
               /> }
   
    </View>
  
  )
}

const styles = StyleSheet.create({
  screen:{
    flex:1,
    backgroundColor:color.backgroundcolor,
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

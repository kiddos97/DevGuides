import {View,Text,StyleSheet, TouchableOpacity,FlatList,ScrollView,Switch} from 'react-native'
import { useState } from 'react';
import ChatRoomHeader from '../components/ChatRoomHeader';
import color from '../../config/color';
import { useNavigation } from '@react-navigation/native';
import AppTextInput from '../components/AppTextInput';
import Button from '../components/Button';
import { useAuth } from '../authContext';
import { db} from '../../FireBase/FireBaseConfig';
import { updateDoc,doc} from 'firebase/firestore';
import { getAuth,updatePassword} from 'firebase/auth'
import { Image } from 'expo-image';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { blurhash } from '../../utils/index';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';



  const Sections = [
    {
        header: 'Settings',
        icon: 'settings',
        items:[
            {
                icon:'globe', 
                color:'orange',
                label:'Language', 
                type:'link'},
            {
                id:'darkMode',
                icon:'moon',
                color:'blue',
                label:'Dark Mode',
                type:'toggle'
            },
            {
                id:'Wifi',
                icon:'wifi',
                color:'blue',
                label:'Use Wifi',
                type:'toggle'
            },
            {icon:'navigation', color:'green',label:'Location', type:'link'},
            {
                id:'showusers',
                icon:'users',
                color:'green',
                label:'Show',
                type:'toggle'
            },
            {
                id:'accessmode',
                icon:'airplay',
                color:'#fd2d54',
                label:'Access',
                type:'toggle'
            }, 
        ],
    },
    {
        header:'Help',
        icon:'help-circle',
        items:[
            {icon:'flag', color:'grey',label:'Report Bug', type:'link'},
            {icon:'mail', color:'blue',label:'Contact us', type:'link'},]
    },
];
const sections = [
    {header:'About Me',
        id:1,
      items:[{
          id:1,
          icon:'person',
          name:'Isa Kuhn',
          type:'Username',
          screen:'EditUser',
          color:'#fff',
          nav:'keyboard-arrow-right'
      },
      {
          id:2,
          icon:'email',
          name:'isakuhn@gmail.com',
          type:'Email',
          screen:'EditEmail',
          color:'#fff',
          nav:'keyboard-arrow-right'
      },
      {
          id:3,
          icon:'phone',
          name:'734-431-8504',
          type:'Phone',
          screen:'EditPhone',
          color:'#fff',
          nav:'keyboard-arrow-right'
      },
      {
          id:4,
          icon:'work',
          name:'Front-End Developer',
          type:'Job title',
          screen:'EditJob',
          color:'#fff',
          nav:'keyboard-arrow-right'
      }
      
  ]
    }

  ]

  
const EditScreen = () => {

    const navigation = useNavigation();
    const {user} = useAuth()
    const currentuser = getAuth()


   
    
    const [form, setForm] = useState({
        darkMode:true,
        wifi:false,
        showCollaborators:true,
        accessibilityMode: false
    })
  
  

  return (
    <View style={styles.screen}>
        <ChatRoomHeader 
        onPress={()=>navigation.navigate('Profile',{user})} 
        backgroundColor={color.button}
        title='Edit Profile'
        icon='keyboard-backspace' 
        onPress2={() => navigation.navigate('Message')}
        />
        <ScrollView
        contentContainerStyle={{paddingBottom:30}}
        zoomScale={1.0}
        showsVerticalScrollIndicator
        alwaysBounceVertical
        >
        <View style={{padding:40}}>
        <View style={{flexDirection:'row'}}>
        <Image
            style={{height:hp(5), aspectRatio:1, borderRadius:100,}}
            source={user?.profileImage}
            placeholder={{blurhash}}
            transition={500}/>
        <View style={{marginLeft:40,marginTop:10}}>
        <Text style={{color:'#fff',fontSize:20}}>Isa Kuhn</Text>
        </View>
        </View>
        <View style={{marginTop:40}}>
            {sections.map(({header,items})=>( 
                <View>
                     <Text key={header} style={{color:'#fff',fontSize:20}}>
                  {header}
                        </Text>
                {items.map(({id,icon,nav,name,type,screen})=>(
                     <TouchableOpacity onPress={()=>navigation.navigate(screen)}>
                      <View key={icon} style={{ marginTop: 30, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                      <View style={{ backgroundColor: '#3b3b3b', borderRadius: 5, width: 30, padding: 5 }}>
                          <View style={{ alignItems: 'center' }}>
                          <MaterialIcons name={icon} size={15} color="#ffffff" />
                              </View>
                              </View>
                      <View style={{ paddingLeft: 10, flex: 1 }}>
                      <Text style={{ fontSize: 18,color:'#fff' }}>@{name}</Text>
                      <View style={{ marginTop: 3 }}>
                      <Text style={{ fontSize: 12,color:'#fff' }}>{type}</Text>
                      </View>
                      </View>
                      <View style={{ backgroundColor: '#3b3b3b', borderRadius: 5, width: 30, padding: 5 }}>
                      <View style={{ alignItems: 'center' }}>
                      <MaterialIcons name={nav} size={15} color="#ffffff"/>
                      </View>
                      </View>
                      </View>
                      </TouchableOpacity>
                ))}
                </View>
            ))}
            <View style={{marginTop:20}}>
            {Sections.map(({header, items}) => (
                <View key={header}>
                    <Text style={{color:'#fff',fontSize:20,marginBottom:10}}>{header}</Text>

                    {items.map(({id, icon,color, label, type}) => (
                        <TouchableOpacity
                            key={icon}
                            onPress={() => console.log('pressed',label)}>
                        <View style={styles.row}>
                            <View style={{ backgroundColor: '#3b3b3b', borderRadius: 5, width: 30, padding: 5 }}>
                                <View style={{ alignItems: 'center' }} >
                                <Feather name={icon} size={15} color='#fff'/>
                                </View>
                            </View>
                            <Text style={{ fontSize: 18,color:'#fff',paddingLeft:10 }}>{label}</Text>
                            <View style={{flex:1}}/>
                            {type === 'toggle' && 
                            <Switch value={form[id]}
                            onValueChange={value => setForm({...form,[id]: value})}/>}


                            {type === 'link' && 
                            <View style={{ backgroundColor: '#3b3b3b', borderRadius: 5, width: 30, padding: 5 }}>
                                <View style={{ alignItems: 'center' }}>
                                <Feather name='chevron-right' size={15} color='#fff'/>
                                </View>
                                 
                            </View>
                          }
                        </View>
                        </TouchableOpacity>
                    ))}
                </View>
            ))}
            </View>
         
 
        </View>
        </View>
        </ScrollView>
    </View>
  )
}


const styles = StyleSheet.create({

    screen:{
        flex:1,
        backgroundColor:color.backgroundcolor
    },
    row:{
        flexDirection:'row',
        height:50,
        justifyContent:'flex-start',
        alignItems:'center',
        marginBottom:12,
        borderRadius:8,

    },
})

export default EditScreen

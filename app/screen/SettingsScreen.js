import React from 'react'
import {View,Text,SafeAreaView, StyleSheet,ScrollView,TouchableOpacity,Platform,StatusBar } from 'react-native'
import { Image } from 'expo-image';
import { blurhash } from '../../utils/index';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { useAuth } from '../authContext';
import color from '../../config/color';
import Feather from 'react-native-vector-icons/Feather';

const Sections = [
    {
        header: 'Preference',
        icon: 'settings',
        items:[
            {icon:'globe', color:'orange',label:'Language', type:'link'},
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
    {
        header:'Content',
        icon:'align-center',
        items:[
            {icon:'save', color:'#000',label:'Saved', type:'link'},
            {icon:'download', color:'#000',label:'Downloads', type:'link'},

        ],
    },
];

const SettingsScreen = () => {
    const {user} = useAuth();
  return (
    
    <View style={styles.screen}>
        <ScrollView >
            <View>
                <View style={styles.profile}>
                <Image
                    style={{height:hp(10), aspectRatio:1, borderRadius:100}}
                    source={user?.profileImage}
                    placeholder={blurhash}
                    transition={500}/>
                </View>
                <Text style={styles.text}>{user?.username}</Text>
                <View style={{height:10}}/>
                <Text style={styles.text}>Software Engineer, Austin Tx</Text>
            </View>
            {Sections.map(({header, items}) => (
                <View style={styles.section} key={header}>
                    <Text style={styles.sectionHeader}>{header}</Text>

                    {items.map(({id, icon,color, label, type}) => (
                        <TouchableOpacity
                            key={icon}
                            onPress={() => console.log('pressed',label)}>
                        <View style={styles.row}>
                            <View style={[styles.rowIcon,{backgroundColor:color}]}>
                            <Feather name={icon} size={20} color='#fff'/>
                            </View>
                            <Text style={styles.sectiontext}>{label}</Text>
                        </View>
                        </TouchableOpacity>
                      

                    ))}
                </View>
            ))}
             </ScrollView>
    </View>
   
   

  
   
  )
}

const styles = StyleSheet.create({
    screen:{
        flex:1,
        paddingVertical:24,
        backgroundColor:color.white,
    },
    profile:{
      alignSelf:'center',
      justifyContent:'center',
      marginBottom:10
        
    },
    text:{
        textAlign:'center'
    },
    section:{
        paddingHorizontal:24,
    },
    sectionHeader:{
        paddingVertical:12,
        fontSize:12,
        fontWeight:'600',
        textTransform:'uppercase',
        letterSpacing:1.1
    },
    sectiontext:{
        fontSize:17,
    },
    row:{
        flexDirection:'row',
        backgroundColor:color.grey,
        height:50,
        justifyContent:'flex-start',
        alignItems:'center',
        marginBottom:12,
        borderRadius:8,
        paddingHorizontal:12

    },
    rowIcon:{
        borderRadius:100,
        width:32,
        height:32,
        alignItems:'center',
        justifyContent:'center',
        marginRight:12
    }
})

export default SettingsScreen

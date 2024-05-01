import React, {useState} from 'react';
import {Alert, Modal, StyleSheet, Text, Pressable, View} from 'react-native';
import AppTextInput from '../components/AppTextInput';
import color from '../../config/color';
import Button from './Button';


const NewMessageModal = ({modalVisible,setModalVisible, currentGroupName,setCurrentGroupName,onPress}) => {


  // const newGroupName = () => {
  //   console.log('Name2:',currentGroupName)
  
  //   setModalVisible(false);
  //   setCurrentGroupName('');
  // }
    

  return (
    <View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Enter username</Text>
            <AppTextInput
                    icon='account'
                    placeholder='username'
                    backgroundColor={color.light}
                    iconcolor={color.button}
                    onChangeText={(value) => setCurrentGroupName(value)}
                    value={currentGroupName}/>
            <View style={styles.buttonContainer}>
            <View style={styles.button}>
            <Button
            title='submit' 
            onPress={onPress}
            backgroundColor={color.button2}
            fontSize={12}
            borderColor={color.button2}
            />
            </View>
            <View style={styles.button}>
            <Button
            title='cancel'
            onPress={() => setModalVisible(false)}
            backgroundColor={color.button2}
            fontSize={12}
            borderColor={color.button2}/>
            </View>
            </View>
        </View>
       
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },

  modalView: {
    margin: 20,
    backgroundColor: color.white,
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 1,
    shadowRadius: 4.65,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonContainer:{
    flexDirection:'row'
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default NewMessageModal;
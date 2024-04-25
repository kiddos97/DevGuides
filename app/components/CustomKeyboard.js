import React from 'react'
import { KeyboardAvoidingView,ScrollView,Platform } from 'react-native'

const CustomKeyboard = ({children}) => {
    const ios = Platform.OS == 'ios'
  return (
   <KeyboardAvoidingView behavior={ios ? 'padding':'height'}
   style={{flex:1}}
   >
    <ScrollView
    style={{felx:1}}
    bounces={false}
    showsVerticalScrollIndicator={false}>
        {
            children
        }
    </ScrollView>
   </KeyboardAvoidingView>
  )
}

export default CustomKeyboard

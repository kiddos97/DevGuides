import React from 'react'
import { KeyboardAvoidingView, Platform, ScrollView } from 'react-native'

const CustomKeyboardView = ({children,inChat}) => {

    const ios = Platform.OS == 'ios'

    let kavConfig = {}
    let ScrollConfig = {}

    if(inChat){
        kavConfig = {keyboardVerticalOffset:90}
        ScrollConfig = {contentContainerStyle:{flex:1}}
    }
  return (
   <KeyboardAvoidingView
   behavior={ios ? 'padding':'height'}
    {...kavConfig}
   style={{flex:1}}
   >
    <ScrollView
    style={{flex:1}}
    {...ScrollConfig}
    bounces={false}
    showsVerticalScrollIndicator={false}
    >
        {children}

    </ScrollView>
   </KeyboardAvoidingView>
  )
}

export default CustomKeyboardView

import React,{ createContext, useEffect, useState} from 'react'
import { useContext } from 'react';
import { onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth, db,userRef } from '../FireBase/FireBaseConfig';
import { doc, getDoc, setDoc} from 'firebase/firestore';
import { signOut } from 'firebase/auth';
import { Alert} from 'react-native'
export const AuthContext = createContext();

export const AuthContextProvider = ({children}) => {

    const [user, setUser] = useState(null)
    const [isAuthenticated, setIsAuthenticated] = useState(undefined)

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (user) => {
            if(user){
                setIsAuthenticated(true)
                setUser(user)
                updateUserData(user.uid);
            }else{
                setIsAuthenticated(false);
                setUser(null)
            }
        
        })
        return unsub
    },[])

    const login = async (email,pasword) => {
        try{
            const response = await signInWithEmailAndPassword(auth, email,pasword)
            return {success:true}
        }catch(error){
            console.error(`${error}`)
        }
       

    }

    const logout = async () => {
        try{
            await signOut(auth);
            return {success:true,}
        }catch(error){
            return {success:false, message: error.message}

        }

    }
    const register = async (username,email,password) => {
        try{
            const response = await createUserWithEmailAndPassword(auth,email,password)
            await setDoc(doc(db,'users',response?.user?.uid),{
                username,
                password,
                userId: response?.user?.uid
            })
            return {success:true, data: response?.user}
        }catch(error){
            console.error(`${error}`)
            return {success:false, msg: error.message}
        }
        
    }
    const updateUserData = async (userId) => {
        const docRef = doc(db,'users',userId)
        const docSnap = await getDoc(docRef);


        if(docSnap.exists()){
           let data = docSnap.data()
           setUser({...user, username: data.username, userId:data.userId})
        }
    }

    return (
        <AuthContext.Provider value={{user,isAuthenticated,login,register,logout}} >
            {children}
        </AuthContext.Provider>
    )
}


export const useAuth = () => {
    const value = useContext(AuthContext);
    if(!value){
        throw new Error('must use Auth context')
    }
    return value
}




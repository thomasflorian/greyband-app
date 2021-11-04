import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, KeyboardAvoidingView, TextInput, TouchableOpacity } from 'react-native'
import { auth } from '../src/database/firebase-index'



const LoginScreen = ({navigation}) => {
    
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')


    // useEffect(() => {
    //     const unsubscribe = auth.onAuthStateChanged(user => {
    //         if (user) {
    //             navigation.replace('Home')
    //         }
    //     })
    //     return unsubscribe
    // }, [])
    


    const handleSignUp = () => {
        auth
            .createUserWithEmailAndPassword(email, password)
            .then(userCredentials => {
                const user = userCredentials.user;
                console.log("Registered with: ", user.email);
            })
            .catch( error=> alert (error.message))
    }

    const handleLogin = () => {
        auth
        .signInWithEmailAndPassword(email, password)
        .then(userCredentials => {
            const user = userCredentials.user;
            console.log("Logged in with: ", user.email);
        })
        .catch( error=> alert (error.message))
    }

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior="padding">

        <View style={styles.inputContainer}>
            <TextInput 
                placeholder="Email"
                value = {email}
                onChangeText={ text => setEmail(text) }
                stule={styles.input}
            />
            <TextInput 
                placeholder="Password"
                value = {password}
                onChangeText={ text => setPassword(text)}
                style={styles.input}
                secureTextEntry
            />
        </View>
        <View style={styles.buttonContainer}>
            <TouchableOpacity
                onPress={handleLogin}
                style={[styles.button, styles.buttonOutline]}
            >
                <Text style={styles.buttonOutlineText}>Login</Text>

            </TouchableOpacity>
            <TouchableOpacity
                onPress={handleSignUp}
                style={[styles.button, styles.buttonOutline]}
            >
                <Text style={styles.buttonOutlineText}>Register</Text>

            </TouchableOpacity>
        </View>

        </KeyboardAvoidingView>
    )
}

export default LoginScreen

const styles = StyleSheet.create({
    container : {
      justifyContent: 'center',
      alignItems : 'center',
      flex: 1,
    }
})

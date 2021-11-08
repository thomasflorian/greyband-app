import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, KeyboardAvoidingView, TextInput, TouchableOpacity } from 'react-native'
import { auth } from '../../src/database/firebase-index'
import { useTheme } from 'react-native-elements'



const LoginScreen = ({navigation}) => {
    
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')


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

        <View>
            <TextInput 
                placeholder="Email"
                value = {email}
                keyboardType='email-address'
                onChangeText={ text => setEmail(text) }
            />
            <TextInput 
                placeholder="Password"
                value = {password}
                onChangeText={ text => setPassword(text)}
                style={styles.input}
                secureTextEntry
            />
        </View>
        <View>
            <TouchableOpacity
                onPress={handleLogin}
            >
                <Text style={styles.buttonOutlineText}>Login</Text>

            </TouchableOpacity>
            
            <TouchableOpacity onPress={() => navigation.navigate("Intro")}>
                <Text>Register</Text>

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

import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, KeyboardAvoidingView, TextInput, TouchableOpacity } from 'react-native'
import { auth } from '../src/database/firebase-index'
import { useTheme } from '@react-navigation/native';



const LoginScreen = ({navigation}) => {
    
    const theme = useTheme()

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
        <KeyboardAvoidingView style={styles(theme).container} behavior="padding">
            <View style={styles(theme).headerContainer}>
                <Text style={styles(theme).header}>Sign In</Text>
            </View>
            <View style={styles(theme).inputContainer}>
                <Text style={styles(theme).label}>Email</Text>
                <TextInput placeholder="Enter your email" value={email} onChangeText={text => setEmail(text)} style={styles(theme).input} />
                <Text style={styles(theme).label}>Password</Text>
                <TextInput placeholder="Enter your password" value={password} onChangeText={text => setPassword(text)} style={styles(theme).input} secureTextEntry />
            </View>
            <View style={styles(theme).buttonContainer}>
                <TouchableOpacity onPress={handleLogin} style={[styles(theme).button, styles(theme).buttonOutline]} >
                    <Text style={styles(theme).buttonOutlineText}>Login</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleSignUp} style={[styles(theme).button, styles(theme).buttonOutline]} >
                    <Text style={styles(theme).buttonOutlineText}>Register</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    )
}

export default LoginScreen

const styles = theme => StyleSheet.create({
    container: {
        justifyContent: 'center',
        backgroundColor: theme.colors.background,
        alignItems: 'center',
        flex: 1,
    },
    headerContainer: { 
    },
    header: {
        fontFamily: theme.font.regular,
        color: theme.colors.primary,
        fontSize: 30,
    },
    inputContainer: {
        width: "100%",
        alignItems: "center"
    },
    input: {
        width: "90%",
        color: theme.colors.primary,
        marginVertical: 5,
        paddingVertical: 10,
        paddingHorizontal: 10,
        borderRadius: 10,
        borderColor: theme.colors.primary,
        borderWidth: 1,
        marginBottom: 20,
    },
    label: {
        alignSelf: "flex-start",
        marginLeft: "5%",
        color: theme.colors.primary,
    },
    buttonContainer: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-around"
    },
    button: {
        width: "40%",
        padding: 12,
    },
    buttonOutline: {
        borderRadius: 10,
        borderColor: theme.colors.primary,
        borderWidth: 1,
        marginBottom: 20,
    },
    buttonOutlineText: {
        color: theme.colors.primary,
        textAlign: "center"
    }
})

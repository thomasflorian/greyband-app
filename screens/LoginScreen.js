import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, KeyboardAvoidingView, TextInput, TouchableOpacity } from 'react-native'
import { auth } from '../src/database/firebase-index'
import { useTheme } from '@react-navigation/native';



function LoginScreen({ navigation }) {

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
            .catch(error => alert(error.message))
    }

    const handleLogin = () => {
        auth
            .signInWithEmailAndPassword(email, password)
            .then(userCredentials => {
                const user = userCredentials.user;
                console.log("Logged in with: ", user.email);
            })
            .catch(error => alert(error.message))
    }


    return (
        <KeyboardAvoidingView style={styles(theme).container} behavior="padding">
            <View style={{ flex: 1 }}>

            </View>
            <View style={styles(theme).headerContainer}>
                <Text style={styles(theme).header}>Sign In</Text>
            </View>
            <View style={styles(theme).inputContainer}>
                <Text style={styles(theme).label}>Email</Text>
                <TextInput placeholder="Enter your email" value={email} onChangeText={text => setEmail(text)} style={styles(theme).input} />
                <Text style={styles(theme).label}>Password</Text>
                <TextInput placeholder="Enter your password" value={password} onChangeText={text => setPassword(text)} style={styles(theme).input} secureTextEntry />
            </View>
            <View>
                <TouchableOpacity onPress={handleLogin} style={styles(theme).button} >
                    <Text style={styles(theme).buttonText}>Login</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate("Entry")}>
                    <Text style={{ color: theme.colors.text, fontSize: 12, fontFamily: theme.font.light, textAlign: "center" }}>{"Don't have a GreySun Account?\nGet Started!"}</Text>
                </TouchableOpacity>
            </View>
            <View style={{ flex: 3 }}>

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
    button: { 
        backgroundColor: theme.colors.primary, 
        paddingHorizontal: "25%", 
        paddingVertical: 10, 
        borderRadius: 5, 
        marginVertical: 8 
    },
    buttonText: {
        color: theme.colors.background,
        textAlign: "center"
    }
})

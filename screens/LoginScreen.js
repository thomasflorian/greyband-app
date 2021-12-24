import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, KeyboardAvoidingView, TextInput, TouchableOpacity, Keyboard, TouchableWithoutFeedback } from 'react-native'
import { auth } from '../src/database/firebase-index'
import { useTheme } from '@react-navigation/native';
import { Toast } from 'react-native-toast-message/lib/src/Toast';


function LoginScreen({ navigation }) {

    const theme = useTheme()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleLogin = () => {
        auth
            .signInWithEmailAndPassword(email, password)
            .then(userCredentials => {
                const user = userCredentials.user;
                console.log("Logged in with: ", user.email);
            })
            .catch(error => {
                if (error.code == "auth/invalid-email"){
                    Toast.show({ type: "error", position: "bottom", text1: "Invalid Email!" })
                } else if (error.code == "auth/wrong-password"){
                    Toast.show({ type: "error", position: "bottom", text1: "Incorrect Email or Password!" })
                } else if (error.code == "auth/too-many-requests"){
                    Toast.show({ type: "error", position: "bottom", text1: "Too Many Requests. Slow Down!" })
                } else if (error.code == "auth/user-disabled"){
                    Toast.show({ type: "error", position: "bottom", text1: "Account Disabled!" })
                } else if (error.code == "auth/user-not-found"){
                    Toast.show({ type: "error", position: "bottom", text1: "Email is not registered with an account!", text2: "Create an account instead?", onPress: () => navigation.navigate("Email") })
                } else {
                    Toast.show({ type: "error", position: "bottom", text1: error.code })
                }

            })
    }


    return (
        <TouchableWithoutFeedback TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <KeyboardAvoidingView style={styles(theme).container} behavior="padding">
                <View style={{ flex: 1, width: "100%", alignItems: "center", flexDirection: "row" }}>
                    <View style={{ flex: 1 }}>
                    </View>
                    <View style={{ flex: 6, alignItems: "center" }}>
                        <Text style={{ color: theme.colors.primary, fontFamily: theme.font.light, fontSize: 20 }}>Sign Into Greysun Account</Text>
                    </View>
                    <View style={{ flex: 1 }}>

                    </View>
                </View>
                <View style={{ flex: 4, width: "100%", alignItems: "center", justifyContent: "space-evenly" }}>
                    <Text style={{ color: theme.colors.text, fontSize: 20, fontFamily: theme.font.bold, margin: 10, marginTop: 20 }}>Email</Text>
                    <View style={{ width: "70%", borderColor: theme.colors.border, borderWidth: 1, borderRadius: 5, padding: 15 }}>
                        <TextInput placeholder="Enter your email" value={email} onChangeText={text => setEmail(text)} style={{ color: theme.colors.text }} />
                    </View>
                    <Text style={{ color: theme.colors.text, fontSize: 20, fontFamily: theme.font.bold, margin: 10, marginTop: 20 }}>Password</Text>
                    <View style={{ width: "70%", borderColor: theme.colors.border, borderWidth: 1, borderRadius: 5, padding: 15 }}>
                        <TextInput placeholder="Enter your password" value={password} onChangeText={text => setPassword(text)} style={{ color: theme.colors.text }} secureTextEntry />
                    </View>
                    <TouchableOpacity onPress={handleLogin} style={{ backgroundColor: theme.colors.primary, paddingHorizontal: 60, paddingVertical: 10, borderRadius: 5, marginTop: 40 }} >
                        <Text style={{ color: theme.colors.background, fontSize: 24, fontFamily: theme.font.light }}>Login</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate("Entry")}>
                        <Text style={{ color: theme.colors.text, fontSize: 12, fontFamily: theme.font.light, margin: 10, textAlign: "center" }}>{"Don't have a GreySun Account?\nGet Started!"}</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ flex: 2, width: "100%", alignItems: "center" }}>

                </View>
            </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
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
})

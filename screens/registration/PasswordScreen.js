import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, KeyboardAvoidingView, TextInput, TouchableOpacity, Keyboard, TouchableWithoutFeedback } from 'react-native'
import { useTheme } from '@react-navigation/native';
import { Icon } from 'react-native-elements/dist/icons/Icon';
import { auth, db } from '../../src/database/firebase-index'



function PasswordScreen({ navigation, route }) {

    const theme = useTheme();
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const handleSignUp = async () => {
        const { email, username } = route.params;

        if (password === confirmPassword) {
            await auth
                .createUserWithEmailAndPassword(email, password)
                .then(async (userCredentials) => {
                    const user = userCredentials.user;
                    await db.collection("users").doc(user.uid).set({ blows: [], username, accountCreated: new Date(), profile: {}, display: {}, favorites: [] })
                        .then(() => {
                            console.log("Success!");
                        })
                        .catch(() => {
                            console.log("Fail!");
                        })
                })
                .catch(error => alert(error.message))
        } else {
            console.log("Passwords do not match")
        }
    }

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <KeyboardAvoidingView style={styles(theme).container} behavior="padding">
                <View style={{ flex: 1, width: "100%", alignItems: "center", flexDirection: "row" }}>
                    <View style={{ flex: 1, alignItems: "flex-end" }}>
                        <TouchableOpacity onPress={() => navigation.pop()}><Icon name='arrow-back-ios' color={theme.colors.primary} size={30} /></TouchableOpacity>
                    </View>
                    <View style={{ flex: 6, alignItems: "center" }}>
                        <Text style={{ color: theme.colors.primary, fontFamily: theme.font.light, fontSize: 20 }}>Create a GreySun Account</Text>
                    </View>
                    <View style={{ flex: 1 }}>

                    </View>
                </View>
                <View style={{ flex: 4, width: "100%", alignItems: "center", justifyContent: "space-evenly" }}>
                    <Text style={{ color: theme.colors.text, fontSize: 20, fontFamily: theme.font.bold, margin: 10, marginTop: 20 }}>Password</Text>
                    <View style={{ width: "70%", borderColor: theme.colors.border, borderWidth: 1, borderRadius: 5, padding: 15 }}>
                        <TextInput style={{ color: theme.colors.text }} value={password} onChangeText={text => setPassword(text)} secureTextEntry />
                    </View>
                    <Text style={{ color: theme.colors.text, fontSize: 20, fontFamily: theme.font.bold, margin: 10, marginTop: 20 }}>Confirm Password</Text>
                    <View style={{ width: "70%", borderColor: theme.colors.border, borderWidth: 1, borderRadius: 5, padding: 15 }}>
                        <TextInput style={{ color: theme.colors.text }} value={confirmPassword} onChangeText={text => setConfirmPassword(text)} secureTextEntry />
                    </View>
                    <TouchableOpacity onPress={handleSignUp} style={{ backgroundColor: theme.colors.primary, paddingHorizontal: 60, paddingVertical: 10, borderRadius: 5, marginTop: 40 }}>
                        <Text style={{ color: theme.colors.background, fontSize: 24, fontFamily: theme.font.light }}>Next</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ flex: 2, width: "100%", alignItems: "center" }}>

                </View>
            </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
    )
}

export default PasswordScreen

const styles = theme => StyleSheet.create({
    container: {
        justifyContent: 'center',
        backgroundColor: theme.colors.background,
        alignItems: 'center',
        flex: 1,
    },

})

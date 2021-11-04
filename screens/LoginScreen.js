import React from 'react'
import { StyleSheet, Text, View, KeyboardAvoidingView, TextInput, TouchableOpacity } from 'react-native'

const LoginScreen = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
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
            <Text>Login Screen</Text>
        </View>
        <View style={styles.buttonContainer}>
            <TouchableOpacity
                onPress={() => {}}
                style={[styles.button, styles.buttonOutline]}
            >
                <Text style={styles.buttonOutlineText}>Login</Text>

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

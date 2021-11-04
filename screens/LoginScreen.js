import React from 'react'
import { StyleSheet, Text, View, KeyboardAvoidingView } from 'react-native'

const LoginScreen = () => {
    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior="padding">

        <View>
            <Text>Login Screen</Text>
        </View>

        </KeyboardAvoidingView>
    )
}

export default LoginScreen

const styles = StyleSheet.create({})

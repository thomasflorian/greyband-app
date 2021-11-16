import React, { useState } from 'react'
import { StyleSheet, Text, View, SafeAreaView, Dimensions, TouchableOpacity, Button, KeyboardAvoidingView, TextInput } from 'react-native'
import { useTheme } from '@react-navigation/native';
import { _ScrollView } from 'react-native';
import { db } from '../../src/database/firebase-index';


const WIDTH = Dimensions.get('window').width * .85


const IntroScreen = ( {navigation }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    // Get theme variables
    const theme = useTheme()

    
    const handleSignUp = () => {
        auth
            .createUserWithEmailAndPassword(email, password)
            .then(userCredentials => {
                const user = userCredentials.user;
                console.log("Registered with: ", user.email);
            })
            .catch( error=> alert (error.message))
        db
            .collection("users").doc("LA").set({
                name: "Los Angeles",
                state: "CA",
                country: "USA"
            })
            .then(() => {
                console.log("Document successfully written!");
            })
            .catch((error) => {
                console.error("Error writing document: ", error);
            });
    }
    
    

    return (  
        <SafeAreaView style={styles(theme).background}>
            <View style={styles(theme).top_buffer} />
            <KeyboardAvoidingView>
                <Text style={styles(theme).header_text} >Create Account</Text>

                <View style={styles(theme).input_container}>
                    <TextInput 
                        placeholder="Email"
                        placeholderTextColor={theme.colors.text}
                        value = {email}
                        keyboardType='email-address'
                        onChangeText={ text => setEmail(text) }
                        style={styles(theme).input}
                    />
                    <View style={styles(theme).input_buffer} />
                    <TextInput 
                        placeholder="Password"
                        placeholderTextColor={theme.colors.text}
                        value = {password}
                        secureTextEntry
                        onChangeText={ text => setPassword(text)}
                        style={styles(theme).input}
                        
                    />
                </View>
                
                <View style={styles(theme).bottom_of_screen}>
                    <View style={styles(theme).button_container }>
                        <Button 
                            onPress={handleSignUp}
                            color={theme.colors.background}
                            title="Get Started"
                        />
                    </View>
                    <TouchableOpacity onPress={() => {navigation.navigate('Intro')}}>
                        <Text style={styles(theme).sign_in_text}>Cancel</Text>
                    </TouchableOpacity>
                </View>

            </KeyboardAvoidingView>
            
        </SafeAreaView>
    )
}

export default IntroScreen




const styles = theme => (StyleSheet.create({
    background: {
        flex: 1,
        justifyContent: 'center', 
        alignItems: 'center',
    },
    header_text: {
        flex: .5,
        color: theme.colors.text,
        fontFamily: theme.font.bold,
        fontSize: 30,
        textAlign: 'center',
    },
    sign_in_text: {
        color: theme.colors.text,
        fontFamily: theme.font.light,
        fontSize: 12,
        textAlign: 'center',
        paddingTop: 5,
        

    },
    button_container: {
        backgroundColor: theme.colors.primary,
        justifyContent: 'center',
        borderRadius: 5,
        //width: "70%",
        //Todo: add shadows
    },
    input: {
        height: 30,
        padding: 5,
        borderWidth: 2,
        borderRadius: 5,
        borderColor: theme.colors.primary,
        color: theme.colors.text,
    },
    input_buffer: {
        padding: 5,
    },
    button_buffer: {
        padding: 10,
    },
    input_container: {
        padding: 10,
        flex: 1,
    },
    bottom_of_screen: {
        flex: 0.25,
    },
    top_buffer: {
        flex: 0.25
    }
}));
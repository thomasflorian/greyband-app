import React, { useState } from 'react'
import { StyleSheet, Text, View, SafeAreaView, Dimensions, TouchableOpacity, Button, KeyboardAvoidingView, TextInput, Alert } from 'react-native'
import { useTheme } from '@react-navigation/native';
import { _ScrollView } from 'react-native';
import { db, auth } from '../../src/database/firebase-index';
import ProfileFactory from '../../src/users/ProfileFactory';


const WIDTH = Dimensions.get('window').width * .85




const CreateAccountScreen = ( {route, navigation }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { profileFactory } = route.params;

    // Get theme variables
    const theme = useTheme()

    
    
    // const handleSignUp = () => {
    //     auth
    //         .createUserWithEmailAndPassword(email, password)
    //         .then(userCredentials => {
    //             const user = userCredentials.user;
    //             console.log("Registered with:", user.email);
    //         })
    //         .then(() => {
    //             const user = auth.currentUser;
    //             const uid = user.uid;
    //             db
    //                 .collection("pre_users").doc(uid).set({
    //                 })
    //                 .then(() => {
    //                     console.log("Document successfully written!");
    //                 })
    //                 .catch((error) => {
    //                     console.error("Error writing document", error);

    //                     user.delete().then(() => {
    //                         console.log("User deleted because of doc write error")
    //                         // User deleted.
    //                       }).catch((error) => {
    //                         console.log("Failed to delete user after doc write error")
    //                         // An error ocurred
    //                         // ...
    //                       });
    //                 });
    //         })
    //         .catch( error=> alert (error.message))
        
    // }

    const validateEmail = (emailString) => {
        const mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (emailString.match(mailFormat)) {
            return true;
        }
        return false;
    }

    const invalidEmailAlert = () =>
    Alert.alert(
      "Invalid Email",
      "Please input a valid email",
      [
        { text: "OK", onPress: () => console.log("OK Pressed") }
      ]
    );

    const validatePass = (password) => {
        return password.length >= 6;
    }

    const invalidPassAlert = () =>
    Alert.alert(
      "Invalid Password",
      "Password must be over 6 characters",
      [
        { text: "OK", onPress: () => console.log("OK Pressed") }
      ]
    );

    const startAccountCreation = (email, password) => {
        profileFactory.startProfileCreation();
        try {
            if(profileFactory.addEmail(email)){

            } else {
                Alert.alert("Username already in use")
            }
        } catch (error) {
            
        }
        
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
                            onPress={() => {
                                if(!validateEmail(email)){
                                    invalidEmailAlert();
                                } else if (!validatePass(password)) {
                                    invalidPassAlert();
                                } else {
                                    if(startAccountCreation(email, password))
                                    navigation.navigate("Legal", {
                                        email: email,
                                        password: password,
                                    })
                                }}}
                            color={theme.colors.background}
                            title="Continue"
                        />
                    </View>
                    <TouchableOpacity onPress={() => {navigation.navigate('Intro')}}>
                        <Text style={styles(theme).cancel_text}>Cancel</Text>
                    </TouchableOpacity>
                </View>

            </KeyboardAvoidingView>
            
        </SafeAreaView>
    )

    
}

export default CreateAccountScreen




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
    cancel_text: {
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
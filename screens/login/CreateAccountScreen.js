import React, { useState } from 'react'
import { StyleSheet, Text, View, SafeAreaView, Dimensions, TouchableOpacity, Button, KeyboardAvoidingView, TextInput, Alert } from 'react-native'
import { useTheme } from '@react-navigation/native';
import { _ScrollView } from 'react-native';
import Toast from 'react-native-toast-message';


const WIDTH = Dimensions.get('window').width * .85




const CreateAccountScreen = ( {route, navigation }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { profileFactory } = route.params;

    // Get theme variables
    const theme = useTheme()

    // const invalidEmailAlert = () =>
    // Alert.alert(
    //   "Invalid Email",
    //   "Please input a valid email",
    //   [
    //     { text: "OK", onPress: () => console.log("OK Pressed") }
    //   ]
    // );

    // const validatePass = (password) => {
    //     return password.length >= 6;
    // }

    // const invalidPassAlert = () =>
    // Alert.alert(
    //   "Invalid Password",
    //   "Password must be over 6 characters",
    //   [
    //     { text: "OK", onPress: () => console.log("OK Pressed") }
    //   ]
    // );

    const startAccountCreation = async () => {
        console.log("SAC:1")
        profileFactory.startProfileCreation();
        console.log("SAC:2")
        let addEmailToken = await profileFactory.addEmail(email)
        console.log("SAC:3")
        console.log(addEmailToken.passed.toString())
        if(!addEmailToken.passed){
            Toast.show({type: "error", position: "bottom", text1: addEmailToken.message})
            console.log("SAC:emailtoastShow")
        } else {
            console.log("SAC:noToast")
            let addPassToken = profileFactory.addPassword(password)
            console.log("SAC:passTokenSet")
            if(!addPassToken.passed){
                console.log("SAC:passError")
                Toast.show({type: "error", position: "bottom", text1: addPassToken.message})
                console.log("SAC:passToastShow")
            } else {
                return true;
            }
        }
        return false;
        
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
                                if(startAccountCreation()){
                                    navigation.navigate('Name', {profileFactory: {profileFactory}})
                                }
                            }}
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
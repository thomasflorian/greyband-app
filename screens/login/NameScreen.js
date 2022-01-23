import React, { useState } from 'react'
import { StyleSheet, Text, View, SafeAreaView, Dimensions, TouchableOpacity, Button, KeyboardAvoidingView, TextInput, Alert } from 'react-native'
import { useTheme } from '@react-navigation/native';
import { _ScrollView } from 'react-native';
import Toast from 'react-native-toast-message';


const WIDTH = Dimensions.get('window').width * .85




const NameScreen = ( {route, navigation }) => {
    const { profileFactory } = route.params;
    const [firstName, setFirstName] = new State('');
    const [lastName, setLastName] = new State('');

    // Get theme variables
    const theme = useTheme()

 
    

    return (  
        <SafeAreaView style={styles(theme).background}>
            <View style={styles(theme).top_buffer} />
            <KeyboardAvoidingView>
                <Text style={styles(theme).header_text} >Basic User Info</Text>

                <View style={styles(theme).input_container}>
                    <TextInput 
                        placeholder="First name"
                        placeholderTextColor={theme.colors.text}
                        value = {email}
                        keyboardType='email-address'
                        onChangeText={ text => setFirstName(text) }
                        style={styles(theme).input}
                    />
                    <View style={styles(theme).input_buffer} />
                    <TextInput 
                        placeholder="Last name"
                        placeholderTextColor={theme.colors.text}
                        value = {password}
                        secureTextEntry
                        onChangeText={ text => setLastName(text)}
                        style={styles(theme).input}
                        
                    />
                </View>
                
                <View style={styles(theme).bottom_of_screen}>
                    <View style={styles(theme).button_container }>
                        <Button 
                            onPress={() => {
                                if(startAccountCreation()){
                                    
                                }
                            }}
                            color={theme.colors.background}
                            title="Continue"
                        />
                    </View>
                    <TouchableOpacity onPress={() => {navigation.navigate('CreateAccount', {profileFactory: {profileFactory}})}}>
                        <Text style={styles(theme).cancel_text}>Back</Text>
                    </TouchableOpacity>
                </View>

            </KeyboardAvoidingView>
            
        </SafeAreaView>
    )

    
}

export default NameScreen




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
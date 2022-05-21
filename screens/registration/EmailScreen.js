import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, KeyboardAvoidingView, TextInput, TouchableOpacity, Keyboard, TouchableWithoutFeedback } from 'react-native'
import { useTheme } from '@react-navigation/native';
import { Icon } from 'react-native-elements/dist/icons/Icon';
import { validate } from 'validate.js';
import { checkEmailExists } from '../../src/database/firebase-index'
import Toast from 'react-native-toast-message';




function EmailScreen({ navigation, route }) {

    const theme = useTheme();
    const [email, setEmail] = useState('');
    const [confirmEmail, setConfirmEmail] = useState('');

    const handleSubmit = async () => {
        // check if emails match
        if (email.toLowerCase() === confirmEmail.toLowerCase()) {
            const error = validate({ email }, { email: { email: true, presence: { allowEmpty: false, message: "^Please enter an email address" } } })
            // check if email is valid
            if (!error) {
                // check if email exists
                const emailCheck = await checkEmailExists(email);
                if (emailCheck === "doesn't exist") {
                    navigation.navigate("Username", {email, ...route.params});
                } else if (emailCheck === "exists") {
                    Toast.show({type: "error", position: "bottom", text1: "Email already exists!"})
                } else if (emailCheck === "slow down") {
                    Toast.show({type: "error", position: "bottom", text1: "Too many Requests. Slow down!"})
                } else {
                    console.log(emailCheck)
                }
            } else {
                Toast.show({type: "error", position: "bottom", text1: "Email is not valid!"})
            }
        } else {
            Toast.show({type: "error", position: "bottom", text1: "Emails do not match!"})
        }
    };

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <KeyboardAvoidingView style={styles(theme).container} behavior="padding">
                <View style={{ flex: 1, width: "100%", alignItems: "center", flexDirection: "row" }}>
                    <View style={{ flex: 1, alignItems: "flex-end" }}>
                        <TouchableOpacity onPress={() => navigation.pop()}><Icon name='arrow-back-ios' color={theme.colors.primary} size={30} /></TouchableOpacity>
                    </View>
                    <View style={{ flex: 6, alignItems: "center" }}>
                        <Text style={{ color: theme.colors.primary, fontFamily: theme.font.light, fontSize: theme.fontsize.small }}>Create a GreySun Account</Text>
                    </View>
                    <View style={{ flex: 1 }}>

                    </View>
                </View>
                <View style={{ flex: 4, width: "100%", alignItems: "center", justifyContent: "space-evenly" }}>
                    <Text style={{ color: theme.colors.text, fontSize: theme.fontsize.small, fontFamily: theme.font.bold, margin: theme.spacing.small, marginTop: theme.spacing.smallplus }}>Email</Text>
                    <View style={{ width: "70%", borderColor: theme.colors.border, borderWidth: 1, borderRadius: 5, padding: theme.spacing.smallplus }}>
                        <TextInput style={{ color: theme.colors.text }} value={email} onChangeText={text => setEmail(text)} />
                    </View>
                    <Text style={{ color: theme.colors.text, fontSize: theme.fontsize.small, fontFamily: theme.font.bold, margin: theme.spacing.small, marginTop: theme.spacing.smallplus }}>Confirm Email</Text>
                    <View style={{ width: "70%", borderColor: theme.colors.border, borderWidth: 1, borderRadius: 5, padding: theme.spacing.smallplus }}>
                        <TextInput style={{ color: theme.colors.text }} value={confirmEmail} onChangeText={text => setConfirmEmail(text)} />
                    </View>
                    <TouchableOpacity onPress={handleSubmit} style={{ backgroundColor: theme.colors.primary, paddingHorizontal: theme.spacing.xlarge, paddingVertical: theme.spacing.small, borderRadius: 5, marginTop: theme.spacing.large  }}>
                        <Text style={{ color: theme.colors.background, fontSize: theme.fontsize.medium, fontFamily: theme.font.light }}>Next</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ flex: 4  , width: "100%", alignItems: "center" }}>

                </View>
            </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
    )
}

export default EmailScreen

const styles = theme => StyleSheet.create({
    container: {
        justifyContent: 'center',
        backgroundColor: theme.colors.background,
        alignItems: 'center',
        flex: 1,
    },

})

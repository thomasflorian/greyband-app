import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, KeyboardAvoidingView, TextInput, TouchableOpacity, Keyboard, TouchableWithoutFeedback } from 'react-native'
import { useTheme } from '@react-navigation/native';
import { Icon } from 'react-native-elements/dist/icons/Icon';
import Toast from 'react-native-toast-message';



function UsernameScreen({ navigation, route }) {

    const theme = useTheme();
    const [username, setUsername] = useState('');

    const handleSubmit = () => {
        // Add username checks (no special characters, doesn't start with a number, no consecutive decimal points, etc.)
        if (username.length >= 6) {
            navigation.navigate("Password", { username, ...route.params });
        } else {
            Toast.show({ type: "error", position: "bottom", text1: "Username must be at least 6 characters long!" })
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
                        <Text style={{ color: theme.colors.primary, fontFamily: theme.font.light, fontSize: theme.fontsize.medium }}>Create a GreySun Account</Text>
                    </View>
                    <View style={{ flex: 1 }}>

                    </View>
                </View>
                <View style={{ flex: 4, width: "100%", alignItems: "center", justifyContent: "space-evenly" }}>
                    <Text style={{ color: theme.colors.text, fontSize: theme.fontsize.small, fontFamily: theme.font.bold, margin: theme.spacing.small, marginTop: theme.spacing.smallplus }}>Username</Text>
                    <View style={{ width: "70%", borderColor: theme.colors.border, borderWidth: 1, borderRadius: 5, padding: theme.spacing.smallplus }}>
                        <TextInput style={{ color: theme.colors.text }} value={username} onChangeText={text => setUsername(text)} />
                    </View>
                    <TouchableOpacity onPress={handleSubmit} style={{ backgroundColor: theme.colors.primary, paddingHorizontal: theme.spacing.xlarge, paddingVertical: theme.spacing.small, borderRadius: 5, marginTop: theme.spacing.large }}>
                        <Text style={{ color: theme.colors.background, fontSize: theme.fontsize.medium, fontFamily: theme.font.light }}>Next</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ flex: 6, width: "100%", alignItems: "center" }}>

                </View>
            </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
    )
}

export default UsernameScreen

const styles = theme => StyleSheet.create({
    container: {
        justifyContent: 'center',
        backgroundColor: theme.colors.background,
        alignItems: 'center',
        flex: 1,
    },

})

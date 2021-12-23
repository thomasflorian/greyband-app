import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, KeyboardAvoidingView, TextInput, TouchableOpacity, Image, ImageBackground } from 'react-native'
import { useTheme } from '@react-navigation/native';



function EntryScreen({ navigation }) {

    const theme = useTheme();
    return (
        <KeyboardAvoidingView style={styles(theme).container} behavior="padding">
            <View style={{ flex: 1, width: "100%" }}>

            </View>
            <View style={{ flex: 3, width: "100%", alignItems: "center" }}>
                <Image style={{ width: "80%", resizeMode: "contain" }} source={require("../assets/images/logo.png")} />
                <Text style={{ color: theme.colors.text, fontSize: 24, fontFamily: theme.font.light, top: -50 }}>GreyBand</Text>
                <Text style={{ color: theme.colors.text, fontSize: 30, fontFamily: theme.font.light, textAlign: "center" }}>{"For Nights\nWorth Remembering"}</Text>
            </View>
            <View style={{ flex: 1, width: "100%", alignItems: "center" }}>
                <TouchableOpacity onPress={() => navigation.navigate("Email")} style={{ backgroundColor: theme.colors.primary, paddingHorizontal: 60, paddingVertical: 10, borderRadius: 5, margin: 8 }}>
                    <Text style={{ color: theme.colors.background, fontSize: 24, fontFamily: theme.font.light }}>Get Started</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                    <Text style={{ color: theme.colors.text, fontSize: 12, fontFamily: theme.font.light, textAlign: "center" }}>{"Already have a GreySun Account?\nSign in!"}</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    )
}

export default EntryScreen

const styles = theme => StyleSheet.create({
    container: {
        justifyContent: 'center',
        backgroundColor: theme.colors.background,
        alignItems: 'center',
        flex: 1,
    },

})

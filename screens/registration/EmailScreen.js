import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, KeyboardAvoidingView, TextInput, TouchableOpacity, Image, ImageBackground } from 'react-native'
import { useTheme } from '@react-navigation/native';



function EmailScreen({ navigation }) {

    const theme = useTheme();
    return (
        <KeyboardAvoidingView style={styles(theme).container} behavior="padding">
            <View style={{ flex: 2, width: "100%", alignItems: "center", justifyContent: "space-evenly", marginTop: 20 }}>
                <Text style={{color: theme.colors.text, fontSize: 20, fontFamily: theme.font.bold, marginTop: 20}}>Email</Text>
                <View style={{width: "70%", borderColor: theme.colors.border, borderWidth: 1, borderRadius:5, padding: 15}}>
                    <TextInput style={{color: theme.colors.text}}/>
                </View>
                <Text style={{color: theme.colors.text, fontSize: 20, fontFamily: theme.font.bold, marginTop: 20}}>Confirm Email</Text>
                <View style={{width: "70%", borderColor: theme.colors.border, borderWidth: 1, borderRadius:5, padding: 15}}>
                    <TextInput style={{color: theme.colors.text}}/>
                </View>
            </View>
            <View style={{ flex: 2, width: "100%", alignItems: "center", justifyContent: "center" }}>
                <TouchableOpacity onPress={() => navigation.navigate("Username")} style={{ backgroundColor: theme.colors.primary, paddingHorizontal: 60, paddingVertical: 10, borderRadius: 5, margin: 8 }}>
                    <Text style={{ color: theme.colors.background, fontSize: 24, fontFamily: theme.font.light }}>Next</Text>
                </TouchableOpacity>
            </View>
            <View style={{ flex: 1, width: "100%", alignItems: "center" }}>

            </View>
        </KeyboardAvoidingView>
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

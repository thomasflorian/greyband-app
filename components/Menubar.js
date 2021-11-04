import React, { useState, useEffect } from 'react';
//import { useNavigation } from '@react-navigation/core';
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { Icon } from 'react-native-elements'
import { auth } from '../src/database/firebase-index';


export default function Menubar() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // Get theme variables
    const theme = useTheme();

    useEffect(() => {
        auth.onAuthStateChanged(user => {
            if (user) {
                //user is logged in
                setIsLoggedIn(true)
            } else {
                //user is logged out
                setIsLoggedIn(false)
            }
        })
    })

    const handleSignOut = () => {
        auth
            .signOut()
            .then(() => {
                setIsLoggedIn(false)
            })
            .catch(error => alert(error.message))
    }

    if (isLoggedIn){
        return (
            <View style={styles(theme).container}>
                <Text style={styles(theme).text}>GreyBand</Text>
                <Icon name='menu' color={theme.colors.primary} size={30} 
                onPress={handleSignOut}/>
            </View>
        );
    }
    console.log("loggedout");
    return (null);
    
}       

const styles = theme => StyleSheet.create({
    container: {
        height: 50,
        width: '100%',
        top: 0,
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 10,
        backgroundColor: theme.colors.background,
        borderBottomColor: theme.colors.border,
        borderBottomWidth: 1
    },
    text: {
        color: theme.colors.text,
        fontFamily: "Montserrat_400Regular",
        fontSize: 22
    }
});

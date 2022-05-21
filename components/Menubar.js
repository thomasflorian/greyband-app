import React from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { Icon } from 'react-native-elements'
import { auth } from '../src/database/firebase-index';


export default function Menubar() {

    // Get theme variables
    const theme = useTheme();

    const handleSignOut = () => {
        auth
            .signOut()
            .catch(error => alert(error.message))
    }

    return (
        <View style={styles(theme).container}>
            <Text style={styles(theme).text}>GreyBand</Text>
            <Icon name='menu' color={theme.colors.primary} size={30} 
            onPress={handleSignOut}/>
        </View>
    );    
}       

const styles = theme => StyleSheet.create({
    container: {
        width: '100%',
        top: 0,
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: theme.spacing.small,
        backgroundColor: theme.colors.background,
        borderBottomColor: theme.colors.border,
        borderBottomWidth: 1
    },
    text: {
        color: theme.colors.text,
        fontFamily: "Montserrat_400Regular",
        fontSize: theme.fontsize.medium,
    }
});

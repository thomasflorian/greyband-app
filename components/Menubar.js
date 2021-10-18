import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { Icon } from 'react-native-elements'


export default function Menubar() {

    // Get theme variables
    const theme = useTheme();

    return (
        <View style={styles(theme).container}>
            <Text style={styles(theme).text}>GreyBand</Text>
            <Icon name='menu' color={theme.colors.primary} size={30} />
        </View>
    );
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

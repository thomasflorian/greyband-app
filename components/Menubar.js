import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { useFonts, Montserrat_400Regular } from '@expo-google-fonts/montserrat';
import AppLoading from 'expo-app-loading';
import { Icon } from 'react-native-elements'


export default function Menubar() {

    let [fontsLoaded] = useFonts({
        Montserrat_400Regular,
    });

    return (
        <View style={styles.container}>
            <Text style={styles.text}>GreyBand</Text>
            <Icon name='menu' color='#D64F27' size={30} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        height: 50,
        width: '100%',
        top: 0,
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 10,
        backgroundColor: '#0F2138',
        borderBottomColor: "#D64F27",
        borderBottomWidth: 1
    },
    text: {
        color: "#D64F27",
        // fontFamily: "Montserrat_400Regular",
        fontSize: 22
    }
});

import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { useFonts, Montserrat_400Regular } from '@expo-google-fonts/montserrat';
import { Icon } from 'react-native-elements'


export default function Menubar() {

    let [fontsLoaded] = useFonts({
        Montserrat_400Regular,
    });

    return (
        <View style={styles.container}>
            <Text style={styles.text}>GreyBand</Text>
            <Icon
                name='menu'
                color='#D64F27'
                size={30}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        height: '50px',
        width: '100%',
        position: 'absolute',
        top: '0px',
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: "10px",
        backgroundColor: '#0F2138',
        borderBottomColor: "#D64F27",
        borderBottomWidth: 1
    },
    text: {
        color: "#D64F27",
        fontFamily: "Montserrat_400Regular",
        fontSize: "1.4rem"
    }
});

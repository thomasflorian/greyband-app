// Import Dependencies 
import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Image, TouchableOpacity, Touchable, FlatList } from 'react-native';
import { useFonts, Montserrat_400Regular, Montserrat_500Medium, Montserrat_700Bold } from '@expo-google-fonts/montserrat';
import AppLoading from 'expo-app-loading';
import { Icon } from 'react-native-elements';

// Import Components
import Toolbar from '../components/Toolbar';


export default function CreatePartyScreen({ navigation }) {

    // Load Montserrat font
    let [fontsLoaded] = useFonts({
        Montserrat_500Medium,
        Montserrat_400Regular,
        Montserrat_700Bold
    });

    return (
        <View style={styles.container}>
            <View style={styles.box}>
                <View style={{ width: "100%", flex: 3 }}>
                    <View style={{ flexDirection: "row", alignItems: "center", marginHorizontal: 20, marginVertical: 10 }}>
                        <TouchableOpacity style={{ flex: 1 }} onPress={() => navigation.navigate("Party")}><Icon name='arrow-back-ios' color='#D64F27' size={30} /></TouchableOpacity>
                        <Text style={{ color: '#D64F27', fontSize: 24, fontWeight: "700", flex: 4, textAlign: "center" }}>Create a Party</Text>
                        <View style={{ flex: 1 }}></View>
                    </View>
                </View>
                <TextInput placeholder="Cade's Party" style={{ ...styles.box, flex:2, width:"70%", alignSelf:"center", color:'#D64F27', paddingHorizontal: 10, textAlign: "center" }}>

                </TextInput>
                <View style={{ flex: 33 }}>

                </View>

            </View>
            <Toolbar navigation={navigation} />
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        width: "100%",
        flex: 1,
        backgroundColor: '#0F2138',
        alignItems: 'center',
    },
    box: {
        width: "90%",
        flex: 1,
        borderColor: '#D64F27',
        borderWidth: 1,
        marginVertical: 10,
        borderRadius: 10,
    },
});


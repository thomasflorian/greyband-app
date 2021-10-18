// Import Dependencies 
import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { useTheme } from '@react-navigation/native';

import { Icon } from 'react-native-elements';

// Import Components
import Toolbar from '../components/Toolbar';


export default function CreatePartyScreen({ navigation }) {

    // Get theme variables
    const theme = useTheme();

    return (
        <View style={styles(theme).container}>
            <View style={styles(theme).box}>
                <View style={{ width: "100%", flex: 3 }}>
                    <View style={{ flexDirection: "row", alignItems: "center", marginHorizontal: 20, marginVertical: 10 }}>
                        <TouchableOpacity style={{ flex: 1 }} onPress={() => navigation.navigate("Party")}><Icon name='arrow-back-ios' color={theme.colors.primary} size={30} /></TouchableOpacity>
                        <Text style={{ color: theme.colors.text, fontSize: 24, fontFamily: theme.font.light, flex: 4, textAlign: "center" }}>Create a Party</Text>
                        <View style={{ flex: 1 }}></View>
                    </View>
                </View>
                <TextInput placeholder="Cade's Party" placeholderTextColor={theme.colors.text} style={{ ...styles(theme).box, ...styles(theme).textInput, flex: 2, width: "70%", alignSelf: "center", textAlign: "center" }} />
                <Text style={styles(theme).caption}>Description</ Text>
                <TextInput placeholder="Be Safe, Have Fun" placeholderTextColor={theme.colors.text} style={{...styles(theme).box, ...styles(theme).textInput, flex: 5}} multiline={true}/>
                
                <View style={{ flex: 25 }}>

                </View>

            </View>
            <Toolbar navigation={navigation} />
        </View>
    );
}


const styles = theme => StyleSheet.create({
    container: {
        width: "100%",
        flex: 1,
        backgroundColor: theme.colors.background,
        alignItems: 'center',
    },
    box: {
        width: "90%",
        alignSelf: "center",
        flex: 1,
        borderColor: theme.colors.border,
        borderWidth: 1,
        marginVertical: 10,
        borderRadius: 10,
    },
    caption: {
        color: theme.colors.text,
        fontFamily: theme.font.bold,
        fontSize: 20,
        marginLeft: "5%"
    },
    textInput: {
        fontFamily: theme.font.regular, 
        color: theme.colors.text, 
        paddingHorizontal: 10
    }
});


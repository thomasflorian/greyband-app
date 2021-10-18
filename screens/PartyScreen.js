// Import Dependencies 
import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { Icon } from 'react-native-elements'

// Import Components
import Toolbar from '../components/Toolbar';


export default function PartyScreen({ navigation }) {

    // Get theme variables
    const theme = useTheme();

    // Track search query hook
    /* TODO: In order to be able to search through all users, this query 
     will likely have to be sent to firebase and computation will have to be
     done in cloud function. Or SQL query? Figure out how to do this. */
    const [query, setQuery] = useState("");

    return (
        <View style={styles(theme).container}>
            {/* Search Bar */}
            <View style={styles(theme).searchcontainer}>
                <Icon style={styles(theme).icon} name='search' color='#0F2138' size={30} />
                <TextInput style={styles(theme).searchbar} onChangeText={(newQuery) => setQuery(newQuery)} />
            </View>
            <View style={styles(theme).textcontainer}>
                <Text style={styles(theme).text}>Active Parties: {0}</Text>
                <Text style={styles(theme).text}>Available Parties: {3}</Text>
            </View>
            <TouchableOpacity onPress={() => navigation.navigate("CreateParty")} style={styles(theme).button}>
                <Text style={styles(theme).buttontext}>Create Party</Text>
            </TouchableOpacity>
            <Toolbar navigation={navigation} />
        </View>
    );
}


const styles = theme => StyleSheet.create({
    container: {
        paddingTop: 30,
        width: "100%",
        flex: 1,
        backgroundColor: theme.colors.background,
        alignItems: 'center',
    },
    searchbar: {
        height: "100%",
        flex: 1,
        paddingVertical: 10,
        paddingHorizontal: 8,
        backgroundColor: theme.colors.background,
        borderBottomRightRadius: 10,
        borderTopRightRadius: 10,
        color: theme.colors.text,
        fontFamily: theme.font.regular,
    },
    searchcontainer: {
        backgroundColor: theme.colors.border,
        width: "90%",
        marginHorizontal: 1,
        flexDirection: 'row',
        alignItems: "center",
        borderWidth: 1,
        borderRightWidth: 2,
        borderColor: theme.colors.border,
        borderRadius: 10,
        // boxShadow: "0px 2px 4px #D64F27",
    },
    icon: {
        paddingHorizontal: 6
    },
    textcontainer: {
        flex: 1,
        marginTop: 10,
        width: "90%",
        alignItems: "flex-start"
    },
    text: {
        paddingTop: 5,
        color: theme.colors.text,
        fontSize: 20,
        fontFamily: theme.font.light
    },
    button: {
        width: "50%",
        maxWidth: 200,
        height: 40,
        backgroundColor: theme.colors.primary,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
        marginVertical: 20
    }, 
    buttontext: {
        color: theme.colors.background,
        fontFamily: theme.font.bold,
    }
});


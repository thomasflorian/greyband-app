// Import Dependencies 
import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity} from 'react-native';
import { useFonts, Montserrat_400Regular, Montserrat_500Medium } from '@expo-google-fonts/montserrat';
import { Icon } from 'react-native-elements'

// Import Components
import Toolbar from '../components/Toolbar';


export default function PartyScreen({ navigation }) {

    // Hooks 
    // track search query
    const [query, setQuery] = useState("");

    // Load Montserrat font
    let [fontsLoaded] = useFonts({
        Montserrat_500Medium,
        Montserrat_400Regular,
    });

    return (
        <View style={styles.container}>
            {/* Search Bar */}
            <View style={styles.searchcontainer}>
                <Icon style={styles.icon} name='search' color='#0F2138' size={30} />
                <TextInput style={styles.searchbar} onChangeText={(newQuery) => setQuery(newQuery)} />
            </View>
            <View style={styles.textcontainer}>
                <Text style={styles.text}>Active Parties: {0}</Text>
                <Text style={styles.text}>Available Parties: {3}</Text>
            </View>
            <TouchableOpacity  onPress={() => navigation.navigate("CreateParty")} style={{width: "50%", maxWidth: 200, height: 40, backgroundColor:'#D64F27', borderRadius: 10, alignItems: "center", justifyContent: "center", marginVertical: 20}}>
                <Text style={{color: '#0F2138', fontWeight: "bold"}}>Create Party</Text>
            </TouchableOpacity>
            <Toolbar navigation={navigation} />
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        paddingTop: 30,
        width: "100%",
        flex: 1,
        backgroundColor: '#0F2138',
        alignItems: 'center',
    },
    searchbar: {
        height: "100%",
        flex: 1,
        paddingVertical: 10,
        paddingHorizontal: 8,
        backgroundColor: '#0F2138',
        borderBottomRightRadius: 10,
        borderTopRightRadius: 10,
        color: '#D64F27',
        // fontFamily: 'Montserrat_500Medium',
    },
    searchcontainer: {
        backgroundColor: "#D64F27",
        width: "90%",
        marginHorizontal: 1,
        flexDirection: 'row',
        alignItems: "center",
        borderWidth: 1,
        borderRightWidth: 2,
        borderColor: "#D64F27",
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
        color: '#D64F27',
        fontSize: 20,
        // fontFamily: "Montserrat_400Regular"
    }
});


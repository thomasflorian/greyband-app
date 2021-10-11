// Import Dependencies 
import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Image, TouchableOpacity, Touchable } from 'react-native';
import { useFonts, Montserrat_400Regular, Montserrat_500Medium, Montserrat_700Bold } from '@expo-google-fonts/montserrat';
import AppLoading from 'expo-app-loading';
import { Icon } from 'react-native-elements';

// Import Components
import Toolbar from '../components/Toolbar';


export default function ProfileScreen({ navigation }) {

    // Load Montserrat font
    let [fontsLoaded] = useFonts({
        Montserrat_500Medium,
        Montserrat_400Regular,
        Montserrat_700Bold
    });

    const [profile, setProfile] = useState({ username: "CadeSpector", name: "Cade Spector", picture: "https://media-exp1.licdn.com/dms/image/C4E03AQE7QpbWEbK02g/profile-displayphoto-shrink_400_400/0/1623100188390?e=1637798400&v=beta&t=WQL1HsOPTDXsAuVo4KVP1-GyN_f2QnOEEoDwtdDQvbA", })

    return (
        <View style={styles.container}>
            <View style={styles.container}>
                <View style={{ ...styles.box, flex: 2 }}>
                    <View style={{ ...styles.row, flex: 1 }}>
                        <Text style={styles.username}>{profile.username}</Text>
                        <TouchableOpacity style={styles.editbutton} onPress={() => navigation.navigate("EditProfile")}>
                            <Text style={styles.edittext}>Edit Profile</Text>
                            <Icon name='account-edit-outline' type='material-community' color='#D64F27' size={30} />
                        </TouchableOpacity>
                    </View>
                    <View style={{ ...styles.row, flex: 5 }}>
                        <Image style={styles.picture} source={{ uri: profile.picture }}></Image>
                    </View>
                </View>
                <View style={{ ...styles.box, flex: 1 }}></View>
                <View style={{ ...styles.box, flex: 1 }}></View>
                <View style={{ ...styles.box, flex: 1 }}></View>
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
        borderColor: '#D64F27',
        borderWidth: 1,
        marginVertical: 10,
        borderRadius: 10,
    },
    username: {
        // fontFamily: "Montserrat_700Bold",
        color: '#D64F27',
        fontSize: 26
    },
    row: {
        marginVertical: 10,
        marginHorizontal: 15,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start",
    },
    editbutton: {
        flexDirection: "row",
        justifyContent: "flex-end",
        alignItems: "center"
    },
    edittext: {
        color: '#D64F27',
        fontFamily: "Montserrat_400Regular",
        marginHorizontal: 4
    },
    picture: {
        height: "90%",
        width: "40%",
        maxWidth: 200,
        borderRadius: 15,
    },
});


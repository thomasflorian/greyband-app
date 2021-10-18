// Import Dependencies 
import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { Icon } from 'react-native-elements';

// Import Components
import Toolbar from '../components/Toolbar';


export default function ProfileScreen({ navigation }) {

    // Get theme variables
    const theme = useTheme();

    // State to track profile
    // TODO: Continuously update profile from firebase
    const [profile, setProfile] = useState({ username: "CadeSpector", name: "Cade Spector", picture: "https://media-exp1.licdn.com/dms/image/C4E03AQE7QpbWEbK02g/profile-displayphoto-shrink_400_400/0/1623100188390?e=1637798400&v=beta&t=WQL1HsOPTDXsAuVo4KVP1-GyN_f2QnOEEoDwtdDQvbA", })

    return (
        <View style={styles(theme).container}>
            <View style={styles(theme).container}>
                <View style={{ ...styles(theme).box, flex: 2 }}>
                    <View style={styles(theme).row}>
                        <Text style={styles(theme).username}>{profile.username}</Text>
                        <TouchableOpacity style={styles(theme).editbutton} onPress={() => navigation.navigate("EditProfile")}>
                            <Text style={styles(theme).edittext}>Edit Profile</Text>
                            <Icon name='account-edit-outline' type='material-community' color={theme.colors.primary} size={30} />
                        </TouchableOpacity>
                    </View>
                    <View style={{ ...styles(theme).row, flex: 5 }}>
                        <Image style={styles(theme).picture} source={{ uri: profile.picture }}></Image>
                    </View>
                </View>
                <View style={styles(theme).box}></View>
                <View style={styles(theme).box}></View>
                <View style={styles(theme).box}></View>
            </View>
            <Toolbar navigation={navigation} />
        </View>
    );
}

// Styles
const styles = theme => StyleSheet.create({
    container: {
        width: "100%",
        flex: 1,
        backgroundColor: theme.colors.background,
        alignItems: 'center',
    },
    box: {
        width: "90%",
        borderColor: theme.colors.border,
        borderWidth: 1,
        marginVertical: 10,
        borderRadius: 10,
        flex: 1,
    },
    username: {
        fontFamily: theme.font.bold,
        color: theme.colors.text,
        fontSize: 26
    },
    row: {
        marginVertical: 10,
        marginHorizontal: 15,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start",
        flex: 1
    },
    editbutton: {
        flexDirection: "row",
        justifyContent: "flex-end",
        alignItems: "center"
    },
    edittext: {
        color: theme.colors.text,
        fontFamily: theme.font.light,
        marginHorizontal: 4
    },
    picture: {
        height: "90%",
        width: "40%",
        maxWidth: 200,
        borderRadius: 15,
    },
});


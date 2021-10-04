// Import Dependencies 
import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Image, TouchableOpacity, Touchable, FlatList } from 'react-native';
import { useFonts, Montserrat_400Regular, Montserrat_500Medium, Montserrat_700Bold } from '@expo-google-fonts/montserrat';
import AppLoading from 'expo-app-loading';
import { Icon } from 'react-native-elements';

// Import Components
import Toolbar from '../components/Toolbar';


export default function EditProfileScreen({ navigation }) {

    // Load Montserrat font
    let [fontsLoaded] = useFonts({
        Montserrat_500Medium,
        Montserrat_400Regular,
        Montserrat_700Bold
    });

    const [profile, setProfile] = useState({ username: "CadeSpector", name: "Cade Spector", picture: "https://media-exp1.licdn.com/dms/image/C4E03AQE7QpbWEbK02g/profile-displayphoto-shrink_400_400/0/1623100188390?e=1637798400&v=beta&t=WQL1HsOPTDXsAuVo4KVP1-GyN_f2QnOEEoDwtdDQvbA" })

    const renderItem = ({item}) => {
        return undefined
    }

    return (
        <View style={styles.container}>
            <View style={styles.box}>
                <View style={{width: "100%", flex: 1}}>
                    <View style={{flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginHorizontal: 20, marginVertical: 10}}>
                        <TouchableOpacity onPress={() => navigation.navigate("Profile")}><Icon name='arrow-back-ios' color='#D64F27' size={30} /></TouchableOpacity>
                        <Text style={{color: '#D64F27', fontSize: 24, fontWeight: "700"}}>Edit Profile</Text>
                        <Icon name='arrow-back-ios' color='#0F2138' size={30} />
                    </View>
                    <TouchableOpacity><Image style={styles.picture} source={{uri: profile.picture}}></Image></TouchableOpacity>
                </View>
                <View style={{width: "100%", flex: 5}}>
                    <FlatList/>
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
    picture: {
        marginHorizontal: "35%",
        marginBottom: 10,
        width: "30%",
        height: "100%",
        borderRadius: 10,
    }
});


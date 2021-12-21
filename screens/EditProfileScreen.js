// Import Dependencies 
import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, View, TextInput, Image, TouchableOpacity, FlatList } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { Icon } from 'react-native-elements';
import { ProfileContext } from '../context/ProfileContext';
// Import Components
import Toolbar from '../components/Toolbar';
import { auth, db } from '../src/database/firebase-index';


export default function EditProfileScreen({ navigation }) {

    // Get variables
    const theme = useTheme();
    const profile = useContext(ProfileContext);
    const [flatlistRef, setFlatlistRef] = useState(undefined);

    useEffect(() => {
        setOptions([{ label: "Name", value: profile.firstname + " " + profile.lastname, display: true, key: "1" },
        { label: "Age", value: profile.age, display: false, key: "2" },
        { label: "Hometown", value: profile.hometown, display: false, key: "3" },
        { label: "Work and Education", value: profile.work, display: false, key: "4" },
        { label: "Relationship Status", value: profile.relationship, display: false, key: "5" },
        { label: "Pronouns", value: profile.pronouns, display: false, key: "6" },
        { label: "Astrological Sign", value: profile.sign, display: false, key: "7" },
        { label: "Current Interests", value: profile.interests, display: false, key: "8" },
        { label: "Instagram", value: "", display: false, key: "9" },
        { label: "Snapchat", value: "", display: false, key: "10" },
        { label: "LinkedIn", value: "", display: false, key: "11" }])
    }, [options, profile]);

    const [options, setOptions] = useState([]);


    const handleValueChange = (newValue, key) => {
        setOptions((oldOptions) => (oldOptions.map((option) => option.key == key ? { ...option, value: newValue } : option)))
    };

    const handleDisplayToggle = (key) => {
        setOptions((oldOptions) => (oldOptions.map((option) => option.key == key ? { ...option, display: !option.display } : option)))
    };

    const saveProfileChanges = () => {
        
    };

    const renderItem = ({ item: { label, value, display, key }, index }) => {
        return (
            <View style={{ flexDirection: "row", width: "90%", height: 75, marginHorizontal: "5%" }}>
                <View style={{ flex: 3 }}>
                    <Text style={{ color: theme.colors.text, fontFamily: theme.font.regular }}>{label}</Text>
                    <TextInput onFocus={() => flatlistRef.scrollToIndex({ index })} onChangeText={(newValue) => handleValueChange(newValue, key)} value={value} style={{ ...styles(theme).box, color: theme.colors.text, fontFamily: theme.font.light, paddingHorizontal: 10 }}></TextInput>
                </View>
                <View style={{ flex: 1, maxWidth: 70, alignItems: "center" }}>
                    <Text style={{ color: theme.colors.text, fontFamily: theme.font.regular }}>{index == 0 ? "Display" : " "}</Text>
                    <TouchableOpacity onPress={() => handleDisplayToggle(key)} style={{ ...styles(theme).box, backgroundColor: display ? theme.colors.primary : theme.colors.background }}></TouchableOpacity>
                </View>
            </View>
        )
    }

    return (
        <View style={styles(theme).container}>
            <View style={styles(theme).box}>
                <View style={{ width: "100%", flex: 1 }}>
                    <View style={{ flexDirection: "row", alignItems: "center", marginHorizontal: 20, marginVertical: 10 }}>
                        <TouchableOpacity style={{ flex: 1 }} onPress={() => navigation.navigate("Profile")}><Icon name='arrow-back-ios' color={theme.colors.primary} size={30} /></TouchableOpacity>
                        <Text style={{ color: theme.colors.text, fontSize: 24, flex: 4, textAlign: "center", fontFamily: theme.font.light }}>Edit Profile</Text>
                        <View style={{ flex: 1 }}></View>
                    </View>
                </View>
                <View style={{ width: "100%", flex: 2, marginBottom: 20, alignItems: "center" }}>
                    <TouchableOpacity style={{ width: "30%", maxWidth: 150 }}>
                        <Image style={styles(theme).picture} source={{ uri: profile.picture }}></Image>
                    </TouchableOpacity>
                </View>
                <View style={{ width: "100%", flex: 10 }}>
                    <FlatList ref={(ref) => setFlatlistRef(ref)} scrollEnabled={true} renderItem={renderItem} data={options} contentContainerStyle={{ paddingBottom: "70%" }} />
                </View>
            </View>
            <Toolbar navigation={navigation} />
        </View>
    );
}

// Styles
const styles = theme => (StyleSheet.create({
    container: {
        width: "100%",
        flex: 1,
        backgroundColor: theme.colors.background,
        alignItems: 'center',
    },
    box: {
        width: "90%",
        flex: 1,
        borderColor: theme.colors.border,
        borderWidth: 1,
        marginVertical: 10,
        borderRadius: 10,
    },
    picture: {
        marginBottom: 10,
        width: "100%",
        height: "100%",
        borderRadius: 10,
    }
}));


// Import Dependencies 
import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, View, TextInput, Image, TouchableOpacity, FlatList } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { Icon } from 'react-native-elements';
import { UserdataContext } from '../context/UserdataContext';
// Import Components
import Toolbar from '../components/Toolbar';
import { auth, db } from '../src/database/firebase-index';


export default function EditProfileScreen({ navigation }) {

    // Get variables
    const theme = useTheme();
    const userdata = useContext(UserdataContext);
    const [flatlistRef, setFlatlistRef] = useState(undefined);
    const [options, setOptions] = useState([]);

    useEffect(() => {
        setOptions([
        { name: "firstname", changed: false, label: "First Name", value: userdata.profile.firstname, display: userdata.display.firstname, key: "1" },
        { name: "lastname", changed: false, label: "Last Name", value: userdata.profile.lastname, display: userdata.display.lastname, key: "2" },
        { name: "age", changed: false, label: "Age", value: userdata.profile.age, display: userdata.display.age, key: "3" },
        { name: "hometown", changed: false, label: "Hometown", value: userdata.profile.hometown, display: userdata.display.hometown, key: "4" },
        { name: "work", changed: false, label: "Work and Education", value: userdata.profile.work, display: userdata.display.work, key: "5" },
        { name: "relationship", changed: false, label: "Relationship Status", value: userdata.profile.relationship, display: userdata.display.relationship, key: "6" },
        { name: "pronouns", changed: false, label: "Pronouns", value: userdata.profile.pronouns, display: userdata.display.pronouns, key: "7" },
        { name: "sign", changed: false, label: "Astrological Sign", value: userdata.profile.sign, display: userdata.display.sign, key: "8" },
        { name: "interests", changed: false, label: "Current Interests", value: userdata.profile.interests, display: userdata.display.interests, key: "9" },
        { name: "instagram", changed: false, label: "Instagram", value: userdata.profile.instagram, display: userdata.display.instagram, key: "10" },
        { name: "snapchat", changed: false, label: "Snapchat", value: userdata.profile.snapchat, display: userdata.display.snapchat, key: "11" },
        { name: "linkedin", changed: false, label: "LinkedIn", value: userdata.profile.linkedin, display: userdata.display.linkedin, key: "12" }])
    }, [userdata]);

    const handleValueChange = (newValue, key) => {
        setOptions((oldOptions) => (oldOptions.map((option) => option.key == key ? { ...option, value: newValue, changed: true } : option)))
    };

    const handleDisplayToggle = (key) => {
        setOptions((oldOptions) => (oldOptions.map((option) => option.key == key ? { ...option, display: !option.display, changed: true } : option)))
    };

    const saveProfileChanges = () => {
        let newProfile = {...userdata.profile}
        let newDisplay = {...userdata.display}
        options.filter((item) => item.changed).forEach((item) => {
            newProfile[item.name] = item.value;
            newDisplay[item.name] = item.display;
        });
        const uid = auth.currentUser.uid;
        return db.collection("users").doc(uid).set({profile: newProfile, display: newDisplay}, { merge: true });
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
                        <TouchableOpacity style={{ flex: 1 }} onPress={() => saveProfileChanges().then(() => navigation.navigate("Profile"))}><Icon name='arrow-back-ios' color={theme.colors.primary} size={30} /></TouchableOpacity>
                        <Text style={{ color: theme.colors.text, fontSize: 24, flex: 4, textAlign: "center", fontFamily: theme.font.light }}>Edit Profile</Text>
                        <View style={{ flex: 1 }}></View>
                    </View>
                </View>
                <View style={{ width: "100%", flex: 2, marginBottom: 20, alignItems: "center" }}>
                    <TouchableOpacity style={{ width: "30%", maxWidth: 150 }}>
                        <Image style={styles(theme).picture} source={{ uri: userdata.profile.picture }}></Image>
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


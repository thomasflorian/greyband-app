// Import Dependencies 
import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, View, TextInput, Image, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { Icon } from 'react-native-elements';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import * as ImagePicker from 'expo-image-picker';
// Import Components
import Toolbar from '../components/Toolbar';
import { UserdataContext } from '../context/UserdataContext';
import { auth, db, storage } from '../src/database/firebase-index';


export default function EditProfileScreen({ navigation }) {

    // Get variables
    const theme = useTheme();
    const userdata = useContext(UserdataContext);
    const [flatlistRef, setFlatlistRef] = useState(undefined);
    const [image, setImage] = useState(userdata.profile.picture);
    const [imageLoading, setImageLoading] = useState(false);
    const [options, setOptions] = useState([]);

    // TODO: Handle all possible errors
    const addImage = async () => {
        const uid = auth.currentUser.uid;
        let result = await ImagePicker.launchImageLibraryAsync({ mediaTypes: ImagePicker.MediaTypeOptions.Images, allowsEditing: true, aspect: [1, 1], quality: 0.1 });
        setImageLoading(true);
        const response = await fetch(result.uri);
        const blob = await response.blob();
        const reference = storage.ref().child(`profilepictures/${uid}.png`);
        await reference.put(blob);

        // Get the download URL
        reference.getDownloadURL()
            .then(async (url) => {
                await saveProfileChanges();
                db.collection("users").doc(uid).set({profile: {picture: url}}, {merge:true}).then(() => {
                    setImage(url);
                    setImageLoading(false);
                }).catch(error => Toast.show({ type: "error", position: "bottom", text1: "Network Connection Error!", text2: "Check your connection and try again." }));
            })
            .catch((error) => {
                // A full list of error codes is available at
                // https://firebase.google.com/docs/storage/web/handle-errors
                switch (error.code) {
                    case 'storage/object-not-found':
                        Toast.show({ type: "error", position: "bottom", text1: "Error uploading image!", text2: "Check your connection and try again." });
                        break;
                    case 'storage/unauthorized':
                        Toast.show({ type: "error", position: "bottom", text1: "Unauthorized User!" });
                        break;
                    case 'storage/canceled':
                        Toast.show({ type: "error", position: "bottom", text1: "Upload Cancelled!" });
                        break;
                    default:
                        Toast.show({ type: "error", position: "bottom", text1: "Unknown Error Occurred!" });
                        break;
                }
            });
    }


    useEffect(() => {
        setOptions([
            { name: "firstname", changed: false, label: "First Name", value: userdata.profile.firstname || "", display: userdata.display.firstname || false, key: "1" },
            { name: "lastname", changed: false, label: "Last Name", value: userdata.profile.lastname || "", display: userdata.display.lastname || false, key: "2" },
            { name: "age", changed: false, label: "Age", value: userdata.profile.age || "", display: userdata.display.age || false, key: "3" },
            { name: "hometown", changed: false, label: "Hometown", value: userdata.profile.hometown || "", display: userdata.display.hometown || false, key: "4" },
            { name: "work", changed: false, label: "Work and Education", value: userdata.profile.work || "", display: userdata.display.work || false, key: "5" },
            { name: "relationship", changed: false, label: "Relationship Status", value: userdata.profile.relationship || "", display: userdata.display.relationship || false, key: "6" },
            { name: "pronouns", changed: false, label: "Pronouns", value: userdata.profile.pronouns || "", display: userdata.display.pronouns || false, key: "7" },
            { name: "sign", changed: false, label: "Astrological Sign", value: userdata.profile.sign || "", display: userdata.display.sign || false, key: "8" },
            { name: "interests", changed: false, label: "Current Interests", value: userdata.profile.interests || "", display: userdata.display.interests || false, key: "9" },
            { name: "instagram", changed: false, label: "Instagram", value: userdata.profile.instagram || "", display: userdata.display.instagram || false, key: "10" },
            { name: "snapchat", changed: false, label: "Snapchat", value: userdata.profile.snapchat || "", display: userdata.display.snapchat || false, key: "11" },
            { name: "linkedin", changed: false, label: "LinkedIn", value: userdata.profile.linkedin || "", display: userdata.display.linkedin || false, key: "12" }])
    }, [userdata]);

    const handleValueChange = (newValue, key) => {
        setOptions((oldOptions) => (oldOptions.map((option) => option.key == key ? { ...option, value: newValue, changed: true } : option)))
    };

    const handleDisplayToggle = (key) => {
        setOptions((oldOptions) => (oldOptions.map((option) => option.key == key && option.value ? { ...option, display: !option.display, changed: true } : option)))
    };

    const saveProfileChanges = async () => {
        let newProfile = { ...userdata.profile }
        let newDisplay = { ...userdata.display }
        const newOptions = options.filter((item) => item.changed)
        if (newOptions.length) {
            newOptions.forEach((item) => {
                newProfile[item.name] = item.value;
                newDisplay[item.name] = item.display;
            });
            const uid = auth.currentUser.uid;
            // TODO: Catch errors due to internet connection etc.
            db.collection("users").doc(uid).set({ profile: newProfile, display: newDisplay }, { merge: true }).catch(error => Toast.show({ type: "error", position: "bottom", text1: "Network Connection Error!", text2: "Check your connection and try again." }));
        }
    };

    const renderItem = ({ item: { label, value, display, key }, index }) => {
        return (
            <View style={{ flexDirection: "row", width: "90%", marginHorizontal: "5%" }}>
                <View style={{ flex: 3 }}>
                    <Text style={{ color: theme.colors.text, fontFamily: theme.font.regular }}>{label}</Text>
                    <TextInput onFocus={() => flatlistRef.scrollToIndex({ index })} onChangeText={(newValue) => handleValueChange(newValue, key)} value={value} style={{ ...styles(theme).box, color: theme.colors.text, fontFamily: theme.font.light, padding: theme.spacing.small }}></TextInput>
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
                <View style={{ width: "100%" }}>
                    <View style={{ flexDirection: "row", alignItems: "center", marginHorizontal: theme.spacing.smallplus, marginVertical: theme.spacing.small }}>
                        <TouchableOpacity style={{ flex: 1 }} onPress={() => {saveProfileChanges(); navigation.navigate("Profile");}}><Icon name='arrow-back-ios' color={theme.colors.primary} size={30} /></TouchableOpacity>
                        <Text style={{ color: theme.colors.text, fontSize: theme.fontsize.medium, flex: 4, textAlign: "center", fontFamily: theme.font.light }}>Edit Profile</Text>
                        <View style={{ flex: 1 }}></View>
                    </View>
                </View>
                <View style={{ width: "100%", flex: 2, marginBottom: theme.spacing.smallplus, alignItems: "center" }}>
                    <TouchableOpacity onPress={addImage} style={{ width: "30%", maxWidth: 150 }}>
                        {imageLoading ? <ActivityIndicator size={"large"} color={theme.colors.primary} /> : <Image style={styles(theme).picture} source={{ uri: image }} />}
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
const styles = theme => StyleSheet.create({
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
        marginVertical: theme.spacing.small,
        borderRadius: theme.spacing.small,
    },
    picture: {
        marginBottom: theme.spacing.small,
        width: "100%",
        height: "100%",
        borderRadius: theme.spacing.small,
    }
});


import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, View, Image, Dimensions, TextInput } from 'react-native';
import Toolbar from '../components/Toolbar';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useTheme } from '@react-navigation/native';
import * as Haptics from 'expo-haptics';
import { UserdataContext } from '../context/UserdataContext';

export default function HomeScreen({ navigation }) {

    // Get theme variables
    const theme = useTheme();
    // Get user data
    const userdata = useContext(UserdataContext);


    // Track rotation value of bac select slider
    const [rot, setRot] = useState("0");

    // Generate light haptic feedback when targetState changes.
    useEffect(() => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
    }, [targetState]
    )

    // Declare dynamic variables (should update on rerenders)
    const targetBac = (0.16 * rot / 180).toFixed(2)
    const targetState = targetBac > 0.12 ? "Incapacitated" : (targetBac > 0.08 ? "Drunk" : (targetBac > 0.04 ? "Tipsy" : "Sober"))
    const width = Dimensions.get('window').width > 500 ? 500 : Dimensions.get('window').width
    const height = 222 * width / 500;

    // Function to translate click to rotation value
    function handleClick(evt) {
        const x = (2 * evt.nativeEvent.locationX / width) - 1
        const y = (height - evt.nativeEvent.locationY) / height
        // translates x,y point into degrees of rotation
        let newVal = (180 - (180 * Math.atan2(y, x) / Math.PI))
        // 5 degree fudge factor makes it easier to select extremes
        // newVal = newVal > 90 ? newVal + 5 : newVal - 5
        // maximizes allowed rotation from 0 to 180 degrees
        if (newVal > 180 && newVal < 270) {
            newVal = 180
        } else if (newVal < 0 || newVal >= 270) {
            newVal = 0
        }
        setRot(newVal);
    }

    return (
        <View style={styles(theme).container}>
            <TextInput onChangeText={(input) => setRot(input)} />
            <Text style={styles(theme).blowtitle}>Last Recorded Blow</Text>
            <View style={styles(theme).blowbox}>
                <Text style={styles(theme).blowtext}>{(userdata.blows.length ? userdata.blows[userdata.blows.length - 1].bac : "0.00") + "%"}</Text>
            </View>
            <View style={styles(theme).targetSliderContainer}>
                <View onResponderMove={handleClick} onStartShouldSetResponder={() => true} >
                    <Image style={{ width: width, height: 2 * height, position: "absolute", top: 0, transform: [{ rotate: rot + 'deg' }] }} source={require("../assets/images/highlight.png")} />
                    <Image style={{ width: width, height: height, position: "relative", top: 0, margin: 5 }} source={require("../assets/images/greysun-trans.png")} />
                </View>
                <Text style={styles(theme).targetBac}>{targetBac + "%"}</Text>
            </View>
            <View style={styles(theme).targetTextContainer}>
                <Text style={styles(theme).targetState}>{targetState}</Text>
                <View style={{width:"100%", alignItems: "center"}}>
                    <Image  style={{display: targetState == "Incapacitated" ? "flex":"none", width: width, height: 650 * width / 1730, marginTop: 20, position: "absolute" }} source={require("../assets/images/incapacitated.png")} />
                    <Image style={{display: targetState == "Drunk" ? "flex":"none", width: width, height: 650 * width / 1730, marginTop: 20, position: "absolute" }} source={require("../assets/images/drunk.png")} />
                    <Image style={{display: targetState == "Tipsy" ? "flex":"none", width: width, height: 650 * width / 1730, marginTop: 20, position: "absolute" }} source={require("../assets/images/tipsy.png")} />
                </View>
            </View>
            <Toolbar navigation={navigation} />
        </View>
    );
}

// Declare static variables
const Stack = createNativeStackNavigator();

// Styles
const styles = theme => (StyleSheet.create({
    container: {
        paddingTop: theme.spacing.medium,
        width: "100%",
        flex: 1,
        backgroundColor: theme.colors.background,
        alignItems: 'center',
    },
    blowtitle: {
        fontFamily: theme.font.light,
        fontSize: theme.fontsize.medium,
        color: theme.colors.text,
        textAlign: "center"
    },
    blowbox: {
        paddingHorizontal: theme.spacing.xlarge,
        paddingVertical: theme.spacing.medium,
        margin: theme.spacing.medium,
        borderColor: theme.colors.border,
        borderWidth: 1,
        borderRadius: theme.spacing.smallplus,
    },
    blowtext: {
        fontFamily: theme.font.light,
        fontSize: theme.fontsize.large,
        color: theme.colors.text,
    },
    targetState: {
        fontFamily: theme.font.light,
        fontSize: theme.fontsize.small,
        color: theme.colors.text,
    },
    targetBac: {
        position: "absolute",
        bottom: 8,
        fontFamily: theme.font.light,
        fontSize: theme.fontsize.xlarge,
        color: theme.colors.text,
    },
    targetTextContainer: {
        width: "100%",
        backgroundColor: theme.colors.background,
        position: "relative",
        top: -10,
        alignItems: "center",
        paddingTop: theme.spacing.small,
        margin: 0,
        flex: 1
    },
    targetSliderContainer: {
        alignItems: "center"
    }

}));


import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, Dimensions, TextInput } from 'react-native';
import Toolbar from '../components/Toolbar';
import { useFonts, Montserrat_500Medium, Montserrat_400Regular } from '@expo-google-fonts/montserrat';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as Haptics from 'expo-haptics';

export default function HomeScreen({ navigation }) {

    // Hooks

    // tracks rotation value of bac select slider
    const [rot, setRot] = useState("0");

    // generates light haptic feedback when targetState changes.
    useEffect(() => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
    }, [targetState]
    )

    // load in montserrat font
    let [fontsLoaded] = useFonts({
        Montserrat_400Regular,
        Montserrat_500Medium,
    });

    // Declare dynamic variables (should update on rerenders)
    const targetBac = (0.16 * rot / 180).toFixed(2)
    const targetState = targetBac > 0.12 ? "Incapacitated" : (targetBac > 0.08 ? "Drunk" : (targetBac > 0.04 ? "Tipsy" : "Sober"))
    const width = Dimensions.get('window').width > 500 ? 500 : Dimensions.get('window').width
    const height = 222 * width / 500;

    function handleClick(evt) {
        const x = (2 * evt.nativeEvent.locationX / width) - 1
        const y = (height - evt.nativeEvent.locationY) / height
        // translates x,y point into degrees of rotation
        let newVal = (180 - (180 * Math.atan2(y, x) / Math.PI))
        // 5 degree fudge factor makes it easier to select extremes
        newVal = newVal > 90 ? newVal + 5 : newVal - 5
        // maximizes allowed rotation from 0 to 180 degrees
        if (newVal > 180 && newVal < 270) {
            newVal = 180
        } else if (newVal < 0 || newVal >= 270) {
            newVal = 0
        }
        setRot(newVal);
    }

    return (
        <View style={styles.container}>
            <View style={{ backgroundColor: "#0F2138", zIndex: 1, marginBottom: 30 }}>
                <TextInput onChangeText={(input) => setRot(input)} />
                <Text style={styles.blowtitle}>Last Recorded Blow</Text>
                <View style={styles.blowbox}>
                    <Text style={styles.blowtext}>0.00%</Text>
                </View>
            </View>
            <View style={styles.targetSliderContainer}>
                <View onResponderMove={handleClick} onStartShouldSetResponder={() => true} >
                    <Image style={{ width: width, height: 2 * height, position: "absolute", top: 0, transform: [{ rotate: rot + 'deg' }] }} source={require("../assets/images/highlight.png")} />

                    <Image style={{ width: width, height: height, position: "relative", top: 0, margin: 5 }} source={require("../assets/images/greysun-trans.png")} />
                </View>
                <Text style={styles.targetBac}>{targetBac + "%"}</Text>
            </View>
            <View style={styles.targetTextContainer}>
                <Text style={styles.targetState}>{targetState}</Text>
                {targetState == "Incapacitated" && <Image style={{ width: width, height: 650 * width / 1730, marginTop: 20 }} source={require("../assets/images/incapacitated.png")} />}
                {targetState == "Drunk" && <Image style={{ width: width, height: 650 * width / 1730, marginTop: 20 }} source={require("../assets/images/drunk.png")} />}
                {targetState == "Tipsy" && <Image style={{ width: width, height: 650 * width / 1730, marginTop: 20 }} source={require("../assets/images/tipsy.png")} />}
            </View>
            <Toolbar navigation={navigation} />
        </View>
    );
}

// Declare static variables

const Stack = createNativeStackNavigator();

const styles = StyleSheet.create({
    container: {
        paddingTop: 30,
        width: "100%",
        flex: 1,
        backgroundColor: '#0F2138',
        alignItems: 'center',
    },
    blowtitle: {
        // fontFamily: "Montserrat_400Regular",
        fontSize: 26,
        color: "#D64F27",
        textAlign: "center"
    },
    blowbox: {
        paddingHorizontal: 75,
        paddingVertical: 30,
        margin: 30,
        borderColor: "#D64F27",
        borderWidth: 1,
        borderRadius: 15,
    },
    blowtext: {
        // fontFamily: "Montserrat_400Regular",
        fontSize: 32,
        color: "#D64F27",
    },
    targetState: {
        // fontFamily: "Montserrat_400Regular",
        fontSize: 20, 
        color: "#D64F27" 
    },
    targetBac: {
        position: "absolute", 
        bottom: 8, 
        // fontFamily: "Montserrat_400Regular",
        fontSize: 36, 
        color: "#D64F27" 
    },
    targetTextContainer: { 
        width: "100%", 
        backgroundColor: "#0F2138", 
        position: "relative", 
        top: -10, 
        alignItems: "center", 
        paddingTop: 10, 
        margin: 0, 
        flex: 1 
    },
    targetSliderContainer: { 
        alignItems: "center"
    }

});


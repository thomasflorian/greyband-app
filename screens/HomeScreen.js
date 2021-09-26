import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableWithoutFeedback, Dimensions } from 'react-native';
import Toolbar from '../components/Toolbar';
import { useFonts, Montserrat_500Medium, Montserrat_400Regular } from '@expo-google-fonts/montserrat';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TextInput } from 'react-native';


export default function HomeScreen({ navigation }) {

    let [fontsLoaded] = useFonts({
        Montserrat_400Regular,
        Montserrat_500Medium,
    });

    // preliminary functionality for interactive logo
    const [rot, setRot] = useState("");
    const targetBac = (0.16 * rot / 180).toFixed(2)
    const targetState = targetBac > 0.12 ? "Incapacitated" : (targetBac > 0.08 ? "Drunk" : (targetBac > 0.04 ? "Tipsy" : "Sober")) 
    const width = Dimensions.get('window').width;
    function handleClick(evt) {
        const x = evt.nativeEvent.x / width
        const y = evt.nativeEvent.y
        let newVal = (x + 0.016 * Math.pow(x - 0.5, 3) * y) * 180
        if (newVal > 180) {
            newVal = 180
        } else if (newVal < 0) {
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
            <View style={{ alignItems: "center" }}>
                <Image style={{ width: width, height: 444 * width / 500, position: "absolute", top: -10, transform: [{ rotate: rot + 'deg' }] }} source={require("../assets/images/highlight.png")} />
                <TouchableWithoutFeedback onPress={handleClick}>
                    <Image style={{ width: width, height: 222 * width / 500, position: "relative", top: 0 }} source={require("../assets/images/greysun-trans.png")} />
                </TouchableWithoutFeedback>
                <Text style={{ position: "absolute", bottom: 2, fontFamily: "Montserrat_400Regular", fontSize: "2rem", color: "#D64F27" }}>{targetBac + "%"}</Text>
            </View>
            <View style={{ width: "100%", backgroundColor: "#0F2138", position: "relative", top: -10, alignItems: "center", paddingTop: 10, margin: 0, flex:1 }}>
                <Text style={{ fontFamily: "Montserrat_400Regular", fontSize: "1.2rem", color: "#D64F27" }}>{targetState}</Text>
                {targetState == "Incapacitated" && <Image style={{ width: width, height: 650 * width / 1730, marginTop: 20}} source={require("../assets/images/incapacitated.png")} />}
                {targetState == "Drunk" && <Image style={{ width: width, height: 650 * width / 1730, marginTop: 20}} source={require("../assets/images/drunk.png")} />}
                {targetState == "Tipsy" && <Image style={{ width: width, height: 650 * width / 1730, marginTop: 20}} source={require("../assets/images/tipsy.png")} />}
            </View>
            <Toolbar navigation={navigation} />
        </View>
    );
}
const Stack = createNativeStackNavigator();

const styles = StyleSheet.create({
    container: {
        marginTop: "50px",
        paddingTop: "50px",
        width: "100%",
        flex: 1,
        backgroundColor: '#0F2138',
        alignItems: 'center',
    },
    blowtitle: {
        fontFamily: "Montserrat_400Regular",
        fontSize: "1.5rem",
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
        boxShadow: "0px 4px 10px #D64F27"
    },
    blowtext: {
        fontFamily: "Montserrat_400Regular",
        fontSize: "1.8rem",
        color: "#D64F27"
    }

});


import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import Toolbar from '../components/Toolbar';
import { useFonts, Montserrat_500Medium } from '@expo-google-fonts/montserrat';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


export default function HomeScreen({navigation}) {

    let [fontsLoaded] = useFonts({
        Montserrat_500Medium,
    });

    return (
        <View style={styles.container}>
          <Text style={styles.blowtitle}>Last Recorded Blow</Text>
          <View style={styles.blowbox}>
              <Text style={styles.blowtext}>.00%</Text>
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
        fontFamily: "Montserrat_500Medium",
        fontSize: "1.5rem",
        color: "#D64F27"
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
        fontFamily: "Montserrat_500Medium",
        fontSize: "1.8rem",
        color: "#D64F27"
    }

});


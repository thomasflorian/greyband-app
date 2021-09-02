import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { useFonts, Montserrat_500Medium } from '@expo-google-fonts/montserrat';


export default function HomeScreen() {

    let [fontsLoaded] = useFonts({
        Montserrat_500Medium,
    });

    return (
        <View style={styles.container}>
          <Text style={styles.blowtitle}>Sup</Text>
          <View style={styles.blowbox}>
              <Text style={styles.blowtext}>.00%</Text>
          </View>
        </View>
      );
}


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
        paddingHorizontal: "75px",
        paddingVertical: "30px",
        margin: "30px",
        borderColor: "#D64F27",
        borderWidth: "1px",
        borderRadius: "15px",
        boxShadow: "0px 4px 10px #D64F27"
    },
    blowtext: {
        fontFamily: "Montserrat_500Medium",
        fontSize: "1.8rem",
        color: "#D64F27"
    }

});


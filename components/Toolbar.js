import React from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';
import { useFonts, Montserrat_400Regular } from '@expo-google-fonts/montserrat';
import { Icon } from 'react-native-elements'


export default function Toolbar({navigation}) {

    let [fontsLoaded] = useFonts({
        Montserrat_400Regular,
    });

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => navigation.navigate("Home")}>
                <Icon
                    name='home'
                    color='#D64F27'
                    size={30}
                />
            </TouchableOpacity>
        
            <Icon
                name='party-popper'
                type='material-community'
                color='#D64F27'
                size={30}
            />
            <TouchableOpacity onPress={() => navigation.navigate("Friends")}>
                <Icon
                    name='search'
                    color='#D64F27'
                    size={30}
                />
            </TouchableOpacity>
            <Icon
                name='user'
                type="antdesign"
                color='#D64F27'
                size={30}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        height: '50px',
        width: '100%',
        position: 'absolute',
        bottom: '0px',
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'space-between',
        borderTopColor: "#D64F27",
        borderTopWidth: 1,
        paddingHorizontal: "50px",
        paddingVertical: "30px"
    }

});

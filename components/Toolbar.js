import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements'


export default function Toolbar({ navigation }) {

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => navigation.navigate("Home")}>
                <Icon
                    name='home'
                    color='#D64F27'
                    size={30}
                />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("Party")}>
                <Icon
                    name='party-popper'
                    type='material-community'
                    color='#D64F27'
                    size={30}
                />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("Search")}>
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
        height: 80,
        width: '100%',
        backgroundColor: '#0F2138',
        bottom: 0,
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'space-between',
        borderTopColor: "#D64F27",
        borderTopWidth: 1,
        paddingHorizontal: 30,
    }

});

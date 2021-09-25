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

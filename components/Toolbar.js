import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { Icon } from 'react-native-elements'


export default function Toolbar({ navigation }) {
    // Get theme variables
    const theme = useTheme();

    return (
        <View style={styles(theme).container}>
            <TouchableOpacity onPress={() => navigation.navigate("Home")}>
                <Icon name='home' color={theme.colors.primary} size={30} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("Party")}>
                <Icon name='party-popper' type='material-community' color={theme.colors.primary} size={30} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("Search")}>
                <Icon name='search' color={theme.colors.primary} size={30} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
                <Icon name='user' type="antdesign" color={theme.colors.primary} size={30} />
            </TouchableOpacity>
        </View>
    );
}

const styles = theme => StyleSheet.create({
    container: {
        height: 80,
        width: '100%',
        backgroundColor: theme.colors.background,
        bottom: 0,
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'space-between',
        borderTopColor: theme.colors.border,
        borderTopWidth: 1,
        paddingHorizontal: 30,
    }

});

// Import Dependencies 
import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Image, TouchableOpacity, FlatList } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { Icon } from 'react-native-elements';

// Import Components
import Toolbar from '../components/Toolbar';

export default function SearchScreen({ navigation }) {

    // Get theme variables
    const theme = useTheme();

    // State to track search query
    const [query, setQuery] = useState("");
    // State to track selected user
    const [selectedUser, setSelectedUser] = useState(-1);

    // State to track users list
    // TODO: Obtain user list from database.
    const [users, setUsers] = useState([
        { username: "Mulcy", name: "Jack M", picture: "https://media-exp1.licdn.com/dms/image/C4D03AQGqkhwJ7lOgaw/profile-displayphoto-shrink_400_400/0/1627943347422?e=1637798400&v=beta&t=B_Pyxda4EmQptoamr55wpSWr7QSxZz7qUrI_oPjbdBg", favorite: false, key: '0' },
        { username: "Mayarox5", name: "Maya A", picture: "https://media-exp1.licdn.com/dms/image/D5635AQHNBHwnvHPtDw/profile-framedphoto-shrink_400_400/0/1632152430403?e=1633989600&v=beta&t=uTrRLCgJdYfdaBUJmj1kimsRoc_53pEuNdr3BF-AdYw", favorite: false, key: '1' },
        { username: "Specticole", name: "Cole S", picture: "https://media-exp1.licdn.com/dms/image/C4D03AQFIfOQDa8Qm9g/profile-displayphoto-shrink_400_400/0/1537903746651?e=1637798400&v=beta&t=C3YfJZqTgGh7RzgZC1U0S64GepYcWr8OzOE0bURj7Kw", favorite: false, key: '2' },
        { username: "Rohet_Chitikela", name: "Rohet C", picture: "https://media-exp1.licdn.com/dms/image/C5603AQERqQbJGA8S7Q/profile-displayphoto-shrink_400_400/0/1600286036644?e=1637798400&v=beta&t=SBXfZiJAzXP7A9PSIDJDFdlfPMTuXJtU2XphXe3d_Q0", favorite: false, key: '3' },
        { username: "Suj2001", name: "Sujay V", picture: "https://media-exp1.licdn.com/dms/image/C4D03AQEVehgIRmBoAA/profile-displayphoto-shrink_400_400/0/1587057007307?e=1637798400&v=beta&t=M2-x-sZbm1s8TigO-3IROiis8ErdfaqrVyY7gQmqTrg", favorite: false, key: '4' },
        { username: "cadespector", name: "Cade S", picture: "https://media-exp1.licdn.com/dms/image/C4E03AQE7QpbWEbK02g/profile-displayphoto-shrink_400_400/0/1623100188390?e=1637798400&v=beta&t=WQL1HsOPTDXsAuVo4KVP1-GyN_f2QnOEEoDwtdDQvbA", favorite: false, key: '5' },
    ]);

    // Function to toggle favorite users
    function toggleFavorite(key) {
        setUsers(oldUsers => (
            oldUsers.map(user => user.key == key ? { ...user, favorite: !user.favorite } : user)
        ));
    }

    // Function to set selected user
    function selectUser(key) {
        setSelectedUser((oldKey) => key === oldKey ? -1 : key);
    }

    // Function to filter user objects 
    function filterUsers({ username, name }) {
        return username.toLowerCase().startsWith(query.toLowerCase()) || name.toLowerCase().startsWith(query.toLowerCase());
    }

    // Function to sort user objects by if favorited and then alphabetically
    function usersort(a, b) {
        if ((a.favorite && b.favorite) || !(a.favorite || b.favorite)) {
            return a.username < b.username ? -1 : (a.username > b.username ? 1 : 0);
        } else {
            return a.favorite ? -1 : 1;
        }
    }

    // Function for FlatList component
    const renderItem = ({ item }) => {
        const { username, name, picture, favorite, key } = item;
        return (
            <View style={styles(theme).user}>
                <TouchableOpacity style={styles(theme).usersummarycontainer} onPress={() => selectUser(key)}>
                    <Image style={styles(theme).userimage} source={{ uri: picture }} />
                    <View style={styles(theme).usertextcontainer}>
                        <Text style={styles(theme).username}>{username}</Text>
                        <Text style={styles(theme).username}>{name}</Text>
                    </View>
                    <TouchableOpacity onPress={() => toggleFavorite(key)}>
                        <Icon style={styles(theme).icon} name={favorite ? "star" : "star-outline"} color="yellow" size={30} />
                    </TouchableOpacity>
                </TouchableOpacity>
                {/* Reveal details if user is selected */}
                {selectedUser == key &&
                    <View style={styles(theme).activebuttoncontainer}>
                        <View style={styles(theme).activebuttonrow}>
                            <TouchableOpacity style={styles(theme).activebutton}>
                                <Text style={styles(theme).activebuttontext}>View Profile</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles(theme).activebutton}>
                                <Text style={styles(theme).activebuttontext}>Make Buddy</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles(theme).activebuttonrow}>
                            <TouchableOpacity style={styles(theme).activebutton}>
                                <Text style={styles(theme).activebuttontext}>Invite to Party</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles(theme).activebutton}>
                                <Text style={styles(theme).activebuttontext}>Join Party</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                }
            </View>
        )
    }
    return (
        <View style={styles(theme).container}>
            {/* Search Bar */}
            <View style={styles(theme).searchcontainer}>
                <Icon style={styles(theme).icon} name='search' color='#0F2138' size={30} />
                <TextInput style={styles(theme).searchbar} onChangeText={(newQuery) => setQuery(newQuery)} />
            </View>
            {/* Users List */}
            <FlatList style={styles(theme).flatlist} contentContainerStyle={styles(theme).usercontainer} scrollEnabled={true} renderItem={renderItem} data={
                // Sort users first by if favorited then alphabetically
                users.sort(usersort).filter(filterUsers)
            } />
            <Toolbar navigation={navigation} />
        </View>
    );

}

// Styles
const styles = theme => StyleSheet.create({
    container: {
        width: "100%",
        paddingTop: 30,
        flex: 1,
        backgroundColor: theme.colors.background,
        alignItems: 'center',
    },
    searchbar: {
        height: "100%",
        flex: 1,
        paddingVertical: 10,
        paddingHorizontal: 8,
        backgroundColor: theme.colors.background,
        borderBottomRightRadius: 10,
        borderTopRightRadius: 10,
        color: theme.colors.text,
        fontFamily: theme.font.regular,
    },
    searchcontainer: {
        backgroundColor: theme.colors.border,
        width: "90%",
        marginHorizontal: 1,
        flexDirection: 'row',
        alignItems: "center",
        borderWidth: 1,
        borderRightWidth: 2,
        borderColor: theme.colors.border,
        borderRadius: 10,
        // boxShadow: "0px 2px 4px #D64F27",
    },
    icon: {
        paddingHorizontal: 6
    },
    usercontainer: {
        width: "100%",
        marginHorizontal: "5%"
    },
    user: {
        width: "90%",
        marginVertical: 10,
        borderWidth: 1,
        borderColor: theme.colors.border,
        borderRadius: 10,
        // boxShadow: "0px 2px 4px #D64F27",
    },
    usersummarycontainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        height: 100,
        paddingVertical: 10,
    },
    userimage: {
        height: "100%",
        width: 80,
        resizeMode: "cover",
        marginHorizontal: 10,
        borderRadius: 15,
    },
    username: {
        margin: 1,
        color: theme.colors.text,
        fontFamily: theme.font.regular
    },
    usertextcontainer: {
        flex: 1,
        justifyContent: "center"
    },
    activebuttoncontainer: {
        marginBottom: 15,
    },
    activebuttonrow: {
        flexDirection: "row",
        justifyContent: "space-evenly"
    },
    activebutton: {
        width: "40%",
        justifyContent: "center",
        margin: 5,
        padding: 5,
        borderColor: theme.colors.border,
        borderRadius: 10,
        borderWidth: 1,
        // boxShadow: "0px 2px 8px #D64F27",
    },
    activebuttontext: {
        color: theme.colors.text,
        textAlign: "center",
        fontFamily: theme.font.light
    },
    flatlist: {
        width: "100%",
        marginTop: 5,
        marginBottom: 10
    }
});


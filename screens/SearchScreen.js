// Import Dependencies 
import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Image, TouchableOpacity, FlatList } from 'react-native';
import { useFonts, Montserrat_500Medium, Montserrat_400Regular } from '@expo-google-fonts/montserrat';
import AppLoading from 'expo-app-loading';
import { Icon } from 'react-native-elements'

// Import Components
import Toolbar from '../components/Toolbar';


export default function SearchScreen({ navigation }) {

    // State to track search query
    const [query, setQuery] = useState("");
    const [selectedUser, setSelectedUser] = useState(-1)

    // State to track users list
    // TODO: Obtain user list from database.
    const [users, setUsers] = useState([
        { username: "Mulcy", name: "Jack M", picture: "https://media-exp1.licdn.com/dms/image/C4D03AQGqkhwJ7lOgaw/profile-displayphoto-shrink_400_400/0/1627943347422?e=1637798400&v=beta&t=B_Pyxda4EmQptoamr55wpSWr7QSxZz7qUrI_oPjbdBg", favorite: false, key: '0' },
        { username: "Mayarox5", name: "Maya A", picture: "https://media-exp1.licdn.com/dms/image/D5635AQHNBHwnvHPtDw/profile-framedphoto-shrink_400_400/0/1632152430403?e=1633374000&v=beta&t=bdk_9ObWUNNDFgCIKNtrquz5P_wkvDHqIbyMz4zJHRs", favorite: false, key: '1' },
        { username: "Specticole", name: "Cole S", picture: "https://media-exp1.licdn.com/dms/image/C4D03AQFIfOQDa8Qm9g/profile-displayphoto-shrink_400_400/0/1537903746651?e=1637798400&v=beta&t=C3YfJZqTgGh7RzgZC1U0S64GepYcWr8OzOE0bURj7Kw", favorite: false, key: '2' },
        { username: "Rohet_Chitikela", name: "Rohet C", picture: "https://media-exp1.licdn.com/dms/image/C5603AQERqQbJGA8S7Q/profile-displayphoto-shrink_400_400/0/1600286036644?e=1637798400&v=beta&t=SBXfZiJAzXP7A9PSIDJDFdlfPMTuXJtU2XphXe3d_Q0", favorite: false, key: '3' },
        { username: "Suj2001", name: "Sujay V", picture: "https://media-exp1.licdn.com/dms/image/C4D03AQEVehgIRmBoAA/profile-displayphoto-shrink_400_400/0/1587057007307?e=1637798400&v=beta&t=M2-x-sZbm1s8TigO-3IROiis8ErdfaqrVyY7gQmqTrg", favorite: false, key: '4' },
        { username: "cadespector", name: "Cade S", picture: "https://media-exp1.licdn.com/dms/image/C4E03AQE7QpbWEbK02g/profile-displayphoto-shrink_400_400/0/1623100188390?e=1637798400&v=beta&t=WQL1HsOPTDXsAuVo4KVP1-GyN_f2QnOEEoDwtdDQvbA", favorite: false, key: '5' },
    ])

    // Load Montserrat font
    let [fontsLoaded] = useFonts({
        Montserrat_400Regular,
        Montserrat_500Medium,
    });

    const renderItem = ({ item }) => {
        const { username, name, picture, favorite, key } = item;
        return (
            <View style={styles.user}>
                <TouchableOpacity style={styles.usersummarycontainer} onPress={() => setSelectedUser((oldKey) => key === oldKey ? -1 : key)}>
                    <Image style={styles.userimage} source={{ uri: picture }} />
                    <View style={styles.usertextcontainer}>
                        <Text style={styles.username}>{username}</Text>
                        <Text style={styles.username}>{name}</Text>
                    </View>
                    <TouchableOpacity onPress={() => setUsers(users.map((user) => user.key == key ? { username, name, picture, favorite: !favorite, key } : user))}>
                        <Icon style={{ marginRight: 10 }} name={favorite ? "star" : "star-outline"} color="yellow" size={30} />
                    </TouchableOpacity>
                </TouchableOpacity>
                {selectedUser == key &&
                    <View style={styles.activebuttoncontainer}>
                        <View style={styles.activebuttonrow}>
                            <TouchableOpacity style={styles.activebutton}>
                                <Text style={styles.activebuttontext}>View Profile</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.activebutton}>
                                <Text style={styles.activebuttontext}>Make Buddy</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.activebuttonrow}>
                            <TouchableOpacity style={styles.activebutton}>
                                <Text style={styles.activebuttontext}>Invite to Party</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.activebutton}>
                                <Text style={styles.activebuttontext}>Join Party</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                }
            </View>
        )
    }
    return (
        <View style={styles.container}>
            {/* Search Bar */}
            <View style={styles.searchcontainer}>
                <Icon style={styles.icon} name='search' color='#0F2138' size={30} />
                <TextInput style={styles.searchbar} onChangeText={(newQuery) => setQuery(newQuery)} />
            </View>
            {/* Users List */}
            <FlatList style={{ width: "100%", marginTop: 5, marginBottom: 10 }} contentContainerStyle={styles.usercontainer} scrollEnabled={true} renderItem={renderItem} data={
                // Sort users first by if favorited then alphabetically
                users.sort(usersort)
                    // Filter out users whose name + username don't start with query
                    .filter(({ username, name }) => username.toLowerCase().startsWith(query.toLowerCase()) || name.toLowerCase().startsWith(query.toLowerCase()))
            } />
            <Toolbar navigation={navigation} />
        </View>
    );

}

// Function to sort user objects by if favorited and then alphabetically
function usersort(a, b) {
    if ((a.favorite && b.favorite) || !(a.favorite || b.favorite)) {
        return a.username < b.username ? -1 : (a.username > b.username ? 1 : 0)
    } else {
        return a.favorite ? -1 : 1
    }
}


const styles = StyleSheet.create({
    container: {
        width: "100%",
        paddingTop: 30,
        flex: 1,
        backgroundColor: '#0F2138',
        alignItems: 'center',
    },
    searchbar: {
        height: "100%",
        flex: 1,
        paddingVertical: 10,
        paddingHorizontal: 8,
        backgroundColor: '#0F2138',
        borderBottomRightRadius: 10,
        borderTopRightRadius: 10,
        color: '#D64F27',
        // fontFamily: 'Montserrat_500Medium',
    },
    searchcontainer: {
        backgroundColor: "#D64F27",
        width: "90%",
        marginHorizontal: 1,
        flexDirection: 'row',
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#D64F27",
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
        borderColor: "#D64F27",
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
        color: "#D64F27",
        // fontFamily: "Montserrat_500Medium"
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
        borderColor: "#D64F27",
        borderRadius: 10,
        borderWidth: 1,
        // boxShadow: "0px 2px 8px #D64F27",
    },
    activebuttontext: {
        color: "#D64F27",
        textAlign: "center",
        // fontFamily: "Montserrat_400Regular"
    }
});


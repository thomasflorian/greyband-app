// Import Dependencies 
import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Image, TouchableOpacity } from 'react-native';
import { useFonts, Montserrat_500Medium } from '@expo-google-fonts/montserrat';
import { Icon } from 'react-native-elements'

// Import Components
import Toolbar from '../components/Toolbar';


export default function FriendScreen({ navigation }) {

    // State to track search query
    const [query, setQuery] = useState("");

    // State to track friends list
    // TODO: Obtain friends list from database.
    const [friends, setFriends] = useState([{ username: "Mulcy", name: "Jack M", picture: "https://reactnative.dev/img/tiny_logo.png", favorite: true, key: 0 },
    { username: "Mayarox5", name: "Maya A", picture: "https://reactnative.dev/img/tiny_logo.png", favorite: false, key: 1 },
    { username: "Specticole", name: "Cole S", picture: "https://reactnative.dev/img/tiny_logo.png", favorite: false, key: 2 },
    { username: "Rohet_Chitikela", name: "Rohet C", picture: "https://reactnative.dev/img/tiny_logo.png", favorite: true, key: 3 }])

    // Load Montserrat font
    let [fontsLoaded] = useFonts({
        Montserrat_500Medium,
    });

    return (
        <View style={styles.container}>
            {/* Search Bar */}
            <View style={styles.searchcontainer}>
                <Icon style={styles.icon} name='search' color='#0F2138' size={30} />
                <TextInput style={styles.searchbar} onChangeText={(newQuery) => setQuery(newQuery)} />
            </View>
            {/* Friends List */}
            <View style={styles.friendcontainer}>
                {/* Sort friends first by if favorited then alphabetically */}
                {friends.sort(friendsort)
                    // Filter out friends whose name + username don't start with query
                    .filter(({ username, name }) => username.toLowerCase().startsWith(query.toLowerCase()) || name.toLowerCase().startsWith(query.toLowerCase()))
                    // Map friend object to component to display
                    .map(({ username, name, picture, favorite, key }) =>
                        <View style={styles.friend}>
                            <Image style={styles.friendimage} source={{ uri: picture }} />
                            <View style={styles.friendtextcontainer}>
                                <Text style={styles.friendname}>{username}</Text>
                                <Text style={styles.friendname}>{name}</Text>
                            </View>
                            <TouchableOpacity onPress={() => setFriends(friends.map((friend) => friend.key == key ? { username, name, picture, favorite: !favorite, key } : friend))}>
                                <Icon style={{ marginRight: 10 }} name={favorite ? "star" : "star-outline"} color="yellow" size={30} />
                            </TouchableOpacity>
                        </View>
                    )}
            </View>
            <Toolbar navigation={navigation} />
        </View>
    );
}

// Function to sort friend objects by if favorited and then alphabetically
function friendsort(a, b) {
    if ((a.favorite && b.favorite) || !(a.favorite || b.favorite)) {
        return a.username < b.username ? -1 : (a.username > b.username ? 1 : 0)
    } else {
        return a.favorite ? -1 : 1
    }
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
    searchbar: {
        width: "100%",
        height: "100%",
        paddingVertical: 10,
        paddingHorizontal: 8,
        backgroundColor: '#0F2138',
        borderBottomRightRadius: 10,
        borderTopRightRadius: 10,
        color: '#D64F27',
        fontFamily: 'Montserrat_500Medium',
    },
    searchcontainer: {
        backgroundColor: "#D64F27",
        width: "90%",
        flexDirection: 'row',
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#D64F27",
        borderRadius: 10,
        boxShadow: "0px 2px 4px #D64F27",
    },
    icon: {
        paddingHorizontal: 6
    },
    friendcontainer: {
        flex: 1,
        alignItems: "center",
        width: "100%",
        paddingVertical: 30,
    },
    friend: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        width: "90%",
        height: 100,
        paddingVertical: 10,
        marginVertical: 10,
        borderWidth: 1,
        borderColor: "#D64F27",
        borderRadius: 10,
        boxShadow: "0px 2px 4px #D64F27",
    },
    friendimage: {
        height: "100%",
        width: 100,
        resizeMode: "contain",
        marginRight: 10
    },
    friendname: {
        margin: 1,
        color: "#D64F27",
        fontSize: "1rem",
        fontFamily: "Montserrat_500Medium"
    },
    friendtextcontainer: {
        flex: 1,
        justifyContent: "center"
    }
});


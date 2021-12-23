import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { useFonts, Montserrat_400Regular, Montserrat_500Medium, Montserrat_700Bold } from '@expo-google-fonts/montserrat';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { UserdataContext } from './context/UserdataContext';
import Menubar from './components/Menubar';
import HomeScreen from './screens/HomeScreen';
import SearchScreen from './screens/SearchScreen';
import PartyScreen from './screens/PartyScreen';
import ProfileScreen from './screens/ProfileScreen';
import EditProfileScreen from './screens/EditProfileScreen';
import CreatePartyScreen from './screens/CreateParty';
import AppLoading from 'expo-app-loading';
import LoginScreen from './screens/LoginScreen';
import EntryScreen from './screens/EntryScreen';
import EmailScreen from './screens/registration/EmailScreen';
import UsernameScreen from './screens/registration/UsernameScreen';
import PasswordScreen from './screens/registration/PasswordScreen';
import { auth, db } from './src/database/firebase-index';


export default function App() {

  const [userdata, setUserdata] = useState(undefined);
  const Stack = createNativeStackNavigator();

  // Load Montserrat font
  let [fontsLoaded] = useFonts({
    Montserrat_500Medium,
    Montserrat_400Regular,
    Montserrat_700Bold
  });

  // Specify theme
  const theme = {
    dark: true,
    colors: {
      primary: '#D64F27',
      background: '#0F2138',
      card: '#0F2138',
      text: '#D64F27',
      border: '#D64F27',
      notification: '#D64F27',
    },
    font: {
      bold: "Montserrat_700Bold",
      light: "Montserrat_400Regular",
      regular: "Montserrat_500Medium",
    }
  };

  useEffect(() => {
    let userdataUnsub = () => {};
    const authUnsub = auth.onAuthStateChanged(user => {
      if (user) {
        const uid = auth.currentUser.uid;
        const userRef = db.collection("users").doc(uid);
        userdataUnsub(); // Unsubscribe from previous profile.
        userdataUnsub = userRef.onSnapshot((doc) => {setUserdata(doc.data())});
      } else {
        setUserdata(undefined);
      }
    });
    return () => {
      authUnsub();
      userdataUnsub();
    };
  }, []);

  if (userdata) {
    return (
      !fontsLoaded ? <AppLoading /> :
        <SafeAreaView style={styles(theme).container}>
          <NavigationContainer theme={theme}>
            <UserdataContext.Provider value={userdata}>
              <Menubar />
              <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false, gestureEnabled: false, animation: "none" }} >
                <Stack.Screen name="Search" component={SearchScreen} />
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="Party" component={PartyScreen} />
                <Stack.Screen name="Profile" component={ProfileScreen} />
                <Stack.Screen name="EditProfile" component={EditProfileScreen} />
                <Stack.Screen name="CreateParty" component={CreatePartyScreen} />
              </Stack.Navigator>
            </UserdataContext.Provider>
          </NavigationContainer>
          <StatusBar style="auto" />
        </SafeAreaView>
    );
  } else {
    return (
      !fontsLoaded ? <AppLoading /> :
        <SafeAreaView style={styles(theme).container}>
          <NavigationContainer theme={theme}>
            <Menubar />
            <Stack.Navigator initialRouteName="Entry" screenOptions={{ headerShown: false, gestureEnabled: false, animation: "none" }} >
              <Stack.Screen name="Entry" component={EntryScreen} />
              <Stack.Screen name="Login" component={LoginScreen} />
              <Stack.Screen name="Email" component={EmailScreen} />
              <Stack.Screen name="Username" component={UsernameScreen} />
              <Stack.Screen name="Password" component={PasswordScreen} />
            </Stack.Navigator>
          </NavigationContainer>
        </SafeAreaView>
    )
  }
}

const styles = theme => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    justifyContent: 'center',
  },
});
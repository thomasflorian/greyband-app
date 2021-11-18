import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useFonts, Montserrat_400Regular, Montserrat_500Medium, Montserrat_700Bold } from '@expo-google-fonts/montserrat';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Menubar from './components/Menubar'
import HomeScreen from './screens/HomeScreen'
import SearchScreen from './screens/SearchScreen';
import PartyScreen from './screens/PartyScreen';
import ProfileScreen from './screens/ProfileScreen';
import EditProfileScreen from './screens/EditProfileScreen';
import CreatePartyScreen from './screens/CreateParty';
import AppLoading from 'expo-app-loading';
import LoginScreen from './screens/login/LoginScreen';
import { auth, useAuthState } from './src/database/firebase-index';
import IntroScreen from './screens/login/IntroScreen';
import CreateAccountScreen from './screens/login/CreateAccountScreen';
import LegalScreen from './screens/login/LegalScreen';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  const LoggedInStack = createNativeStackNavigator();
  const LoggedOutStack = createNativeStackNavigator();

  // Load Montserrat font
  let [fontsLoaded] = useFonts({
    Montserrat_500Medium,
    Montserrat_400Regular,
    Montserrat_700Bold
  });


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
    auth.onAuthStateChanged(user => {
        if (user) {
            //user is logged in
            setIsLoggedIn(true)
        } else {
            //user is logged out
            setIsLoggedIn(false)
        }
    })
  }, [])  



  return (

    

    !fontsLoaded ? <AppLoading /> :
    <View style={styles(theme).container}>
      <NavigationContainer theme={theme}>
          {isLoggedIn ? (
            <>
            <Menubar />
            <LoggedInStack.Navigator initialRouteName="Home" screenOptions={{headerShown: false, gestureEnabled: false, animation: "none"}}>
              <LoggedInStack.Screen name="Search" component={SearchScreen} />
              <LoggedInStack.Screen name="Home" component={HomeScreen} />
              <LoggedInStack.Screen name="Party" component={PartyScreen} />
              <LoggedInStack.Screen name="Profile" component={ProfileScreen} />
              <LoggedInStack.Screen name="EditProfile" component={EditProfileScreen} />
              <LoggedInStack.Screen name="CreateParty" component={CreatePartyScreen} />
            </LoggedInStack.Navigator>
            
            </>
          ) : (
            <>
            <LoggedOutStack.Navigator initialRouteName="Legal" screenOptions={{headerShown: false}}>
              <LoggedOutStack.Screen name="Intro" component={IntroScreen} />
              <LoggedOutStack.Screen name="Login" component={LoginScreen} />
              <LoggedOutStack.Screen name="CreateAccount" component={CreateAccountScreen} />
              <LoggedOutStack.Screen name="Legal" component={LegalScreen} />
            </LoggedOutStack.Navigator>
            </>
        ) }
        
      </NavigationContainer>
    </View>
  )
   
  
    


}


const styles = theme => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    justifyContent: 'center',
    paddingTop: 30
  },
});


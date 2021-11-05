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
import { auth } from './src/database/firebase-index';
import IntroScreen from './screens/login/IntroScreen';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  const Stack = createNativeStackNavigator();

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
  })  

  if(isLoggedIn){
    return (
      !fontsLoaded ? <AppLoading /> :
      <View style={styles(theme).container}>
      <NavigationContainer theme={theme}>
        <Menubar />
        <Stack.Navigator initialRouteName="Home" screenOptions={{headerShown: false, gestureEnabled: false, animation: "none"}} >
          <Stack.Screen name="Search" component={SearchScreen} />
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Party" component={PartyScreen} />
          <Stack.Screen name="Profile" component={ProfileScreen} />
          <Stack.Screen name="EditProfile" component={EditProfileScreen} />
          <Stack.Screen name="CreateParty" component={CreatePartyScreen} />
        </Stack.Navigator>
      </NavigationContainer>
      <StatusBar style="auto" />
    </View>
    );
    
  } 
  return (
    <LoggedOutPath />
  );
   
  
    


}

// const LoggedInPath = ( {navigation }) => {

//   const Stack = createNativeStackNavigator();

//     // Load Montserrat font
//     let [fontsLoaded] = useFonts({
//       Montserrat_500Medium,
//       Montserrat_400Regular,
//       Montserrat_700Bold
//     });


//   const theme = {
//     dark: true,
//     colors: {
//       primary: '#D64F27',
//       background: '#0F2138',
//       card: '#0F2138',
//       text: '#D64F27',
//       border: '#D64F27',
//       notification: '#D64F27',
//     },
//     font: {
//       bold: "Montserrat_700Bold",
//       light: "Montserrat_400Regular",
//       regular: "Montserrat_500Medium",
//     }
//   };


//   return (
//      !fontsLoaded ? <AppLoading /> :
//       <View style={styles(theme).container}>
//       <NavigationContainer theme={theme}>
//         <Menubar />
//         <Stack.Navigator initialRouteName="Home" screenOptions={{headerShown: false, gestureEnabled: false, animation: "none"}} >
//           <Stack.Screen name="Search" component={SearchScreen} />
//           <Stack.Screen name="Home" component={HomeScreen} />
//           <Stack.Screen name="Party" component={PartyScreen} />
//           <Stack.Screen name="Profile" component={ProfileScreen} />
//           <Stack.Screen name="EditProfile" component={EditProfileScreen} />
//           <Stack.Screen name="CreateParty" component={CreatePartyScreen} />
//         </Stack.Navigator>
//       </NavigationContainer>
//       <StatusBar style="auto" />
//     </View>
//   );
// }

const LoggedOutPath = ( {navigation}) => {

  const Stack2 = createNativeStackNavigator();

  return (
    <NavigationContainer>
    <Stack2.Navigator initialRouteName="Intro" screenOptions={{headerShown: false}}>
      <Stack2.Screen name="Intro" component={IntroScreen} />
      <Stack2.Screen name="Login" component={LoginScreen} />
    </Stack2.Navigator>
  </NavigationContainer>
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


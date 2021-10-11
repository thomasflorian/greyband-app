import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Menubar from './components/Menubar'
import HomeScreen from './screens/HomeScreen'
import SearchScreen from './screens/SearchScreen';
import PartyScreen from './screens/PartyScreen';
import ProfileScreen from './screens/ProfileScreen';
import EditProfileScreen from './screens/EditProfileScreen';
import CreatePartyScreen from './screens/CreateParty';
export default function App() {

  const Stack = createNativeStackNavigator();


  return (
    <View style={styles.container}>
      <Menubar />
      <NavigationContainer >
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F2138',
    justifyContent: 'center',
    paddingTop: 30
  },
});

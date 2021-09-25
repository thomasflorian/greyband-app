import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Menubar from './components/Menubar'
import HomeScreen from './screens/HomeScreen'
import SearchScreen from './screens/SearchScreen';
import PartyScreen from './screens/PartyScreen'

export default function App() {
  return (
      <View style={styles.container}>
          {/* <Menubar /> */}
          <NavigationContainer initialRouteName="Party">
            <Stack.Navigator>
              <Stack.Screen name="Home" component={HomeScreen} options={{header: () => <Menubar />}}/>
              <Stack.Screen name="Friends" component={SearchScreen} options={{header: () => <Menubar />}}/>
              <Stack.Screen name="Party" component={PartyScreen} options={{header: () => <Menubar />}}/>
            </Stack.Navigator>
          </NavigationContainer>
        <StatusBar style="auto" />
      </View>
  );
}

const Stack = createNativeStackNavigator();

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
});

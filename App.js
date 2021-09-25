import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Menubar from './components/Menubar'
import HomeScreen from './screens/HomeScreen'
import FriendScreen from './screens/FriendScreen';

export default function App() {
  return (
      <View style={styles.container}>
          {/* <Menubar /> */}
          <NavigationContainer initialRouteName="Friends">
            <Stack.Navigator>
              <Stack.Screen name="Home" component={HomeScreen} options={{header: () => <Menubar />}}/>
              <Stack.Screen name="Friends" component={FriendScreen} options={{header: () => <Menubar />}}/>
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

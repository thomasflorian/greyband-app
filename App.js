import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Menubar from './components/Menubar'
import Toolbar from './components/Toolbar';
import HomeScreen from './screens/HomeScreen'

export default function App() {
  return (
    <View style={styles.container}>
      <Menubar />
      <HomeScreen />
      <Toolbar />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

import React from 'react'
import { StyleSheet, Text, View, SafeAreaView, Image, Dimensions, TouchableOpacity } from 'react-native'
import { useFonts, Montserrat_400Regular, Montserrat_500Medium, Montserrat_700Bold } from '@expo-google-fonts/montserrat';
import AppLoading from 'expo-app-loading';

const LOGO_PATH = '../../assets/images/logo_with_words.png'
const WIDTH = Dimensions.get('window').width * .85


const IntroScreen = ( {navigation }) => {

    let [fontsLoaded] = useFonts({
        Montserrat_500Medium,
        Montserrat_400Regular,
        Montserrat_700Bold
      });

    
    function logInClicked( {navigation} ) {
        navigation.navigate('Login')
    }
    
    

    return (
        !fontsLoaded ? <View />: //TODO: replace with AppLoading, just wasnt working for some reason
        <SafeAreaView style={styles.background}>
            <Image style={styles.logo_image} source={require(LOGO_PATH)}></Image>
            <Text style={styles.text} >For Nights{"\n"}Worth Remembering</Text>

            <TouchableOpacity onPress={navigation.navigate('Login')}>
                <Text>Already Have a GreySun Account?{"\n"}Sign In</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

export default IntroScreen



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

const styles = StyleSheet.create({
    background: {
        backgroundColor: theme.colors.background,
        flex: 1,
        justifyContent: 'center', 
        alignItems: 'center',
    },
    text: {
        flex: .5,
        color: theme.colors.text,
        fontFamily: theme.font.light,
        fontSize: 30,
        textAlign: 'center',
        textShadowColor: theme.colors.text,
        textShadowOffset: {width: 2.5, height: 5},
        textShadowRadius: 5,
        paddingTop: 10,
    },
    logo_image: {
        resizeMode: 'contain',
        width: WIDTH,
    },
})

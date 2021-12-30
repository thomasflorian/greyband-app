import React from 'react'
import { StyleSheet, Text, View, SafeAreaView, Image, Dimensions, TouchableOpacity, Button } from 'react-native'
import { useFonts, Montserrat_400Regular, Montserrat_500Medium, Montserrat_700Bold } from '@expo-google-fonts/montserrat';
import AppLoading from 'expo-app-loading';
import { useTheme } from '@react-navigation/native';
import CreateAccountScreen from './CreateAccountScreen';
import ProfileFactory from '../../src/users/ProfileFactory';

const LOGO_PATH = '../../assets/images/logo_with_words.png'
const WIDTH = Dimensions.get('window').width * .85


const IntroScreen = ( {navigation }) => {

    // Get theme variables
    const theme = useTheme()

    

    return (  
        <SafeAreaView style={styles(theme).background}>
            <Image style={styles(theme).logo_image} source={require(LOGO_PATH)}></Image>
            <Text style={styles(theme).shiny_text} >For Nights{"\n"}Worth Remembering</Text>
            <View style={styles(theme).button_container }>
                <Button 
                    onPress={() => navigation.navigate("CreateAccount", {profileFactory: new ProfileFactory()})}
                    color={theme.colors.background}
                    title="Get Started"
                />
            </View>
            <TouchableOpacity onPress={() => {navigation.navigate('Login')}}>
                <Text style={styles(theme).sign_in_text}>Already Have a GreySun Account?{"\n"}Sign In</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

export default IntroScreen




const styles = theme => (StyleSheet.create({
    background: {
        flex: 1,
        justifyContent: 'center', 
        alignItems: 'center',
    },
    shiny_text: {
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
    sign_in_text: {
        color: theme.colors.text,
        fontFamily: theme.font.light,
        fontSize: 12,
        textAlign: 'center',
        paddingTop: 5,
        

    },
    button_container: {
        backgroundColor: theme.colors.primary,
        borderRadius: 5,
        width: "70%",
        //Todo: add shadows
    },
}));
import React, { useState } from 'react'
import { StyleSheet, Text, View, Button, SafeAreaView, TouchableOpacity, Pressable, Dimensions } from 'react-native'
import { useTheme } from '@react-navigation/native';

const WIDTH = Dimensions.get('window').width

const LegalScreen = ({navigation}, props) => {
    const theme = useTheme();
    const [isAgeButtonActive, setIsAgeButtonActive] = useState(false);
    const [isLegalButtonActive, setIsLegalButtonActive] = useState(false);
    

    const changeButtonColor = () => {
        if (isButtonActive) {
            setButtonColor(theme.colors.background)
            setIsButtonActive(false)
        } else {
            setButtonColor(theme.colors.primary)
            setIsButtonActive(true)
        }
    }
    


    


    return (
        
        <SafeAreaView style={styles(theme).background}>

            <View style={{flex: .5}} />

            <Text style={styles(theme).title_text}>
                What Is Your Age
            </Text>

            <View style={{flex: .5}} />

            <AgreeBox
                text={"Check this box to\nconfirm you are over 21"}
                isButtonActive={isAgeButtonActive}
                setIsButtonActive={setIsAgeButtonActive}
            />

            <View style={styles(theme).button_container }>
                <Button 
                    onPress={() => { /* TODO: Create Policy Screen */}}
                    color={theme.colors.primary}
                    title="Click to read Policy"
                />
            </View>

            <TouchableOpacity 
                onPress={() => {navigation.goBack()}}
                style={styles(theme).text_holder}
                >
                <Text style={styles(theme).go_back_text}>Go Back</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )



    
}

export default LegalScreen

const AgreeBox = (props) => {
    const theme = useTheme()
    const [buttonColor, setButtonColor] = useState(theme.colors.background)



    const changeButtonColor = () => {
        if (props.isButtonActive) {
            setButtonColor(theme.colors.background)
            props.setIsButtonActive(false)
        } else {
            setButtonColor(theme.colors.primary)
            props.setIsButtonActive(true)
        }
    }

    return(
        <View style={styles(theme).horizontal_view}>
            <Text style={styles(theme).agree_text}>
                {props.text}
            </Text>
            <TouchableOpacity 
                onPress={changeButtonColor}
                style={{
                    // flex: 1,
                    backgroundColor: buttonColor,
                    borderColor: theme.colors.primary,
                    borderWidth: 1,
                    borderRadius: 5,
                    // justifyContent: 'flex-start',
                    // alignContent: 'center',
                    height: 40,
                    width: 40,

                }}
            />
            
        </View>
    )
    
}

const styles = theme => (StyleSheet.create({
    background: {
        flex: 1,
        justifyContent: 'space-evenly', 
        alignItems: 'center',
    },
    go_back_text: {
        color: theme.colors.text,
        fontFamily: theme.font.light,
        fontSize: 12,
        textAlign: 'center',
        paddingTop: 5,
        

    },
    title_text: {
        flex: 1,
        color: theme.colors.text,
        fontFamily: theme.font.bold,
        fontSize: 30,
        textAlign: 'center',
        shadowColor: theme.colors.text,
        textShadowOffset: {width: 2.5, height: 5},
        textShadowRadius: 5,
        padding: 10,
        justifyContent: 'center',
        alignContent: 'center',

    },
    buffer_1: {
        flex: 1,
    },
    text_holder: {
        flex: 1,
    },
    horizontal_view: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignContent: 'center',
        width: WIDTH,
    },
    agree_text: {
        // flex: 1,
        color: theme.colors.text,
        fontFamily: theme.font.light,
        fontSize: 12,
        textAlign: 'center',
        paddingTop: 5,
        // justifyContent: 'flex-start',
        // alignContent: 'center',
    },
    button_container: {
        backgroundColor: theme.colors.background,
        borderColor: theme.colors.primary,
        borderRadius: 5,
        borderWidth: 1,
        width: "70%",
        //Todo: add shadows
    },
}));

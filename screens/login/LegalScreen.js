import React, { useState } from 'react'
import { StyleSheet, Text, View, Button, SafeAreaView, TouchableOpacity, Pressable } from 'react-native'
import { useTheme } from '@react-navigation/native';

const LegalScreen = ({navigation}, props) => {
    const theme = useTheme();
    const [buttonColor, setButtonColor] = useState(theme.colors.background)
    const [isButtonActive, setIsButtonActive] = useState(false);

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

            <View style={styles(theme).horizontal_view}>
                <Text style={styles(theme).agree_text}>
                    Hi
                </Text>
                <TouchableOpacity 
                    onPress={changeButtonColor}
                    style={{
                        backgroundColor: buttonColor,
                        borderColor: theme.colors.primary,
                        borderWidth: 1,
                        borderRadius: 5,
                        justifyContent: 'center',
                        alignContent: 'center',
                        height: 30,
                        width: 30, 
                    }}
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

// const AgreeBox = (props) => {
//     const theme = useTheme()
//     const [buttonColor, setButtonColor] = useState(theme.colors.background)
//     const [isButtonActive, setIsButtonActive] = useState(false);


//     const changeButtonColor = () => {
//         if (isButtonActive) {
//             setButtonColor(theme.colors.background)
//             setIsButtonActive(false)
//         } else {
//             setButtonColor(theme.colors.primary)
//             setIsButtonActive(true)
//         }
//     }

//     return(
//         <View style={styles(theme).horizontal_view}>
//         <Text style={styles(theme).agree_text}>
//             {props.text}
//         </Text>
//         <TouchableOpacity 
//             onPress={changeButtonColor}
//         >
//             <View style={{
//                 flex: 1,
//                 backgroundColor: buttonColor,
//                 borderColor: theme.colors.primary,
//                 borderWidth: 1,
//                 borderRadius: 5,
//                 justifyContent: 'center',
//                 alignContent: 'center',
//             }} />
//         </TouchableOpacity>
//     </View>
//     )
    
// }

const styles = theme => (StyleSheet.create({
    background: {
        flex: 1,
        justifyContent: 'center', 
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

    },
    buffer_1: {
        flex: 1,
    },
    text_holder: {
        flex: 1,
    },
    horizontal_view: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignContent: 'center',
    },
    agree_text: {
        color: theme.colors.text,
        fontFamily: theme.font.light,
        fontSize: 20,
        textAlign: 'center',
        paddingTop: 5,
    }
}));

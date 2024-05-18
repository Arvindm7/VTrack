import React from 'react';
import {
    SafeAreaView,
    StyleSheet,
    Image,
    Text,
    TouchableOpacity,
    Button
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
const CarDriving = require('../Images/OnBoarding3.png')
const Progress = require('../Images/progress3.png')
const Scroll = require('../Images/Scroll3.png')
function Onboarding3() {

    const navigation = useNavigation();

    const handleProgressPress = () => {
        navigation.navigate('GetStarted');
    }



    return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity onPress={handleProgressPress}>
                <Image source={Progress} style={styles.progress} />
            </TouchableOpacity>
            <Image source={Scroll} style={styles.scroll} />
            <Image source={CarDriving} style={styles.content} />
            <Text style={styles.text}>Start planning your trips and save time on the road</Text>
        </SafeAreaView>

    );
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#263238',
        flex: 1,
    },
    content: {
        height: 221.33,
        width: 332,
        position: 'absolute',
        top: 267, // Adjust the top position as needed
        left: 37, // Adjust the left position as needed
        resizeMode: 'contain', // Adjust the image resize mode as needed

    },
    text: {
        color: '#FFFFFF',
        position: 'absolute',
        top: 553,
        left: 30,
        width: 330,
        fontSize: 31,
        fontFamily: 'roboto'
    },
    button: {
        backgroundColor: '#263238',
        height: 20,
        width: 32,
        left: 330,
        top: 70
    },

    buttonText: {
        fontSize: 16,
        color: '#80F17E',
    },

    progress: {
        position: 'absolute',
        height: 68,
        width: 68,
        left: 292,
        top: 728
    },

    scroll: {
        position: 'absolute',
        left: 30,
        top: 757,
        height: 10,
        width: 66
    }



})


export default Onboarding3;
import React from 'react';
import {
    SafeAreaView,
    StyleSheet,
    Image,
    Text,
    TouchableOpacity,
    StatusBar,
    Button
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const CarDriving = require('../Images/CarDrivingImage.png')
const Progress = require('../Images/Progress.png')
const Scroll = require('../Images/Scroll.png')

function Onboarding1() {
    const navigation = useNavigation();

    const handleProgressPress = () => {
        navigation.navigate('Onboarding2');
    };

    const handleSkipPress = () => {
        navigation.navigate('HomeNavigation');
    }



    return (

        <SafeAreaView style={styles.container}>
            <StatusBar backgroundColor="#1C2129" barStyle="light-content" />
            <TouchableOpacity style={styles.button} onPress={handleSkipPress}>
                <Text style={styles.buttonText}>Skip</Text>
            </TouchableOpacity>
            <Image
                source={CarDriving}
                style={styles.image}
            />
            <Text style={styles.text}>
                Start planning your trips and save time on the road
            </Text>
            <Image
                source={Scroll}
                style={styles.smallImage}
            />
            <TouchableOpacity style={styles.arrowButtonContainer} onPress={handleProgressPress}>
                <Image
                    source={Progress}
                    style={styles.arrowButton}
                />
            </TouchableOpacity>
        </SafeAreaView>

    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1c2129',
        alignItems: 'center',
    },
    image: {
        marginTop: 240,
        marginBottom: 50,
    },
    button: {
        position: 'absolute',
        top: 20,
        right: 30,
    },
    buttonText: {
        fontSize: 16,
        color: '#80F17E',
    },
    text: {
        fontSize: 31,
        color: 'white',
        textAlign: 'left',
        width: 335,
    },
    smallImage: {
        position: 'absolute',
        bottom: 70,
        left: 40,
        width: 66,
        height: 10,
    },
    arrowButtonContainer: {
        position: 'absolute',
        bottom: 40,
        right: 40,
        width: 68,
        height: 68,
    },
    arrowButton: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
    },
});

export default Onboarding1;
import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import Car4 from "../Images/Car4.png"
import PrimaryButton from "../components/PrimaryButton"
import SecondartButton from "../components/SecondartButton"
import { SafeAreaView } from 'react-native-safe-area-context';

const GetStarted = () => {
    return (
        <SafeAreaView style={styles.container}>
            <Image source={Car4} style={styles.content} />
            <Text style={styles.heading}>Get Started!</Text>
            <View style={styles.container2}>
                <PrimaryButton title="Create Account" onPress={() => console.log("Create Account")} />
                <SecondartButton title="Sign In" onPress={() => console.log("Login")} />
            </View>
        </SafeAreaView>

    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#263238'
    },
    content: {
        width: 334.5,
        height: 223,
        top:266,
        resizeMode: 'contain',
        position: 'absolute',
    },
    heading: {
        position: 'absolute',
        fontSize: 31,
        color: '#FFFFFF',
        top: 553,
    },
    container2: {
        position: 'absolute',
        top:677,
    }

});

export default GetStarted;

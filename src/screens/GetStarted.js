import React from 'react';
import { View, Text, StyleSheet, StatusBar, Image, TouchableOpacity } from 'react-native';
import Car4 from "../Images/Car4.png"
import PrimaryButton from "../components/PrimaryButton"
import SecondaryButton from "../components/SecondaryButton"
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

const GetStarted = () => {
    const navigation = useNavigation();

    const handlePhoneNoPage = () => {
        navigation.navigate('PhoneNo');
    };

    
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar backgroundColor="#1C2129" barStyle="light-content" />
            <Image
                source={Car4}
                style={styles.image}
            />
            <Text style={styles.text}>
                Get Started
            </Text>
            <View style={styles.container2}>
                <PrimaryButton title="Create Account" onPress={handlePhoneNoPage} />
                <SecondaryButton title="Sign In" onPress={handlePhoneNoPage} />
            </View>
        </SafeAreaView>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1c2129',
        alignItems: 'center',
    },
    container2: {
        marginTop: 60,
    },
    image: {
        marginTop: 240,
        marginBottom: 50,
    },
    text: {
        fontSize: 31,
        color: 'white',
        textAlign: 'center',
        width: 335,
    },
});
export default GetStarted;

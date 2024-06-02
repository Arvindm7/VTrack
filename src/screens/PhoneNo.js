import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, TextInput, StyleSheet, TouchableOpacity, StatusBar, Alert } from 'react-native';
import CountryPicker from 'react-native-country-picker-modal';
import PrimaryButton from "../components/PrimaryButton";
import SecondaryButton from "../components/SecondaryButton";
import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';


const PhoneNo = () => {
    const navigation = useNavigation();
    
    const [countryCode, setCountryCode] = useState('IN');
    const [callingCode, setCallingCode] = useState('91');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [withCountryNameButton, setWithCountryNameButton] = useState(false);
    const [confirmData, setConfirmData] = useState(null);
    const [withAlphaFilter, setWithAlphaFilter] = useState(true);
    const [withCallingCode, setWithCallingCode] = useState(true);
    const [cooldown, setCooldown] = useState(false);

    useEffect(() => {
        if (cooldown) {
            const timer = setTimeout(() => setCooldown(false), 60000); // 60 seconds cooldown to request for OTP again
            return () => clearTimeout(timer);
        }
    }, [cooldown]);


    const sendOTP = async () => {
        if (cooldown) {
            Alert.alert('Cooldown', 'Please wait before requesting another OTP.');
            return;
        }
        if (phoneNumber && phoneNumber.toString().length === 10) {
            try {
                const fullPhoneNumber = `+${callingCode}${phoneNumber}`;
                const response = await auth().signInWithPhoneNumber(fullPhoneNumber);
                setConfirmData(response);
                Alert.alert('OTP Sent', `OTP has been sent to +${countryCode} ${phoneNumber}`);
                setCooldown(true);
                navigation.navigate('OtpPage', { confirmData: response }); //passing the OTP value to next page
            } catch (error) {
                if (error.code === 'auth/network-request-failed') {
                    Alert.alert('Network Error', 'A network error has occurred. Please check your internet connection and try again.');
                } else {
                    Alert.alert('Error', error.message);
                }
                console.error(error);
            }
        } else {
            Alert.alert('Error', 'Please enter a valid phone number');
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar backgroundColor="#1C2129" barStyle="light-content" />
            <View style={styles.header}>
                <Text style={styles.title}>Sign Up</Text>
            </View>
            <Text style={styles.phoneTextPrompt}>Phone Number</Text>
            <View style={styles.phoneNumberContainer}>
                <CountryPicker
                    countryCode={countryCode}
                    withFilter
                    withFlag
                    withCountryNameButton={withCountryNameButton}
                    withAlphaFilter={withAlphaFilter}
                    withCallingCode={withCallingCode}
                    onSelect={(country) => {
                        setCountryCode(country.cca2);
                        setCallingCode(country.callingCode[0]);
                    }}
                />
                <Text style={styles.countryCode}>+{callingCode}</Text>
                <TextInput
                    style={styles.phoneNumberInput}
                    placeholder="000 000 0000"
                    keyboardType="phone-pad"
                    value={phoneNumber}
                    onChangeText={setPhoneNumber}
                />
            </View>
            <TouchableOpacity style={styles.otpButton}>
                <PrimaryButton title="Continue" onPress={sendOTP} />
            </TouchableOpacity>
            <View style={styles.otpButton}>
                <SecondaryButton title="Continue with Google" onPress={() => console.log("Skip pressed")} />
            </View>
            {/* <View style={styles.otpButton}>
                <SecondaryButton title="Proceed" onPress={() => navigation.navigate('OtpPage', { confirmData })} />
            </View> */}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1C2129',
        paddingHorizontal: 20,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 20,
        // flexDirection: 'row',
        // alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        color: '#ffffff',
        fontSize: 24,
        fontWeight: 'bold',
    },
    phoneTextPrompt: {
        color: '#ffffff',
        paddingTop: 20,
        paddingBottom: 0,
        fontSize: 16,
    },
    phoneNumberContainer: {
        flexDirection: 'row',
        alignItems: 'center',

        borderColor: '#333',
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
        marginTop: 10,
        width: 330,
    },
    countryCode: {
        color: '#ffffff',
        fontSize: 16,
        marginLeft: 10,
    },
    phoneNumberInput: {
        flex: 1,
        color: '#ffffff',
        fontSize: 16,
        marginLeft: 10,
    },
    otpButton: {
        // backgroundColor: '#1E90FF',
        // padding: 15,
        // borderRadius: 10,
        alignItems: 'center',
        // marginTop: 20,
    },
    otpButtonText: {
        color: '#ffffff',
        fontSize: 16,
    },
});

export default PhoneNo;

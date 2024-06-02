import React, { useState, useRef } from 'react';
import { SafeAreaView, View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import auth from '@react-native-firebase/auth';

const OtpPage = ({ navigation, route }) => {
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const [resendEnabled, setResendEnabled] = useState(true);
    const inputs = useRef([]);
    const confirmData = route.params.confirmData;

    const handleChangeText = (text, index) => {
        let newOtp = [...otp];
        newOtp[index] = text;
        setOtp(newOtp);

        if (text && index < 5) {
            inputs.current[index + 1].focus();
        }

        if (index === 5) {
            verifyOtp(newOtp.join(''));
        }
    };

    const handleResendOtp = () => {
        if (resendEnabled) {
            // Logic to resend OTP has not been added yet. [ ... Pending Work to be done after all setup  ]
            setResendEnabled(false);
            setTimeout(() => setResendEnabled(true), 60000); // Enable resend after 60 seconds
            Alert.alert('OTP Resent', 'A new OTP has been sent to your phone number.');
        }
    };

    const verifyOtp = async (otpCode) => {
        try {
            await confirmData.confirm(otpCode); // verification logic
            Alert.alert('OTP Verified', 'Your phone number has been successfully verified!');
            // Navigate to the next screen or home screen after successful verification
            navigation.navigate('Onboarding1'); // replace the screen with the HOME page which will be designed noe [includes maps in background]
        } catch (error) {
            Alert.alert('Error', 'Invalid OTP. Please try again.');
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>OTP Verification</Text>
            <Text style={styles.prompt}>Please verify by entering the code that was sent to your phone number</Text>

            {/* The OTP isn't getting popped away if clicked delete button of phone. Its only getting popped away if the back button is tapped after keeping the cursor in that particular box  */}
            <View style={styles.otpContainer}>
                {otp.map((digit, index) => (
                    <TextInput
                        key={index}
                        style={styles.otpInput}
                        keyboardType="numeric"
                        maxLength={1}
                        value={digit}
                        onChangeText={(text) => handleChangeText(text, index)}
                        ref={(ref) => inputs.current[index] = ref}
                    />
                ))}
            </View>
            <View style={styles.resendContainer}>
                <Text>Didn't receive code? </Text>
                <TouchableOpacity onPress={handleResendOtp} disabled={!resendEnabled}>
                    <Text style={[styles.resendText, !resendEnabled && { color: 'gray' }]}>resend</Text>
                </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.verifyButton} onPress={() => verifyOtp(otp.join(''))}>
                <Text style={styles.verifyButtonText}>Verify</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1C2129',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    title: {
        fontSize: 24,
        color: '#fff',
        marginBottom: 20,
    },
    prompt: {
        color: '#fff',
        textAlign: 'center',
        marginBottom: 20,
    },
    otpContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
        // padding: ,
    },
    otpInput: {
        width: 40,
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        textAlign: 'center',
        backgroundColor: '#fff',
        color: '#000',
        fontSize: 18,
        paddingRight: 2,
    },
    resendContainer: {
        flexDirection: 'row',
        marginBottom: 20,
    },
    resendText: {
        color: 'green',
    },
    verifyButton: {
        backgroundColor: '#fff',
        paddingVertical: 10,
        paddingHorizontal: 40,
        borderRadius: 20,
    },
    verifyButtonText: {
        color: '#1C2129',
        fontSize: 18,
    },
});

export default OtpPage;

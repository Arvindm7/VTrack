import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Alert, ActivityIndicator, ScrollView } from 'react-native';
import { KeyboardAvoidingView, Platform } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { StyleSheet } from 'react-native';
import PrimaryButton from '../components/PrimaryButton';
import firestore from '@react-native-firebase/firestore';
import { useRoute } from '@react-navigation/native';
import { useAuth } from '../Context/AuthProvider';

const DriverInfoScreen = () => {
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [gender, setGender] = useState('');
    const [email, setEmail] = useState('');
    const [vehicle, setVehicle] = useState('');
    const [licenseNumber, setLicenseNumber] = useState('');
    const [loading, setLoading] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState('');

    // Hook to access the current route and its parameters
    const route = useRoute();
    const { firebaseId } = route.params;// Extract firebaseId from route parameters

    const { isLogged, setIsLogged } = useAuth();

    useEffect(() => {
        const fetchPhoneNumber = async () => {
            try {
                // Fetch the document from Firestore using the provided firebaseId
                const doc = await firestore().collection('phoneNumbers').doc(firebaseId).get();
                if (doc.exists) {
                    setPhoneNumber(doc.data().number);// Set the phone number state if document exists
                } else {
                    Alert.alert('Error', 'Phone number not found');
                }
            } catch (error) {
                console.error('Error fetching phone number: ', error);
                Alert.alert('Error', 'Failed to fetch phone number');
            } finally {
                setLoading(false);
            }
        };

        fetchPhoneNumber();
    }, [firebaseId]);//

    const handleSubmit = async () => {
        if (!firebaseId || !name || !gender || !age || !vehicle || !licenseNumber) {
            Alert.alert('Error', 'All fields are required');
            return;
        }

        try {
            // Set loading to true while fetching data
            setLoading(true);
            const driverData = {
                firebaseId,
                name,
                age,
                gender,
                vehicle,
                licenseNumber,
                phoneNumber,
                email,
            };

            // Send a POST request to the server with user data
            const response = await fetch('http://192.168.1.2:3000/api/drivers', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(driverData),
            });

            if (response.ok) {
                setLoading(false);
                Alert.alert('Success', 'Driver information saved successfully');
                setIsLogged(!isLogged);
            } else {
                const errorText = await response.text();
                Alert.alert('Error', `Failed to save driver information: ${errorText}`);
            }
        } catch (error) {
            setLoading(false);
            console.error('Error saving driver information: ', error);
            Alert.alert('Error', 'Failed to save driver information');
        }
    };

    // Show loading indicator while fetching data
    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    return (

        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>More About You</Text>
            <Text style={styles.name}>Name</Text>
            <TextInput
                style={styles.input_name}
                placeholder="Full name"
                placeholderTextColor="#888888"
                value={name}
                onChangeText={setName}
            />
            <Text style={styles.email}>Email-Address</Text>
            <TextInput
                style={styles.input_email}
                placeholder="Email-address"
                placeholderTextColor="#888888"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
            />
            <Text style={styles.gender}>Gender</Text>
            {/* <TextInput
        style={styles.input_gender}
        placeholder="Gender"
        placeholderTextColor="#888888"
        value={gender}
        onChangeText={setGender}
      /> */}
            <TextInput>

            </TextInput>
            <Picker
                selectedValue={gender}
                onValueChange={(itemValue) => setGender(itemValue)}
                style={styles.input_gender}
            >
                <Picker.Item label="Select gender" value="" />
                <Picker.Item label="Male" value="male" />
                <Picker.Item label="Female" value="female" />
                <Picker.Item label="Other" value="other" />
            </Picker>
            <Text style={styles.age}>Age</Text>
            <TextInput
                style={styles.input_age}
                placeholder="Age"
                placeholderTextColor="#888888"
                value={age}
                onChangeText={setAge}
                keyboardType="numeric"
            />
            
            <Text style={styles.vehicle}>Vehicle</Text>
            <TextInput
                style={styles.input_vehicle}
                placeholder="Vehicle"
                placeholderTextColor="#888888"
                value={vehicle}
                onChangeText={setVehicle}
            />
            <Text style={styles.licenseNumber}>License Number</Text>
            <TextInput
                style={styles.input_licenseNumber}
                placeholder="License Number"
                placeholderTextColor="#888888"
                value={licenseNumber}
                onChangeText={setLicenseNumber}
            />
            <View style={styles.button}>
                <PrimaryButton title="Proceed" onPress={handleSubmit} />
            </View>

        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        //justifyContent: 'center',
        padding: 16,
        backgroundColor: '#1c2129',
    },
    title: {
        position: 'absolute',
        fontSize: 24,
        top: 56,
        left: 111,
        color: '#EDF6FF',

    },
    input_name: {
        position: 'absolute',
        color: '#EDF6FF',
        borderColor: 'white',
        height: 52,
        width: 330,
        left: 40,
        top: 138,
        borderWidth: 1,
        borderRadius: 15,
        paddingHorizontal: 8,
    },
    input_email: {
        position: 'absolute',
        color: '#EDF6FF',
        borderColor: 'white',
        height: 52,
        width: 330,
        left: 40,
        top: 235,
        borderWidth: 1,
        borderRadius: 15,
        paddingHorizontal: 8,
    },
    input_gender: {
        position: 'absolute',
        color: '#EDF6FF',
        borderColor: 'white',
        height: 52,
        width: 330,
        left: 40,
        top: 336,
        borderWidth: 1,
        borderRadius: 15,
        paddingHorizontal: 8,
        borderColor: 'white',

    },
    input_age: {
        position: 'absolute',
        color: '#EDF6FF',
        borderColor: 'white',
        height: 52,
        width: 330,
        left: 40,
        top: 435,
        borderWidth: 1,
        borderRadius: 15,
        paddingHorizontal: 8,
    },
    input_vehicle: {
        position: 'absolute',
        color: '#EDF6FF',
        borderColor: 'white',
        height: 52,
        width: 330,
        left: 40,
        top: 534,
        borderWidth: 1,
        borderRadius: 15,
        paddingHorizontal: 8,
    },
    input_licenseNumber: {
        position: 'absolute',
        color: '#EDF6FF',
        borderColor: 'white',
        height: 52,
        width: 330,
        left: 40,
        top: 633,
        borderWidth: 1,
        borderRadius: 15,
        paddingHorizontal: 8,
    },
    name: {
        position: 'absolute',
        color: '#EDF6FF',
        left: 40,
        top: 112,
        fontSize: 16,

    },
    email: {
        position: 'absolute',
        color: '#EDF6FF',
        left: 40,
        top: 209,
        fontSize: 16,
    },
    gender: {
        position: 'absolute',
        color: '#EDF6FF',
        left: 40,
        top: 308,
        fontSize: 16,
    },
    age: {
        position: 'absolute',
        color: '#EDF6FF',
        left: 40,
        top: 407,
        fontSize: 16,
    },
    vehicle: {
        position: 'absolute',
        color: '#EDF6FF',
        left: 40,
        top: 506,
        fontSize: 16,
    },
    licenseNumber: {
        position: 'absolute',
        color: '#EDF6FF',
        left: 40,
        top: 605,
        fontSize: 16,
    },
    button: {
        // backgroundColor: '#FFFFFF',
        borderRadius: 25,
        padding: 15,
        width: 330,
        height: 52,
        alignItems: 'center',
        left: 30,
        top: 660,
    },



});

export default DriverInfoScreen;


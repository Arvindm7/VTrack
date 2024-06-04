import React, { useEffect } from 'react';
import {
    PermissionsAndroid,
    Text,
    View,
} from 'react-native';

import { Alert } from 'react-native';

const requestLocationPermission = async () => {
    try {
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
                title: 'VTrack Location Permission',
                message:'VTrack needs access to your location',
                buttonNeutral: 'Ask Me Later',
                buttonNegative: 'Cancel',
                buttonPositive: 'OK',
            },
        );

        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log('You can use the location');
            // You can now use the location
        } else {
            console.log('Location permission denied');
            // Show an alert to the user
            Alert.alert(
                'Location Permission Denied',
                'This app requires location permissions to function. Please go to settings and enable them.',
                [
                    { text: 'OK', onPress: () => console.log('OK Pressed') }
                ],
                { cancelable: false },
            );
        }
    } catch (err) {
        console.warn(err);
    }
};
const HomeScreen = () => {
    useEffect(() => {
        requestLocationPermission();
    },[]);

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Home!</Text>
        </View>
    );
};

export default HomeScreen;
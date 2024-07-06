import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    View,
    PermissionsAndroid,
    Platform,
    Alert,
    TouchableOpacity,
    Text,
    Dimensions
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

const requestLocationPermission = async () => {
    try {
        if (Platform.OS === 'android') {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                {
                    title: 'VTrack Location Permission',
                    message: 'VTrack needs access to your location',
                    buttonNeutral: 'Ask Me Later',
                    buttonNegative: 'Cancel',
                    buttonPositive: 'OK',
                },
            );

            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log('You can use the location');
            } else {
                console.log('Location permission denied');
                Alert.alert(
                    'Location Permission Denied',
                    'This app requires location permissions to function. Please go to settings and enable them.',
                    [
                        { text: 'OK', onPress: () => console.log('OK Pressed') }
                    ],
                    { cancelable: false },
                );
            }
        }
    } catch (err) {
        console.warn(err);
    }
};

const HomeScreen = () => {
    const [region, setRegion] = useState({
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    });

    const [location, setLocation] = useState(null);
    const [showSearchBox, setShowSearchBox] = useState(false);

    useEffect(() => {
        requestLocationPermission();
        Geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                setRegion({
                    ...region,
                    latitude,
                    longitude,
                });
                setLocation({
                    latitude,
                    longitude,
                });
            },
            (error) => {
                console.error(error);
            },
            {
                enableHighAccuracy: true,
                timeout: 15000,
                maximumAge: 10000
            }
        );
    }, []);

    return (
        <View style={styles.container}>
            <MapView
                style={styles.map}
                region={region}
                onRegionChangeComplete={(region) => setRegion(region)}
                showsUserLocation={true}
                followsUserLocation={true}
            >
                {location && (
                    <Marker
                        coordinate={location}
                        title="Your Location"
                    />
                )}
            </MapView>
            <View style={styles.searchContainer}>
                <TouchableOpacity
                    style={styles.searchBox}
                    onPress={() => setShowSearchBox(!showSearchBox)}
                >
                    <Text style={styles.searchText}>Search Destination</Text>
                </TouchableOpacity>
                {showSearchBox && (
                    <View style={styles.autocompleteContainer}>
                        <GooglePlacesAutocomplete
                            placeholder="Search Destination"
                            fetchDetails={true}
                            onPress={(data, details = null) => {
                                const { lat, lng } = details.geometry.location;
                                setRegion({
                                    ...region,
                                    latitude: lat,
                                    longitude: lng,
                                });
                                setShowSearchBox(false);
                            }}
                            query={{
                                key: 'AIzaSyAJxnPGGuCKMVXOlHZtLVpC5fRPdq3N8TA',  // Replace with your Google API key
                                language: 'en',
                            }}
                            styles={{
                                textInputContainer: styles.textInputContainer,
                                textInput: styles.textInput,
                                listView: styles.listView,
                            }}
                        />
                    </View>
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        flex: 1,
    },
    searchContainer: {
        position: 'absolute',
        top: 50,
        left: 10,
        right: 10,
    },
    searchBox: {
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 5,
        elevation: 5,
    },
    searchText: {
        fontSize: 16,
    },
    autocompleteContainer: {
        position: 'absolute',
        top: 60, // Adjust according to your UI
        width: Dimensions.get('window').width - 20,
    },
    textInputContainer: {
        width: '100%',
        backgroundColor: '#fff',
    },
    textInput: {
        height: 40,
        color: '#5d5d5d',
        fontSize: 16,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 5,
        paddingHorizontal: 10,
    },
    listView: {
        backgroundColor: '#fff',
    },
});

export default HomeScreen;

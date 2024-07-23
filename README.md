# VTrack: Real-time Vehicle Tracking and Booking System

## Objectives
1. Develop a mobile app for real-time tracking and booking of rented cars.
2. Implement secure user authentication and data management.
3. Integrate real-time maps for vehicle tracking.
4. Ensure a seamless user experience across devices.

## Introduction
VTrack enhances efficiency in the vehicle rental industry by offering real-time tracking, booking, and management through a user-friendly mobile app. It uses Firebase for authentication, MongoDB for data management, and Google Maps API for real-time tracking.

## System Model
- **Frontend**: React Native for cross-platform consistency.
- **Backend**: Firebase for authentication and real-time DB management; MongoDB for complex data storage.
- **Maps Integration**: Google Maps API for real-time tracking.
- **OTP Verification**: Secure OTP-based user verification using Firebase Authentication.

## Flowchart
1. **User Registration/Login**:
   - Enter phone number
   - OTP sent and verified
   - User details stored

2. **Vehicle Booking**:
   - Select a vehicle
   - Confirm booking details
   - Store booking details

3. **Real-time Tracking**:
   - Track vehicle in real-time using Google Maps

## Implementation Details

### OTP Function
```javascript
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const sendOTP = async (phoneNumber, countryCode) => {
  try {
    const fullPhoneNumber = `+${countryCode}${phoneNumber}`;
    const response = await auth().signInWithPhoneNumber(fullPhoneNumber);
    setConfirmData(response);
    Alert.alert('OTP Sent', `OTP has been sent to +${countryCode} ${phoneNumber}`);

    // Save phone number to Firestore
    const docRef = await firestore().collection('phoneNumbers').add({
      number: phoneNumber,
      timestamp: firestore.FieldValue.serverTimestamp(),
    });

    return { success: true, docId: docRef.id, confirmData: response };
  } catch (error) {
    console.error(error);
    return { success: false, error: error.message };
  }
};
```

### Maps Fetching Code
```javascript
import MapView, { Marker } from 'react-native-maps';
import React from 'react';
import { View, StyleSheet } from 'react-native';

const MapScreen = ({ route }) => {
  const { latitude, longitude } = route.params;

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: latitude,
          longitude: longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <Marker
          coordinate={{ latitude: latitude, longitude: longitude }}
          title={"Vehicle Location"}
        />
      </MapView>
    </View>
  );
};

export default MapScreen;
```

### DB Connection (MongoDB)
```javascript
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://your_mongo_db_uri', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected...');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

connectDB();
```

### Installation Guide
- Pre-requisites:
- Node.js
- npm
- MongoDB
- Firebase account
- Google Maps API key
  
### Steps:
Clone the repository:

```
git clone https://github.com/Arvindm7/VTrack.git
cd VTrack
```

Install dependencies:

```
npm install
```

Set up Firebase:

- Go to Firebase console.
- Create a new project.
- Set up authentication and Firestore.
- Download google-services.json and place it in android/app.
- Download GoogleService-Info.plist and place it in ios.
- Set up Google Maps API:
- Go to Google Cloud Console.
- Enable Maps SDK for Android and iOS.
- Obtain an API key and add it to your AndroidManifest.xml and AppDelegate.m.
- Run the app:

```
npx react-native run-android
npx react-native run-ios
```
References
- Firebase Documentation
- React Native Documentation
- Google Maps API Documentation
- MongoDB Documentation

import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { useRoute } from '@react-navigation/native';
import PrimaryButton from '../components/PrimaryButton';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';

const UserInfoScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('');
  const [age, setAge] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();
  const route = useRoute();
  const { firebaseId } = route.params;

  useEffect(() => {
    const fetchPhoneNumber = async () => {
      try {
        const doc = await firestore().collection('phoneNumbers').doc(firebaseId).get();
        if (doc.exists) {
          setPhoneNumber(doc.data().number);
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
  }, [firebaseId]);

  const handleSaveUserInfo = async () => {
    console.log('handleSaveUserInfo called');
    if (!name || !email || !gender || !age) {
      Alert.alert('Error', 'All fields are required');
      return;
    }

    try {
      const userData = {
        firebaseId,
        name,
        email,
        gender,
        age,
        phoneNumber,
      };

      console.log('Sending userData: ', userData);

      const response = await fetch('http://192.168.0.52:3000/api/migrate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      console.log('Response status: ', response.status);

      if (response.ok) {
        console.log('User information saved successfully');
        Alert.alert('Success', 'User information saved successfully');
        console.log('Navigating to HomeScreen');
        navigation.navigate('HomeScreen');
      } else {
        const errorText = await response.text();
        console.log('Error text: ', errorText);
        Alert.alert('Error', `Failed to save user information: ${errorText}`);
      }
    } catch (error) {
      console.error('Error saving user information: ', error);
      Alert.alert('Error', 'FE Failed to save user information');
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <View style={styles.container}>
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
      <View style={styles.button}>
        <PrimaryButton title="Proceed" onPress={handleSaveUserInfo} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  button: {
    borderRadius: 25,
    padding: 15,
    width: 330,
    height: 52,
    alignItems: 'center',
    left: 30,
    top: 529,
  },
});

export default UserInfoScreen;
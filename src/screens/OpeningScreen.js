
import React, { useEffect } from 'react';
import { SafeAreaView, StyleSheet, StatusBar, Image,  } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const OpeningImage = require('../Images/OpeningImage.png');

function OpeningScreen() {
  const navigation = useNavigation();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate('Onboarding1');
    }, 3000); 

    return () => clearTimeout(timer); 
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#1C2129" barStyle="light-content" />
      <Image source={OpeningImage} style={styles.content} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1c2129',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    height: 149,
    width: 152,
    resizeMode: 'contain',
  },
});

export default OpeningScreen;

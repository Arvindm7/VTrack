
import React, { useEffect } from 'react';
import { SafeAreaView, StyleSheet, Image } from 'react-native';
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
      <Image source={OpeningImage} style={styles.content} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#263238',
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

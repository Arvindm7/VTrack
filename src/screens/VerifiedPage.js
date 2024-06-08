import React from 'react';
import {
    SafeAreaView,
    StyleSheet,
    Image,
    Text,
    TouchableOpacity,
    StatusBar,
    View
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import SecondaryButton from "../components/SecondaryButton";

const VerifiedImage = require('../Images/VerifiedImage.png');

function VerifiedPage() {
    const navigation = useNavigation();
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar backgroundColor="#1C2129" barStyle="light-content" />
            <Image
                source={VerifiedImage}
                style={styles.smallImage}
            />
            <Text style={styles.text} >
                User Verified
            </Text>
            <View style={styles.button}>
                <SecondaryButton title="Continue to SIgn In" />    
                {/* add the navigation  */}
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1c2129',
        alignItems: 'center',
        justifyContent: 'center',
    },
    smallImage: {
        width: 50,
        height: 50,
        resizeMode: 'contain',
        top: 180,
        marginBottom: 20,
    },
    button: {
        bottom: 0,
        top: 250,
        marginTop: 10,
    },
    text: {
        fontSize: 31,
        color: 'white',
        // textAlign: 'left',
        textAlign: 'center',
        top: 180,
        width: 335,
    },
});

export default VerifiedPage;

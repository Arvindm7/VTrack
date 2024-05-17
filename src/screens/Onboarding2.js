import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  Button
} from 'react-native';
const CarDriving = require('../Images/Onboarding2.png')
const Progress = require('../Images/Progress.png')
const Scroll = require('../Images/Scroll2.png')
function Onboarding2(){
   

    return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity style = {styles.button} onPress={()=>console.log("Skip pressed")}>
                <Text style={styles.buttonText}>Skip</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=> console.log("Progress pressed")}>
                <Image source={Progress} style={styles.progress}/>
            </TouchableOpacity>
            <Image source={Scroll} style={styles.scroll}/>
            <Image source={CarDriving} style ={styles.content}/>
            <Text style={styles.text}>Get real-time traffic information and avoid congested roads.</Text>
        </SafeAreaView>

    );
}
const styles = StyleSheet.create({
    container :{ 
        backgroundColor: '#263238',
        flex : 1,
    },
    content : {
        height: 211.33,
        width:317,
        position: 'absolute',
        top: 277, // Adjust the top position as needed
        left: 37, // Adjust the left position as needed
        resizeMode: 'contain', // Adjust the image resize mode as needed
       
    },
    text:{
        color:'#FFFFFF',
        position: 'absolute',
        top: 553,
        left:30,
        fontSize: 31,
        fontFamily:'roboto'
    },
    button:{
        backgroundColor:'#263238',
        height:20,
        width:32,
        left:330,
        top:70
    },

    buttonText: {
        fontSize: 16,
        color: '#80F17E',
    },   
    
    progress:{
        position:'absolute',
        height:68,
        width:68,
        left:292,
        top:728
    },

    scroll:{
        position:'absolute',
        left:30,
        top:757,
        height:10,
        width:66
    }



})


export default Onboarding2;
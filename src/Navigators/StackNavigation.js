import { createNativeStackNavigator } from "@react-navigation/native-stack"

//Screens
import OpeningScreen from '../screens/OpeningScreen';
import Onboarding1 from '../screens/Onboarding1';
import Onboarding2 from '../screens/Onboarding2';
import Onboarding3 from '../screens/Onboarding3';
import GetStarted from '../screens/GetStarted';
import PhoneNo from '../screens/PhoneNo';
import OtpPage from '../screens/OtpPage';
import VerifiedPage from '../screens/VerifiedPage';

const Stack = createNativeStackNavigator()

function StackNavigation() {
    return (
        <Stack.Navigator initialRouteName='OpeningScreen' screenOptions={{ headerShown: false }} >
            <Stack.Screen name='OpeningScreen' component={OpeningScreen} />
            <Stack.Screen name='Onboarding1' component={Onboarding1} />
            <Stack.Screen name='Onboarding2' component={Onboarding2} />
            <Stack.Screen name='Onboarding3' component={Onboarding3} />
            <Stack.Screen name='GetStarted' component={GetStarted} />
            <Stack.Screen name='PhoneNo' component={PhoneNo} />
            <Stack.Screen name='OtpPage' component={OtpPage} />
            <Stack.Screen name='VerifiedPage'component={VerifiedPage}/>
        </Stack.Navigator>
    );
}

export default StackNavigation;
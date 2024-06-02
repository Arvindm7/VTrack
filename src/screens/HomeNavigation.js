import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './HomeScreen';
import Profilepage from './Profilepage';
import FreqLocations from './FreqLocations';


function HomeNavigation() {

    const Tab = createBottomTabNavigator();


    return (
        <Tab.Navigator screenOptions={{ headerShown: false }}>
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="FreqLocations" component={FreqLocations} />
            <Tab.Screen name="Profilepage" component={Profilepage} />
        </Tab.Navigator>
    );
}

export default HomeNavigation;
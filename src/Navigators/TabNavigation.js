import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image } from 'react-native';

//Screens
import HomeScreen from '../screens/HomeScreen';
import ProfilePage from '../screens/ProfilePage';
import FreqLocations from '../screens/FreqLocations';

//
import Home_Active from '../Images/Navbar/Home_Active.png';
import Home_Inactive from '../Images/Navbar/Home_Inactive.png';
import Location_Active from '../Images/Navbar/Location_Active.png';
import Location_Inactive from '../Images/Navbar/Location_Inactive.png';
import Profile_Active from '../Images/Navbar/Profile_Active.png';
import Profile_Inactive from '../Images/Navbar/Profile_Inactive.png';



function TabNavigation() {

    const Tab = createBottomTabNavigator();


    return (
        <Tab.Navigator screenOptions={{
            headerShown: false, tabBarShowLabel: false, tabBarStyle: {
                backgroundColor: '#1C2129',
            }
        }}>

            <Tab.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <Image
                            source={
                                focused
                                    ? Home_Active
                                    : Home_Inactive
                            }
                            style={{ width: 30, height: 30 }}
                        />
                    ),
                }}
            />
            <Tab.Screen name="FreqLocations" component={FreqLocations}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <Image
                            source={
                                focused
                                    ? Location_Active
                                    : Location_Inactive
                            }
                            style={{ width: 30, height: 30 }}
                        />
                    ),
                }}
            />
            <Tab.Screen name="ProfilePage" component={ProfilePage}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <Image
                            source={
                                focused
                                    ? Profile_Active
                                    : Profile_Inactive
                            }
                            style={{ width: 30, height: 30 }}
                        />
                    ),
                }} />
        </Tab.Navigator>
    );
}

export default TabNavigation;
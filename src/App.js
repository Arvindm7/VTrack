import React from 'react';

//Navigation
import { NavigationContainer } from "@react-navigation/native"

//Navigators
import TabNavigation from './Navigators/TabNavigation';
import StackNavigation from './Navigators/StackNavigation';

//Context
import { AuthProvider } from './Context/AuthProvider';

//useAuth hook
import { useAuth } from './Context/AuthProvider';


const App = () => {
  return (
    <AuthProvider>
      <NavigationContainer>
        <AuthContent />
      </NavigationContainer>
    </AuthProvider>
  );
}

const AuthContent = () => {
  const { isLogged } = useAuth();

  return isLogged ? <TabNavigation /> : <StackNavigation />;
}

export default App;
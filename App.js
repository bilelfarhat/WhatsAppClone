import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from './Screens/SplashScreen';
import Authentification from './Screens/Authentification';
import NewUser from './Screens/NewUser';
import Accueil from './Screens/Accueil';
import Chat from './Screens/Chat';
import Form from './Screens/AccueilScreens/Form';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SplashScreen" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen name="Form" component={Form} options={{ title: 'Form' }} />
        <Stack.Screen name="Authentification" component={Authentification} />
        <Stack.Screen name="NewUser" component={NewUser} />
        <Stack.Screen name="Accueil" component={Accueil} />
        <Stack.Screen name="Chat" component={Chat} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

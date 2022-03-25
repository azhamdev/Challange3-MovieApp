import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../Screens/HomeScreen/HomeScreen';
import DetailsScreen from '../Screens/DetailsScreen/DetailsScreen';
import Register from '../Screens/Register/Register';
import Login from '../Screens/Login/Login';

const Stack = createStackNavigator();

export default function Routes() {
    return (
        <Stack.Navigator initialRouteName='Register'>

            <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
            <Stack.Screen name="Register" component={Register} options={{ headerShown: false }} />
            <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }} />
            <Stack.Screen name="DetailsScreen" component={DetailsScreen} options={{ headerShown: false }} />

        </Stack.Navigator>
    );
}
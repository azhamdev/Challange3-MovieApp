// import * as React {useEffect} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Routes from './src/Routes/Routes';
import SplashScreen from 'react-native-splash-screen'
import React, { useEffect } from 'react'

export default function App() {
  useEffect(() => {
    SplashScreen.hide();
  }, []);
  return (
    <NavigationContainer>
      <Routes />
    </NavigationContainer>
  );
}
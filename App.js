/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './components/HomeScreen';
import VideoScreen from './components/VideoScreen';
import FullImageView from './components/FullImageView';
import Permissions from './components/Permissions';
const Stack = createNativeStackNavigator();



function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={VideoScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen name='Explore' component={FullImageView} 
          
          options={{headerShown:true,  headerStyle:{backgroundColor:"#0d0c22"},
          headerTitleStyle:{color:'white', fontWeight:'bold',fontFamily: "serif", fontSize:22},
          headerTintColor:'white'
        }}
        />

        <Stack.Screen name="Permission" component={Permissions} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;

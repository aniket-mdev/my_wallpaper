import React from 'react';
import {View, Text} from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
const Tab = createBottomTabNavigator();
import { Image } from "react-native"
import VideoScreen from './VideoScreen';

function Setting(){
    return (
        <View>
            <Text>
                Setting Home
            </Text>
        </View>
    )
}

function Videos() {
    return (
        <View>
            <Text>
                Videos...
            </Text>
        </View>
    )
}

function HomeScreen() {
    return(
       <Tab.Navigator initialRouteName='Video'
       screenOptions={({ route }) => ({
        tabBarStyle: {
            borderTopStartRadius: 20,
            borderTopEndRadius: 20,
            height: 80,
            // marginBottom:10
        },
        tabBarActiveTintColor: 'black',
        tabBarInactiveTintColor: 'gray',
        tabBarLabelStyle: {
            fontSize: 15,
            marginBottom: 15,
            fontWeight: 'bold'
        },
        tabBarHideOnKeyboard: true,
        tabBarActiveBackgroundColor:'#d3d3d3'
    })}
       
       >
        <Tab.Screen
        name='Video' component={VideoScreen}
        options={{headerShown:false}}
        />
        <Tab.Screen
        name='Setting' component={Setting}
        options={{headerShown:true}}
        />
       </Tab.Navigator>
    );
}

export default HomeScreen;
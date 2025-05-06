import { View, Text } from 'react-native';
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../components/Screen/HomeScreen/HomeScreen';
import FavouriteScreen from '../components/Screen/FavouriteScreen/FavouriteScreen';
import ProfileScreen from '../components/Screen/ProfileScreen/ProfileScreen';

const Tab = createBottomTabNavigator();
export default function TabNavigations() {
  return (
    <Tab.Navigator>
      <Tab.Screen name='home' component={HomeScreen} />
      <Tab.Screen name='favourite' component={FavouriteScreen} />
      <Tab.Screen name='profile' component={ProfileScreen} />
    </Tab.Navigator>
  );
}

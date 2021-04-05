import { StatusBar } from 'expo-status-bar';
import React from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet, Text, View } from 'react-native';
import SignUp from './screens/singup';
import LogIn from './screens/login';
import {createStackNavigator} from "@react-navigation/stack"
import Home from "./screens/home"
import AddChat from "./screens/AddChat"
import Chat from "./screens/Chat"
import Library from "./screens/library"
import Faculty from "./screens/faculty"
import Timetable from "./screens/timetable"
import Links from "./screens/links"
const Stack = createStackNavigator();

const globalScreenOptions = {
  headerStyle: {backgroundColor:"#2c6BED"},
  headerTitleStyle:{color:"white"},
  headerTintColor:"white"

}


export default function App() {
  return (
    <NavigationContainer>
    <Stack.Navigator screenOptions={globalScreenOptions}>

    <Stack.Screen options={{title:"Log In"}} name='LogIn' component= {LogIn} />
    <Stack.Screen options={{title:"Sign Up"}} name='SignUp' component= {SignUp} />
     <Stack.Screen options={{title:"Home"}} name='Home' component= {Home} />
      <Stack.Screen options={{title:"Add Chat"}} name='AddChat' component= {AddChat} />
      <Stack.Screen options={{title:"Links"}} name='Links' component= {Library} />
      <Stack.Screen options={{title:"Chat"}} name='Chat' component= {Chat} />
      <Stack.Screen options={{title:"Faculty"}} name='Faculty' component= {Faculty} />
      <Stack.Screen options={{title:"Timetable"}} name='Timetable' component= {Timetable} />
      <Stack.Screen options={{title:"Library"}} name='Library' component= {Links} />
    
    </Stack.Navigator>
    </NavigationContainer>
  );
}
  
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

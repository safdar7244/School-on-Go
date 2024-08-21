import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LogIn from "./screens/login";
import { auth } from "./firebaseConfig";
import SignUp from "./screens/singup";
import Home from "./screens/home";
import Chat from "./screens/Chat";
import Library from "./screens/library";
import Timetable from "./screens/timetable";
import Faculty from "./screens/faculty";
import Links from "./screens/links";

const Stack = createNativeStackNavigator();
const globalScreenOptions = {
  headerStyle: { backgroundColor: "#2c6BED" },
  headerTitleStyle: { color: "white" },
  headerTintColor: "white",
};
export default function App() {
  return (
    <NavigationContainer screenOptions={globalScreenOptions}>
      <Stack.Navigator>
        <Stack.Screen
          options={{ title: "Log In" }}
          name="LogIn"
          component={LogIn}
        />
        <Stack.Screen
          options={{ title: "Sign Up" }}
          name="SignUp"
          component={SignUp}
        />
        <Stack.Screen
          options={{ title: "Home" }}
          name="Home"
          component={Home}
        />
        <Stack.Screen
          options={{ title: "Chat" }}
          name="Chat"
          component={Chat}
        />
        <Stack.Screen
          options={{ title: "Links" }}
          name="Links"
          component={Library}
        />
        <Stack.Screen
          options={{ title: "Timetable" }}
          name="Timetable"
          component={Timetable}
        />
        <Stack.Screen
          options={{ title: "Faculty" }}
          name="Faculty"
          component={Faculty}
        />
        <Stack.Screen
          options={{ title: "Library" }}
          name="Library"
          component={Links}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

import { StyleSheet, Text, View, KeyboardAvoidingView } from "react-native";
import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { Button, Input, Image } from "@rneui/themed";
import {
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import profile from "../assets/profile.png";

function LogIn({ navigation }) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        navigation.replace("Home");
      }
    });

    return unsubscribe;
  }, []);

  const logIn = () => {
    signInWithEmailAndPassword(auth, email, password).catch((err) => {
      alert(err);
    });
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      <StatusBar style="light" />
      <Image
        source={require("../assets/default.png")}
        style={{ width: 150, height: 150, backgroundColor: "transparent" }}
      />
      <View style={styles.inputContainer}>
        <Input
          placeholder="Email"
          type="email"
          value={email}
          autoFocus
          onChangeText={(text) => setEmail(text)}
        />
        <Input
          placeholder="Password"
          secureTextEntry
          value={password}
          type="password"
          onChangeText={(text) => setPassword(text)}
        />
      </View>
      <Button containerStyle={styles.button} title="Log In" onPress={logIn} />
      <Button
        containerStyle={styles.button}
        type="outline"
        title="Sign Up"
        onPress={() => navigation.navigate("SignUp")}
      />
      <View style={{ height: 100 }} />
    </KeyboardAvoidingView>
  );
}

export default LogIn;
const styles = StyleSheet.create({
  inputContainer: {
    width: 300,
  },
  button: {
    width: 200,
    marginTop: 10,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    backgroundColor: "white",
  },
});

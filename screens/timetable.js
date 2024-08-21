import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  ScrollView,
  Linking,
} from "react-native";
import React, { useState, useLayoutEffect, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { Button, Input, Image } from "@rneui/themed";
import { Divider } from "@rneui/themed";
function Timetable({ navigation }) {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: "#28527a",
      },
      headerTintColor: "black",
    });
  }, [navigation]);

  return (
    <KeyboardAvoidingView style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.inputContainer}>
        <ScrollView>
          <View style={styles.back}>
            <Text style={{ fontSize: 20, textAlign: "center" }}>
              Bachelor in Cyber Security
            </Text>
            <Divider style={{ marginTop: 20, width: 300 }} />
            <Text
              style={styles.linkStyle}
              onPress={() =>
                Linking.openURL(
                  "https://cloud.timeedit.net/noroff/web/student/ri1Q55.html"
                )
              }
            >
              https://cloud.timeedit.net/noroff/web/student/ri1Q55.html
            </Text>
            <Divider style={{ marginTop: 20, width: 300 }} />

            <Text style={{ fontSize: 20, textAlign: "center" }}>
              Bachelor in Applied Data Science
            </Text>
            <Divider style={{ marginTop: 20, width: 300 }} />
            <Text
              style={styles.linkStyle}
              onPress={() =>
                Linking.openURL(
                  "https://cloud.timeedit.net/noroff/web/student/ri1Q55.html"
                )
              }
            >
              https://cloud.timeedit.net/noroff/web/student/ri1Q55.html
            </Text>
          </View>
        </ScrollView>
      </View>

      <View style={{ height: 100 }} />
    </KeyboardAvoidingView>
  );
}

export default Timetable;

const styles = StyleSheet.create({
  inputContainer: {
    width: 400,
  },
  button: {
    width: 400,
    marginTop: 10,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    backgroundColor: "white",
  },
  linkStyle: {
    color: "grey",
    textAlign: "center",
    paddingTop: 30,
  },
  heading: {
    color: "black",
    textAlign: "center",
    paddingTop: 30,
  },
  back: {
    backgroundColor: "#f8f5f1",
    marginTop: 40,
    padding: 40,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 4,
  },
});

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

function Links({ navigation }) {
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

      <ScrollView>
        <View style={styles.cont}>
          <View style={styles.back}>
            <Text
              style={{
                paddingTop: 30,
                fontSize: 30,
                textAlign: "center",
                color: "black",
              }}
            >
              Research paper:
            </Text>

            <Text
              style={styles.linkStyle}
              onPress={() => Linking.openURL("https://www.sciencedirect.com/")}
            >
              Science direct
            </Text>

            <Divider style={{ marginTop: 20, width: 400 }} />

            <Text
              style={styles.linkStyle}
              onPress={() => Linking.openURL("https://scholar.google.com/")}
            >
              Google Scholar
            </Text>

            <Divider style={{ marginTop: 20, width: 400 }} />

            <Text
              style={styles.linkStyle}
              onPress={() => Linking.openURL("https://www.ieee.org/")}
            >
              IEEE
            </Text>

            <Divider style={{ marginTop: 20, width: 400 }} />

            <Text
              style={styles.linkStyle}
              onPress={() => Linking.openURL("https://lovdata.no/")}
            >
              Lovdata
            </Text>
          </View>

          <View style={styles.back}>
            <Text style={{ paddingTop: 30, fontSize: 30, textAlign: "center" }}>
              Carrier guides:
            </Text>

            <Text
              style={styles.linkStyle}
              onPress={() => Linking.openURL("https://karriereveiledning.no/")}
            >
              Carrierinstruction
            </Text>

            <Divider style={{ marginTop: 20, width: 400 }} />

            <Text
              style={styles.linkStyle}
              onPress={() => Linking.openURL("https://studenttorget.no/")}
            >
              Student Torget
            </Text>
          </View>

          <View style={styles.back}>
            <Text style={{ paddingTop: 30, fontSize: 30, textAlign: "center" }}>
              Video learning:
            </Text>

            <Divider style={{ marginTop: 20, width: 400 }} />
            <Text
              style={styles.linkStyle}
              onPress={() =>
                Linking.openURL("https://www.linkedin.com/learning/me")
              }
            >
              Linkedin learning
            </Text>
          </View>

          <View style={styles.back}>
            <Text style={{ paddingTop: 30, fontSize: 30, textAlign: "center" }}>
              Books learning:
            </Text>

            <Divider style={{ marginTop: 20, width: 400 }} />

            <Text
              style={styles.linkStyle}
              onPress={() => Linking.openURL("https://www.acm.org/")}
            >
              Acm
            </Text>

            <Text
              style={styles.linkStyle}
              onPress={() => Linking.openURL("https://www.axiell.com/no/")}
            >
              Mikromarc
            </Text>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

export default Links;

const styles = StyleSheet.create({
  inputContainer: {},
  button: {
    width: 200,
    marginTop: 10,
  },
  container: {
    flex: 1,
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
  cont: {
    width: 400,
    alignItems: "center",
    justifyContent: "center",
  },
  back: {
    backgroundColor: "#f1f1f1",
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

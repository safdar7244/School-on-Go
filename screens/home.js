import {
  StyleSheet,
  Text,
  SafeAreaView,
  View,
  KeyboardAvoidingView,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import React, { useState, useLayoutEffect, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { Button, Input, Image, Avatar } from "@rneui/themed";
import CustomListItem from "../components/CustomListItem";
import { AntDesgin, SimpleLineIcons } from "@expo/vector-icons";
import { Dimensions } from "react-native";
import { getAuth, signOut } from "firebase/auth";
import { getFirestore, collection, onSnapshot } from "firebase/firestore";

function Home({ navigation }) {
  const [chats, setChats] = useState([]);
  const auth = getAuth();
  const db = getFirestore();

  const signOutHandler = () => {
    signOut(auth).then(() => {
      navigation.replace("LogIn");
    });
  };

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "chats"), (snapshot) =>
      setChats(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      )
    );
    return unsubscribe;
  }, []);

  let ScreenHeight = Dimensions.get("window").height;

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Student on the Move",
      headerTilesStyle: { backgroundColor: "#fff" },
      headerStyle: {
        backgroundColor: "#28527a",
      },
      headerTintColor: "black",
      headerRight: () => (
        <View style={{ marginRight: 20 }}>
          <TouchableOpacity onPress={signOutHandler}>
            <Avatar
              rouned
              source={{
                uri: "https://img.icons8.com/android/344/ffffff/logout-rounded-left.png",
              }}
            />
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation]);

  const enterChat = (id, chatName) => {
    navigation.navigate("Chat", {
      id,
      chatName,
    });
  };

  //   const enterLibrary = ()=>{

  //     navigation.navigate('Library');
  // }

  const Teacher = (picture, name, details, info) => {};

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <Image
        style={styles.backgroundImage}
        source={{
          uri: "https://images.pexels.com/photos/1939485/pexels-photo-1939485.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
        }}
      />

      <ScrollView>
        <View style={{ flex: 1, height: ScreenHeight - 100 }}>
          {chats.map(({ id, data: { chatName } }) => {
            return (
              <CustomListItem
                key={id}
                id={id}
                chatName="Chat"
                enterChat={enterChat}
              />
            );
          })}

          {/* <Button type="outline"  containerStyle={styles.button} title="Study Links" onPress={()=>navigation.navigate("Library")} />
    <Button type="outline" containerStyle={styles.button} title="Faculty and Staff" onPress={()=>navigation.navigate("Faculty")}/>
    <Button type="outline" containerStyle={styles.button} title="TimeTable" onPress={()=>navigation.navigate("Timetable")}/>
    <Button type="outline" containerStyle={styles.button} title="Library" onPress={()=>navigation.navigate("Links")}/> */}

          <View style={{ flexDirection: "row" }}>
            <View style={styles.box}>
              <Avatar
                rouned
                source={{
                  uri: "https://img.icons8.com/carbon-copy/100/ffffff/books.png",
                }}
              />
              <Text
                style={{ color: "white" }}
                onPress={() => navigation.navigate("Library")}
              >
                {" "}
                Library
              </Text>
            </View>

            <View style={styles.box}>
              <Avatar
                rouned
                source={{
                  uri: "https://img.icons8.com/pastel-glyph/100/ffffff/external-link.png",
                }}
              />
              <Text
                style={{ color: "white" }}
                onPress={() => navigation.navigate("Links")}
              >
                {" "}
                Study Links
              </Text>
            </View>
          </View>

          <View style={{ flexDirection: "row" }}>
            <View style={styles.box}>
              <Avatar
                rouned
                source={{
                  uri: "https://img.icons8.com/ios-filled/50/ffffff/clock.png",
                }}
              />
              <Text
                style={{ color: "white" }}
                onPress={() => navigation.navigate("Timetable")}
              >
                {" "}
                Time Table
              </Text>
            </View>

            <View style={styles.box}>
              <Avatar
                rouned
                source={{
                  uri: "https://img.icons8.com/wired/100/ffffff/teacher.png",
                }}
              />
              <Text
                style={{ color: "white" }}
                onPress={() => navigation.navigate("Faculty")}
              >
                {" "}
                Staff
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default Home;
const styles = StyleSheet.create({
  inputContainer: {
    width: 300,
  },
  button: {
    flex: 1,
    width: 360,
    marginTop: 70,
  },
  container: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap", // Allows wrapping of boxes to the next row
    justifyContent: "space-between", // Distribute space between boxes
    padding: 10, // Add padding to the container
  },
  box: {
    width: "48%", // Take up roughly half of the available width
    height: "80%", // Take up roughly half of the available height
    backgroundColor: "#28527a",
    justifyContent: "center",
    alignItems: "center",
    margin: 4, // Add margin around each box
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover", // or 'stretch'
  },
});

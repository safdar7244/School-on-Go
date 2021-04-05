import { StyleSheet,Text,View,KeyboardAvoidingView,ScrollView,Linking } from 'react-native';
import React,{useState,useLayoutEffect,useEffect}   from 'react'
import { StatusBar } from 'expo-status-bar';
import {Button,Input,Image } from "react-native-elements"
import { auth } from '../firebase';
import { Divider } from 'react-native-elements';

function Libary({navigation}) {

    useLayoutEffect(() => {
        navigation.setOptions({
      
          headerStyle: {
            backgroundColor: '#28527a'
          },
          headerTintColor:"black",
          })
       },  [navigation])

 return (
  <KeyboardAvoidingView  style={styles.container}>
  <StatusBar style="light"/>
    

     <ScrollView>

    <View style={{justifyContent:"center",
  alignItems:"center"}}>
    

     <View style ={styles.back}>
     <Text style={styles.heading}> Python</Text>
     <Text style={styles.linkStyle}
      onPress={() => Linking.openURL('https://docs.python.org/3/tutorial/')}>
    The Python Tutorial — Python 3.9.2 documentation
   </Text>
   <Divider style={{marginTop:20,width:400}} />
   <Text style={styles.linkStyle}
      onPress={() => Linking.openURL('https://www.w3schools.com/python/')}>
    Python Tutorial - W3Schools
   </Text>
   <Divider style={{marginTop:20,width:400}} />
   <Text style={styles.linkStyle}
      onPress={() => Linking.openURL('https://www.programiz.com/python-programming/time')}>
    Learn Python Programming - Programiz
   </Text>
   <Divider style={{marginTop:20,width:400}} />
   <Text style={styles.linkStyle}
      onPress={() => Linking.openURL('https://realpython.com/')}>
    Real Python: Python Tutorials
   </Text>

   </View>

   <View style ={styles.back}>
   <Text style={styles.heading}> SQL</Text>
     <Text style={styles.linkStyle}
      onPress={() => Linking.openURL('https://dev.mysql.com/doc/')}>
    MySQL Documentation - MySQL
   </Text>
   <Divider style={{marginTop:20,width:400}} />
   <Text style={styles.linkStyle}
      onPress={() => Linking.openURL('https://www.w3schools.com/sql/')}>
    SQL Tutorial - W3Schools
   </Text>
   <Divider style={{marginTop:20,width:400}} />
   <Text style={styles.linkStyle}
      onPress={() => Linking.openURL('https://www.geeksforgeeks.org/sql-tutorial/')}>
    SQL Tutorial - GeeksforGeeks
   </Text>
   <Divider style={{marginTop:20,width:400}} />
   <Text style={styles.linkStyle}
      onPress={() => Linking.openURL('https://www.sqltutorial.org/')}>
    SQL Tutorial - Essential SQL For The Beginners
   </Text>
   </View>

    </View>
   </ScrollView>


  
    
  </KeyboardAvoidingView>
 )
}

export default Libary;


const styles = StyleSheet.create({
 inputContainer:{
width:300
 },
 button:{
  width:200,
  marginTop:10,
 },
 container:{
  flex:1,
  padding:10,
  backgroundColor: "white"
 },
 linkStyle:
 {
     color:"grey",
     textAlign:"center",
     paddingTop:30
 },
 heading:
 {
    color:"black",
    textAlign:"center",
    paddingTop:10,
    fontSize:30
 },
 back:
{
    backgroundColor:"#f8f5f1",
    marginTop:40,
    padding:40,
    shadowColor: "#000", 
  shadowOffset: {
	width: 0,
	height: 2,
},
shadowOpacity: 0.23,
shadowRadius: 2.62,

elevation: 4
}
 
});


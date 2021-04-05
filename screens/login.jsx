import { StyleSheet,Text,View,KeyboardAvoidingView } from 'react-native';
import React,{useState,useEffect}   from 'react'
import { StatusBar } from 'expo-status-bar';
import {Button,Input,Image } from "react-native-elements"
import { auth } from '../firebase';
function LogIn({navigation}) {

    const [email,setEmail]=useState('');
    const [name,setName]=useState('');
    const [password,setPassword]=useState('');

    useEffect(()=>{
       const unsubscribe=auth.onAuthStateChanged((authUser)=>{
      if(authUser){
       navigation.replace('Home');
      }
     });
      
     return unsubscribe;
    },[]);

    const logIn=()=>{

     auth.signInWithEmailAndPassword(email,password).catch((err)=>{
      alert(err);
     })

    }


 return (
  <KeyboardAvoidingView  style={styles.container}>
  <StatusBar style="light"/>
    <Image source={{
     uri:"https://cdn.logo.com/hotlink-ok/logo-social.png",}}
     style={{width:100,height:100}} />
     <View style={styles.inputContainer}>
    <Input placeholder="Email"  type="email" value={email} autoFocus onChangeText={text=>setEmail(text)} />
    <Input placeholder="Password"  secureTextEntry value={password} type="password" onChangeText={text=>setPassword(text)} />
    </View> 
    <Button containerStyle={styles.button} title="Log In" onPress={logIn}  />
    <Button containerStyle={styles.button} type="outline" title="Sign Up"  onPress={()=>navigation.navigate("SignUp")}  />
    <View style={{height:100}} />
    
  </KeyboardAvoidingView>
 )
}

export default LogIn;
const styles = StyleSheet.create({
 inputContainer:{
  width:300,
 },
 button:{
  width:200,
  marginTop:10,
 },
 container:{
  flex:1,
  alignItems:"center",
  justifyContent:"center",
  padding:10,
  backgroundColor: "white"
 }
});


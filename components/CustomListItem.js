import { StyleSheet,Text,SafeAreaView,View,KeyboardAvoidingView,ScrollView} from 'react-native';
import React,{useState}   from 'react'
import { StatusBar } from 'expo-status-bar';
import {Button,Input,Image,ListItem,Avatar} from "@rneui/themed"

const CustomListItem = ({id,chatName,enterChat} ) => {

 
 return (
  <ListItem onPress={()=>enterChat(id,chatName)} key={id} >
  <View style={{flexDirection:"row",backgroundColor:"#28527a",padding:10,borderRadius:30}}>
   <Avatar 
   rouned source={{uri:"https://img.icons8.com/wired/100/4a90e2/chat.png"}} />
   <ListItem.Content>
   <ListItem.Title style={{fontWeight:"800",marginLeft:20,color:"white"}}>
     {chatName}
     </ListItem.Title>
   </ListItem.Content>
   </View>
  </ListItem>
 )
}

export default CustomListItem

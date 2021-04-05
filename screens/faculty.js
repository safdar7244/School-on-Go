import { StyleSheet,Text,View,KeyboardAvoidingView,ScrollView,Linking } from 'react-native';

import { StatusBar } from 'expo-status-bar';
import {Button,Input,Image } from "react-native-elements"
import { auth } from '../firebase';
import { Divider } from 'react-native-elements';
import React,{useState,useLayoutEffect,useEffect}   from 'react'
function Faculty({navigation}) {


    const Teacher = ({picture,name,details,info}) =>
    {
        return(
        
        <View>
        <Image 
        source={{
          uri:{picture}
        }} 
        style={{width: 100, height: 100, borderRadius: 400/ 2}} 
      />
           <Text style={styles.heading}> {name}</Text>
           <Text style={styles.heading}> {details}</Text>
           <Text style={styles.heading}> {info}</Text>
           </View>
        );
    }

    useLayoutEffect(() => {
        navigation.setOptions({
    
          headerStyle: {
            backgroundColor: '#28527a'
          },
          headerTintColor:"black",
          })
       },  [ navigation])

 return (
  <KeyboardAvoidingView  style={styles.container}>
  <StatusBar style="light"/>
     
     <ScrollView style={{flex:1}} >

        <View style={styles.cont}>
  
        <Text
        style={{paddingTop:30,fontSize:20,textAlign:"center",fontFamily:'sans-serif-medium'}}>
        Bachelors in Cyber Security</Text>
        <Text style={{paddingTop:40}}></Text>

      <Image 
        source={{
          uri:'https://firebasestorage.googleapis.com/v0/b/student-on-the-move-4383f.appspot.com/o/iain-sutherland-small.jpg?alt=media&token=f220b5b9-2e0b-4f03-a698-c0c3def6b709'
        }} 
        style={{width: 150, height: 150, borderRadius: 400/ 2}} 
      />
           <Text style={styles.heading}>Prof. Iain Sutherland</Text>
           <Text style={styles.heading2}> Dean of Faculty/Professor</Text>
           <Text style={styles.heading3}
           onPress={() => Linking.openURL('iain.sutherland@noroff.no')}> 
           iain.sutherland@noroff.no</Text>

           <Divider style={{margin:30,width:400}} />

           {/* SASTA KAAM START */}
           <Text style={{paddingTop:40}}></Text>
           <Image 
        source={{
          uri:'https://firebasestorage.googleapis.com/v0/b/student-on-the-move-4383f.appspot.com/o/barry-irwin-small.jpg?alt=media&token=53ab19ff-2548-487a-85fd-2929f69aada1'
        }} 
        style={{width: 150, height: 150, borderRadius: 400/ 2}} 
      />
           <Text style={styles.heading}>Prof. Barry Irwin</Text>
           <Text style={styles.heading2}> Professor</Text>
           <Text style={styles.heading3}
           onPress={() => Linking.openURL('barry.irwin@noroff.no')}> 
           barry.irwin@noroff.no</Text>
           {/* SASTA KAAM END */}
           <Divider style={{margin:30,width:400}} />
           {/* SASTA KAAM START */}
           <Text style={{paddingTop:40}}></Text>
           <Image 
        source={{
          uri:'https://firebasestorage.googleapis.com/v0/b/student-on-the-move-4383f.appspot.com/o/seifedine-kadry-small.jpg?alt=media&token=3e8095a4-4890-4c8a-94b9-7ccc6ee953ca'
        }} 
        style={{width: 150, height: 150, borderRadius: 400/ 2}} 
      />
           <Text style={styles.heading}>Prof. Seifedine Kadry</Text>
           <Text style={styles.heading2}> Professor</Text>
           <Text style={styles.heading3}
           onPress={() => Linking.openURL('Seifedine.kadry@noroff.no')}> 
           Seifedine.kadry@noroff.no</Text>
           {/* SASTA KAAM END */}
           <Divider style={{margin:30,width:400}} />

           {/* SASTA KAAM START */}
           <Text style={{paddingTop:40}}></Text>
           <Image 
        source={{
          uri:'https://firebasestorage.googleapis.com/v0/b/student-on-the-move-4383f.appspot.com/o/isah-lawal-small.jpg?alt=media&token=b41cb9ef-0fb5-4232-9153-029dd6a5b230'
        }} 
        style={{width: 150, height: 150, borderRadius: 400/ 2}} 
      />
           <Text style={styles.heading}>Dr. Isah A. Lawal</Text>
           <Text style={styles.heading2}>Associate Professor</Text>
           <Text style={styles.heading3}
           onPress={() => Linking.openURL('Isah.Lawal@noroff.no')}> 
           Isah.Lawal@noroff.no</Text>
           {/* SASTA KAAM END */}
           <Divider style={{margin:30,width:400}} />

           {/* SASTA KAAM START */}
           <Text style={{paddingTop:40}}></Text>
           <Image 
        source={{
          uri:'https://firebasestorage.googleapis.com/v0/b/student-on-the-move-4383f.appspot.com/o/rayne-reid-small.jpg?alt=media&token=789e2b56-80e0-4548-8628-25e6c5839551'
        }} 
        style={{width: 150, height: 150, borderRadius: 400/ 2}} 
      />
           <Text style={styles.heading}>Dr. Rayne Reid</Text>
           <Text style={styles.heading2}>Associate Professor</Text>
           <Text style={styles.heading3}
           onPress={() => Linking.openURL('Rayne.Reid@noroff.no')}> 
           Rayne.Reid@noroff.no</Text>
           {/* SASTA KAAM END */}

           <Divider style={{margin:30,width:400}} />
           {/* SASTA KAAM START */}
           <Text style={{paddingTop:40}}></Text>
           <Image 
        source={{
          uri:'https://firebasestorage.googleapis.com/v0/b/student-on-the-move-4383f.appspot.com/o/francois-mouton.jpg?alt=media&token=658d17b9-0373-4a26-b33a-c6828a802d72'
        }} 
        style={{width: 150, height: 150, borderRadius: 400/ 2}} 
      />
           <Text style={styles.heading}>Dr. Francois Mouton</Text>
           <Text style={styles.heading2}>Associate professor</Text>
           <Text style={styles.heading3}
           onPress={() => Linking.openURL('Francois.Mouton@noroff.no')}> 
           Francois.Mouton@noroff.no</Text>
           {/* SASTA KAAM END */}

           <Divider style={{margin:30,width:400}} />
           {/* SASTA KAAM START */}
           <Text style={{paddingTop:40}}></Text>
           <Image 
        source={{
          uri:'https://firebasestorage.googleapis.com/v0/b/student-on-the-move-4383f.appspot.com/o/nuc_mikhaila_burgess-small.jpg?alt=media&token=a1ed45be-c0b1-4456-b0bf-efe319864251'
        }} 
        style={{width: 150, height: 150, borderRadius: 400/ 2}} 
      />
           <Text style={styles.heading}>Dr. Mikhaila Burgess</Text>
           <Text style={styles.heading2}>Associate professor</Text>
           <Text style={styles.heading3}
           onPress={() => Linking.openURL('mikhaila.burgess@noroff.no')}> 
           mikhaila.burgess@noroff.noo</Text>
           {/* SASTA KAAM END */}
           <Divider style={{margin:30,width:400}} />
           {/* SASTA KAAM START */}
           <Text style={{paddingTop:40}}></Text>
           <Image 
        source={{
          uri:'https://firebasestorage.googleapis.com/v0/b/student-on-the-move-4383f.appspot.com/o/angesh-anupam-small.jpg?alt=media&token=106cb7ed-595a-4f87-9991-c9fb7d2e7847'
        }} 
        style={{width: 150, height: 150, borderRadius: 400/ 2}} 
      />
           <Text style={styles.heading}>Dr. Angesh Anupam</Text>
           <Text style={styles.heading2}> Assistant Professor</Text>
           <Text style={styles.heading3}
           onPress={() => Linking.openURL('Angesh.Anupam@noroff.no')}> 
           Angesh.Anupam@noroff.no</Text>
           {/* SASTA KAAM END */}

           <Divider style={{margin:30,width:400}} />
           {/* SASTA KAAM START */}
           <Text style={{paddingTop:40}}></Text>
           <Image 
        source={{
          uri:'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
        }} 
        style={{width: 150, height: 150, borderRadius: 400/ 2}} 
      />
           <Text style={styles.heading}>Prof. Fabricio Bortoluzzi</Text>
           <Text style={styles.heading2}> Assistant professor</Text>
           <Text style={styles.heading3}
           onPress={() => Linking.openURL('fabricio.bortoluzzi@noroff.no')}> 
           fabricio.bortoluzzi@noroff.no</Text>
           {/* SASTA KAAM END */}

           <Divider style={{margin:30,width:400}} />
           {/* SASTA KAAM START */}
           <Text style={{paddingTop:40}}></Text>
           <Image 
        source={{
          uri:'https://firebasestorage.googleapis.com/v0/b/student-on-the-move-4383f.appspot.com/o/piet-delport-small.jpg?alt=media&token=1780b551-fd6e-41aa-ada9-4fe844ad6071'
        }} 
        style={{width: 150, height: 150, borderRadius: 400/ 2}} 
      />
           <Text style={styles.heading}>Piet Delport</Text>
           <Text style={styles.heading2}> Assistant Professor</Text>
           <Text style={styles.heading3}
           onPress={() => Linking.openURL('Pieter.delport@noroff.no')}> 
           Pieter.delport@noroff.no</Text>
           {/* SASTA KAAM END */}

           <Divider style={{margin:30,width:400}} />
           {/* SASTA KAAM START */}
           <Text style={{paddingTop:40}}></Text>
           <Image 
        source={{
          uri:'https://firebasestorage.googleapis.com/v0/b/student-on-the-move-4383f.appspot.com/o/ruan-koen-small.jpg?alt=media&token=18ff0cdd-45f0-499e-a708-8d05236714bb'
        }} 
        style={{width: 150, height: 150, borderRadius: 400/ 2}} 
      />
           <Text style={styles.heading}>Ruan Koen</Text>
           <Text style={styles.heading2}> Assistant Professor</Text>
           <Text style={styles.heading3}
           onPress={() => Linking.openURL('emlyn.butterfield@noroff.no')}> 
           emlyn.butterfield@noroff.no</Text>
           {/* SASTA KAAM END */}
           <Divider style={{margin:30,width:400}} />

           {/* SASTA KAAM START */}
           <Text style={{paddingTop:40}}></Text>
           <Image 
        source={{
          uri:'https://firebasestorage.googleapis.com/v0/b/student-on-the-move-4383f.appspot.com/o/veronica-schmitt-small.jpg?alt=media&token=57041bf0-2716-4ff1-997b-0b1e0f6570e0'
        }} 
        style={{width: 150, height: 150, borderRadius: 400/ 2}} 
      />
           <Text style={styles.heading}>Veronica Schmitt</Text>
           <Text style={styles.heading2}> Associate Professor</Text>
           <Text style={styles.heading3}
           onPress={() => Linking.openURL('N/A')}> 
           N/A</Text>
           {/* SASTA KAAM END */}


           <Divider style={{margin:30,width:400}} />


        {/* SASTA KAAM START */}
        <Text style={{paddingTop:40}}></Text>
           <Image 
        source={{
          uri:'https://firebasestorage.googleapis.com/v0/b/student-on-the-move-4383f.appspot.com/o/emlyn-butterfield-small.jpg?alt=media&token=495e0b4a-e909-4bac-9439-1006f3240e8e'
        }} 
        style={{width: 150, height: 150, borderRadius: 400/ 2}} 
      />
           <Text style={styles.heading}>Emlyn Butterfield</Text>
           <Text style={styles.heading2}> Associate Professor</Text>
           <Text style={styles.heading3}
           onPress={() => Linking.openURL('emlyn.butterfield@noroff.no')}> 
           emlyn.butterfield@noroff.no</Text>
           {/* SASTA KAAM END */}
           <Divider style={{margin:30,width:400}} />

           
           {/* SASTA KAAM START */}
           <Text style={{paddingTop:40}}></Text>
           <Image 
        source={{
          uri:'https://firebasestorage.googleapis.com/v0/b/student-on-the-move-4383f.appspot.com/o/oslo_fag_tom_drange-small.jpg?alt=media&token=1b3b2bc5-661b-4494-b764-6d9d8399dade'
        }} 
        style={{width: 150, height: 150, borderRadius: 400/ 2}} 
      />
           <Text style={styles.heading}>Tom Drange</Text>
           <Text style={styles.heading2}> Lecturer</Text>
           <Text style={styles.heading3}
           onPress={() => Linking.openURL('tom.drange@noroff.no')}> 
           tom.drange@noroff.no</Text>
           {/* SASTA KAAM END */}
           <Divider style={{margin:30,width:400}} />

           {/* SASTA KAAM START */}
           <Text style={{paddingTop:40}}></Text>
           <Image 
        source={{
          uri:'https://firebasestorage.googleapis.com/v0/b/student-on-the-move-4383f.appspot.com/o/konstantin-lenchik-small.jpg?alt=media&token=f16a9858-5a61-4487-aedf-384877ea6017'
        }} 
        style={{width: 150, height: 150, borderRadius: 400/ 2}} 
      />
           <Text style={styles.heading}>Konstantin Lenchik</Text>
           <Text style={styles.heading2}> Tutor and teacher</Text>
           <Text style={styles.heading3}
           onPress={() => Linking.openURL('konstantin.lenchik@noroff.no')}> 
           konstantin.lenchik@noroff.noo</Text>
           {/* SASTA KAAM END */}

           <Divider style={{margin:30,width:400}} />
           {/* SASTA KAAM START */}
           <Text style={{paddingTop:40}}></Text>
           <Image 
        source={{
          uri:'https://firebasestorage.googleapis.com/v0/b/student-on-the-move-4383f.appspot.com/o/mariya-chirchenkova-small.jpg?alt=media&token=3db07db7-45f4-4976-a17f-1adcde9cd483'
        }} 
        style={{width: 150, height: 150, borderRadius: 400/ 2}} 
      />
           <Text style={styles.heading}>Mariya Chirchenkova</Text>
           <Text style={styles.heading2}> Tutor and teacher</Text>
           <Text style={styles.heading3}
           onPress={() => Linking.openURL('mariya.chirchenkova@noroff.no')}> 
           mariya.chirchenkova@noroff.no</Text>
           {/* SASTA KAAM END */}



           <Text
        style={{paddingTop:30,fontSize:20,textAlign:"center",fontFamily:'sans-serif-medium'}}>
        Bachelors in Applied Data Science</Text>
        <Text style={{paddingTop:40}}></Text>

      <Image 
        source={{
          uri:'https://firebasestorage.googleapis.com/v0/b/student-on-the-move-4383f.appspot.com/o/iain-sutherland-small.jpg?alt=media&token=f220b5b9-2e0b-4f03-a698-c0c3def6b709'
        }} 
        style={{width: 150, height: 150, borderRadius: 400/ 2}} 
      />
           <Text style={styles.heading}>Prof. Iain Sutherland</Text>
           <Text style={styles.heading2}> Dean of Faculty/Professor</Text>
           <Text style={styles.heading3}
           onPress={() => Linking.openURL('iain.sutherland@noroff.no')}> 
           iain.sutherland@noroff.no</Text>

           <Divider style={{margin:30,width:400}} />

           {/* SASTA KAAM START */}
           <Text style={{paddingTop:40}}></Text>
           <Image 
        source={{
          uri:'https://firebasestorage.googleapis.com/v0/b/student-on-the-move-4383f.appspot.com/o/barry-irwin-small.jpg?alt=media&token=53ab19ff-2548-487a-85fd-2929f69aada1'
        }} 
        style={{width: 150, height: 150, borderRadius: 400/ 2}} 
      />
           <Text style={styles.heading}>Prof. Barry Irwin</Text>
           <Text style={styles.heading2}> Professor</Text>
           <Text style={styles.heading3}
           onPress={() => Linking.openURL('barry.irwin@noroff.no')}> 
           barry.irwin@noroff.no</Text>
           {/* SASTA KAAM END */}
           <Divider style={{margin:30,width:400}} />
           {/* SASTA KAAM START */}
           <Text style={{paddingTop:40}}></Text>
           <Image 
        source={{
          uri:'https://firebasestorage.googleapis.com/v0/b/student-on-the-move-4383f.appspot.com/o/seifedine-kadry-small.jpg?alt=media&token=3e8095a4-4890-4c8a-94b9-7ccc6ee953ca'
        }} 
        style={{width: 150, height: 150, borderRadius: 400/ 2}} 
      />
           <Text style={styles.heading}>Prof. Seifedine Kadry</Text>
           <Text style={styles.heading2}> Professor</Text>
           <Text style={styles.heading3}
           onPress={() => Linking.openURL('Seifedine.kadry@noroff.no')}> 
           Seifedine.kadry@noroff.no</Text>
           {/* SASTA KAAM END */}
           <Divider style={{margin:30,width:400}} />

           {/* SASTA KAAM START */}
           <Text style={{paddingTop:40}}></Text>
           <Image 
        source={{
          uri:'https://firebasestorage.googleapis.com/v0/b/student-on-the-move-4383f.appspot.com/o/isah-lawal-small.jpg?alt=media&token=b41cb9ef-0fb5-4232-9153-029dd6a5b230'
        }} 
        style={{width: 150, height: 150, borderRadius: 400/ 2}} 
      />
           <Text style={styles.heading}>Dr. Isah A. Lawal</Text>
           <Text style={styles.heading2}>Associate Professor</Text>
           <Text style={styles.heading3}
           onPress={() => Linking.openURL('Isah.Lawal@noroff.no')}> 
           Isah.Lawal@noroff.no</Text>
           {/* SASTA KAAM END */}
           <Divider style={{margin:30,width:400}} />

           {/* SASTA KAAM START */}
           <Text style={{paddingTop:40}}></Text>
           <Image 
        source={{
          uri:'https://firebasestorage.googleapis.com/v0/b/student-on-the-move-4383f.appspot.com/o/rayne-reid-small.jpg?alt=media&token=789e2b56-80e0-4548-8628-25e6c5839551'
        }} 
        style={{width: 150, height: 150, borderRadius: 400/ 2}} 
      />
           <Text style={styles.heading}>Dr. Rayne Reid</Text>
           <Text style={styles.heading2}>Associate Professor</Text>
           <Text style={styles.heading3}
           onPress={() => Linking.openURL('Rayne.Reid@noroff.no')}> 
           Rayne.Reid@noroff.no</Text>
           {/* SASTA KAAM END */}

           <Divider style={{margin:30,width:400}} />
           {/* SASTA KAAM START */}
           <Text style={{paddingTop:40}}></Text>
           <Image 
        source={{
          uri:'https://firebasestorage.googleapis.com/v0/b/student-on-the-move-4383f.appspot.com/o/francois-mouton.jpg?alt=media&token=658d17b9-0373-4a26-b33a-c6828a802d72'
        }} 
        style={{width: 150, height: 150, borderRadius: 400/ 2}} 
      />
           <Text style={styles.heading}>Dr. Francois Mouton</Text>
           <Text style={styles.heading2}>Associate professor</Text>
           <Text style={styles.heading3}
           onPress={() => Linking.openURL('Francois.Mouton@noroff.no')}> 
           Francois.Mouton@noroff.no</Text>
           {/* SASTA KAAM END */}

           <Divider style={{margin:30,width:400}} />
           {/* SASTA KAAM START */}
           <Text style={{paddingTop:40}}></Text>
           <Image 
        source={{
          uri:'https://firebasestorage.googleapis.com/v0/b/student-on-the-move-4383f.appspot.com/o/nuc_mikhaila_burgess-small.jpg?alt=media&token=a1ed45be-c0b1-4456-b0bf-efe319864251'
        }} 
        style={{width: 150, height: 150, borderRadius: 400/ 2}} 
      />
           <Text style={styles.heading}>Dr. Mikhaila Burgess</Text>
           <Text style={styles.heading2}>Associate professor</Text>
           <Text style={styles.heading3}
           onPress={() => Linking.openURL('mikhaila.burgess@noroff.no')}> 
           mikhaila.burgess@noroff.noo</Text>
           {/* SASTA KAAM END */}
           <Divider style={{margin:30,width:400}} />
           {/* SASTA KAAM START */}
           <Text style={{paddingTop:40}}></Text>
           <Image 
        source={{
          uri:'https://firebasestorage.googleapis.com/v0/b/student-on-the-move-4383f.appspot.com/o/angesh-anupam-small.jpg?alt=media&token=106cb7ed-595a-4f87-9991-c9fb7d2e7847'
        }} 
        style={{width: 150, height: 150, borderRadius: 400/ 2}} 
      />
           <Text style={styles.heading}>Dr. Angesh Anupam</Text>
           <Text style={styles.heading2}> Assistant Professor</Text>
           <Text style={styles.heading3}
           onPress={() => Linking.openURL('Angesh.Anupam@noroff.no')}> 
           Angesh.Anupam@noroff.no</Text>
           {/* SASTA KAAM END */}

           <Divider style={{margin:30,width:400}} />
           {/* SASTA KAAM START */}
           <Text style={{paddingTop:40}}></Text>
           <Image 
        source={{
          uri:'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
        }} 
        style={{width: 150, height: 150, borderRadius: 400/ 2}} 
      />
           <Text style={styles.heading}>Prof. Fabricio Bortoluzzi</Text>
           <Text style={styles.heading2}> Assistant professor</Text>
           <Text style={styles.heading3}
           onPress={() => Linking.openURL('fabricio.bortoluzzi@noroff.no')}> 
           fabricio.bortoluzzi@noroff.no</Text>
           {/* SASTA KAAM END */}

           <Divider style={{margin:30,width:400}} />
           {/* SASTA KAAM START */}
           <Text style={{paddingTop:40}}></Text>
           <Image 
        source={{
          uri:'https://firebasestorage.googleapis.com/v0/b/student-on-the-move-4383f.appspot.com/o/piet-delport-small.jpg?alt=media&token=1780b551-fd6e-41aa-ada9-4fe844ad6071'
        }} 
        style={{width: 150, height: 150, borderRadius: 400/ 2}} 
      />
           <Text style={styles.heading}>Piet Delport</Text>
           <Text style={styles.heading2}> Assistant Professor</Text>
           <Text style={styles.heading3}
           onPress={() => Linking.openURL('Pieter.delport@noroff.no')}> 
           Pieter.delport@noroff.no</Text>
           {/* SASTA KAAM END */}

           <Divider style={{margin:30,width:400}} />
           {/* SASTA KAAM START */}
           <Text style={{paddingTop:40}}></Text>
           <Image 
        source={{
          uri:'https://firebasestorage.googleapis.com/v0/b/student-on-the-move-4383f.appspot.com/o/ruan-koen-small.jpg?alt=media&token=18ff0cdd-45f0-499e-a708-8d05236714bb'
        }} 
        style={{width: 150, height: 150, borderRadius: 400/ 2}} 
      />
           <Text style={styles.heading}>Ruan Koen</Text>
           <Text style={styles.heading2}> Assistant Professor</Text>
           <Text style={styles.heading3}
           onPress={() => Linking.openURL('emlyn.butterfield@noroff.no')}> 
           emlyn.butterfield@noroff.no</Text>
           {/* SASTA KAAM END */}
           <Divider style={{margin:30,width:400}} />

           {/* SASTA KAAM START */}
           <Text style={{paddingTop:40}}></Text>
           <Image 
        source={{
          uri:'https://firebasestorage.googleapis.com/v0/b/student-on-the-move-4383f.appspot.com/o/veronica-schmitt-small.jpg?alt=media&token=57041bf0-2716-4ff1-997b-0b1e0f6570e0'
        }} 
        style={{width: 150, height: 150, borderRadius: 400/ 2}} 
      />
           <Text style={styles.heading}>Veronica Schmitt</Text>
           <Text style={styles.heading2}> Associate Professor</Text>
           <Text style={styles.heading3}
           onPress={() => Linking.openURL('N/A')}> 
           N/A</Text>
           {/* SASTA KAAM END */}


           <Divider style={{margin:30,width:400}} />


        {/* SASTA KAAM START */}
        <Text style={{paddingTop:40}}></Text>
           <Image 
        source={{
          uri:'https://firebasestorage.googleapis.com/v0/b/student-on-the-move-4383f.appspot.com/o/emlyn-butterfield-small.jpg?alt=media&token=495e0b4a-e909-4bac-9439-1006f3240e8e'
        }} 
        style={{width: 150, height: 150, borderRadius: 400/ 2}} 
      />
           <Text style={styles.heading}>Emlyn Butterfield</Text>
           <Text style={styles.heading2}> Associate Professor</Text>
           <Text style={styles.heading3}
           onPress={() => Linking.openURL('emlyn.butterfield@noroff.no')}> 
           emlyn.butterfield@noroff.no</Text>
           {/* SASTA KAAM END */}
           <Divider style={{margin:30,width:400}} />

           
           {/* SASTA KAAM START */}
           <Text style={{paddingTop:40}}></Text>
           <Image 
        source={{
          uri:'https://firebasestorage.googleapis.com/v0/b/student-on-the-move-4383f.appspot.com/o/oslo_fag_tom_drange-small.jpg?alt=media&token=1b3b2bc5-661b-4494-b764-6d9d8399dade'
        }} 
        style={{width: 150, height: 150, borderRadius: 400/ 2}} 
      />
           <Text style={styles.heading}>Tom Drange</Text>
           <Text style={styles.heading2}> Lecturer</Text>
           <Text style={styles.heading3}
           onPress={() => Linking.openURL('tom.drange@noroff.no')}> 
           tom.drange@noroff.no</Text>
           {/* SASTA KAAM END */}
           <Divider style={{margin:30,width:400}} />

           {/* SASTA KAAM START */}
           <Text style={{paddingTop:40}}></Text>
           <Image 
        source={{
          uri:'https://firebasestorage.googleapis.com/v0/b/student-on-the-move-4383f.appspot.com/o/konstantin-lenchik-small.jpg?alt=media&token=f16a9858-5a61-4487-aedf-384877ea6017'
        }} 
        style={{width: 150, height: 150, borderRadius: 400/ 2}} 
      />
           <Text style={styles.heading}>Konstantin Lenchik</Text>
           <Text style={styles.heading2}> Tutor and teacher</Text>
           <Text style={styles.heading3}
           onPress={() => Linking.openURL('konstantin.lenchik@noroff.no')}> 
           konstantin.lenchik@noroff.noo</Text>
           {/* SASTA KAAM END */}

           <Divider style={{margin:30,width:400}} />
           {/* SASTA KAAM START */}
           <Text style={{paddingTop:40}}></Text>
           <Image 
        source={{
          uri:'https://firebasestorage.googleapis.com/v0/b/student-on-the-move-4383f.appspot.com/o/mariya-chirchenkova-small.jpg?alt=media&token=3db07db7-45f4-4976-a17f-1adcde9cd483'
        }} 
        style={{width: 150, height: 150, borderRadius: 400/ 2}} 
      />
           <Text style={styles.heading}>Mariya Chirchenkova</Text>
           <Text style={styles.heading2}> Tutor and teacher</Text>
           <Text style={styles.heading3}
           onPress={() => Linking.openURL('mariya.chirchenkova@noroff.no')}> 
           mariya.chirchenkova@noroff.no</Text>
           {/* SASTA KAAM END */}

         

     </View>
   </ScrollView>


  
    
  </KeyboardAvoidingView>
 )
}

export default Faculty;


const styles = StyleSheet.create({
 inputContainer:{
  flex:1
 },
 button:{
  width:200,
  marginTop:10,
 },
 container:{
  flex:1,
  padding:10,
  backgroundColor: "#f3f4ed",
  textAlign:"center"
 },
 linkStyle:
 {
     color:"grey",
     paddingTop:30
 },
 heading:
 {
    fontSize:20,
    color:"#28527a",
    paddingTop:10,
    textAlign:"center"
 },
 heading2:
 {
    color:"black",
    paddingTop:10,
    textAlign:"center"
 },
 heading3:
 {
    color:"grey",
    paddingTop:10,
    textAlign:"center"
 },
 cont:
 {
    alignItems:"center",
  justifyContent:"center",
 }

});


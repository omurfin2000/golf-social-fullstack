import React, { useState } from 'react';
import { View, Text, TextInput, Image, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Hamburger from '@/components/Hamburger';
import { Redirect, useRouter } from 'expo-router';
import addToBucket from '../utilities/addToBucket';
import { supabase } from '@/utilities/Supabase';
import { useAuth } from '@/utilities/AuthContext';

export default function CreateGolferProfile() {
  const { session, loading } = useAuth()

  const [image, setImage] = useState<string | null>(null);
  const [imageFileName, setImageFileName] = useState<string | null | undefined>(null);
  const [displayName, setDisplayName] = useState('');
  const [bio, setBio] = useState('');
  const [handicap, setHandicap] = useState('');
  
  if (loading) return null;
  
  if (!session) {
      return <Redirect href='/Auth' />
  }

  const router = useRouter();

  const pickImage = async () => {

    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        allowsEditing: true,
        aspect: [1,1],
        quality: 1,
      });

      if (!result.canceled) {
        setImageFileName(result.assets[0].fileName)
        setImage(result.assets[0].uri);
      }
    } catch (error) {
      console.log(error)
    }
    // Launch picker
    

    
  };

  const takePhoto = async () => {
    /*
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission denied', 'We need camera permissions to take a photo.');
      return;
    }*/

    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handlePost = async () => {
    
      
    if (!image || !bio || !handicap || !displayName) { // Add Specific Error Handeling
      console.log('no can do')
      return;
    }

    try {
      let filePath = await addToBucket(image, imageFileName)
      console.log(filePath)
      const { error } = await supabase
      .from('golfers')
      .insert({
        display_name: displayName,
        images: [filePath],
        bio: bio, 
        handicap: handicap
      })
    } catch ( error ) {
      console.log( error )
      return;
    }

    router.push('/')
    
  };

  return (
    <View style={styles.container}>
      <View style = {{ flexDirection: 'column' }}>
        <Hamburger />
      </View>
      <Text style={styles.title}>Create New Profile</Text>

      <TouchableOpacity onPress={pickImage} style={styles.button}>
        <Text style={styles.buttonText}>Choose from Gallery</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={takePhoto} style={styles.button}>
        <Text style={styles.buttonText}>Take Photo</Text>
      </TouchableOpacity>

      {image && <Image source={{ uri: image }} style={styles.image} />}

      <TextInput 
        placeholder='Enter display name here' 
        value={displayName}
        onChangeText={setDisplayName}
        style={styles.captionInput}
        />

      <TextInput
        placeholder="Write a bio..."
        value={bio}
        onChangeText={setBio}
        style={styles.captionInput}
        multiline
      />

      <TextInput
        placeholder='Enter your handicap here'
        value={handicap}
        onChangeText={setHandicap}
        style={styles.captionInput}
      />
      

      <TouchableOpacity onPress={handlePost} style={styles.button}>
        <Text style={styles.buttonText}>Upload Post</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, flex: 1, backgroundColor: '#fff' },
  title: { fontSize: 24, marginBottom: 20 },
  button: {
    backgroundColor: '#00aebaff',
    padding: 10,
    marginBottom: 10,
    borderRadius: 8,
  },
  buttonText: { color: 'white', textAlign: 'center' },
  image: { width: '100%', height: 200, marginVertical: 10, borderRadius: 10 },
  captionInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    minHeight: 60,
  },
});

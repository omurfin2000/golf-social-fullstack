import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const AddFriend = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  return (
    <View>
        <TouchableOpacity onPress={() => router.push('/addFriend')}>
            <Ionicons name="add" size={28} color="black" />
        </TouchableOpacity>
    </View>
  );
};

            

export default AddFriend;


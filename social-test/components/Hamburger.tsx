import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const Hamburger = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <View>
      {/* Hamburger Icon */}
      <TouchableOpacity onPress={toggleMenu}>
        <Ionicons name="menu" size={28} color="black" />
      </TouchableOpacity>

      {/* Collapsible Menu */}
      {isOpen && (
        <View style={styles.menu}>
          <TouchableOpacity onPress={() => router.push('/')}>
            <Text style={styles.menuItem}>🏠 Home</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.push('/messaging')}>
            <Text style={styles.menuItem}>💬 Messages</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  menu: {
    marginTop: 10,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 8,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
  },
  menuItem: {
    paddingVertical: 8,
    fontSize: 16,
  },
});

export default Hamburger;

import { Ionicons } from '@expo/vector-icons';
import { useRouter, Redirect } from 'expo-router';
import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useAuth } from '../utilities/AuthContext';

const Hamburger = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const { session, loading } = useAuth()
    
    if (loading) return null;
    
    if (!session) {
        return <Redirect href='/Auth' />
    }


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
          <TouchableOpacity onPress={() => router.push('/searchUsers')}>
            <View style={styles.menuItem}>
              <Ionicons name="add" size={28} color="black" />
              <Text style={styles.menuItem}> Search Users</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.push('/createPost')}>
            <View style={styles.menuItem}> 
              <Ionicons name="add" size={28} color="black" />
              <Text style={styles.menuItem}> Create Post </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.push({
              pathname: '/viewProfile',
              params: { userId: session.user.id },
          })}>
            <Text style={styles.menuItem}> Your Profile </Text>
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
    flexDirection: 'row',
    paddingVertical: 8,
    fontSize: 16,
  },
});

export default Hamburger;


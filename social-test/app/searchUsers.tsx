import React, { useState } from 'react';
import { View, TextInput, FlatList, Text, TouchableOpacity } from 'react-native';
import { supabase } from '../utilities/Supabase';
import { useRouter } from 'expo-router';
import Hamburger from '@/components/Hamburger';

type Golfer = {
    accounts_id: string;
    display_name: string;
    images: string | null;
    bio: string;
    handicap: string
};

export default function SearchUsers() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Golfer[]>([]);
  const router = useRouter();

  const searchGolfers = async () => {
    const { data, error } = await supabase
      .from('golfers')
      .select('accounts_id, display_name, bio, images, handicap')
      .ilike('display_name', `%${query}%`); // case-insensitive match

    if (error) {
      console.error(error);
    } else {
      setResults(data);
    }
  };

  return (
    <View style={{ padding: 20 }}>
        <Hamburger />
      <TextInput
        placeholder="Search by name"
        value={query}
        onChangeText={setQuery}
        onSubmitEditing={searchGolfers} // fires when Enter is pressed
        style={{
          borderWidth: 1,
          borderColor: '#ccc',
          padding: 10,
          marginBottom: 20,
          borderRadius: 8,
        }}
      />

      <FlatList
        data={results}
        keyExtractor={(item) => item.accounts_id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => router.push({
              pathname: '/viewProfile',
              params: { userId: item.accounts_id },
          })}
            style={{
              padding: 10,
              borderBottomWidth: 1,
              borderColor: '#eee',
            }}
          >
            <Text style={{ fontSize: 16 }}>{item.display_name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

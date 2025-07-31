import React, { useEffect, useState } from 'react';
import { Text, StyleSheet, Image, ScrollView, View } from 'react-native';
import { Card } from '@rneui/themed';
import Hamburger from '@/components/Hamburger';
import { router, useLocalSearchParams } from 'expo-router';
import { supabase } from '@/utilities/Supabase';
import { getImageUrl } from '@/utilities/getImageUrl';

type Golfer = {
  displayName: string;
  image: string | null;
  bio: string;
  handicap: string
};

export default function ProileScreen() {

    const { userId } = useLocalSearchParams();
    const [golferInfo, setGolferInfo] = useState<Golfer | null>(null)

    useEffect(() => {
        const userInfo = async () => {
            const { data, error } = await supabase
            .from('golfers')
            .select('*')
            .eq('accounts_id', userId)
    
            if (error) {
                console.log(error);
            }

            if (data) {
                const row = data[0];
                const url = await getImageUrl(row.images[0]);
                console.log(url)
                const mappedGolfer: Golfer = {
                    displayName: row.display_name,  // map snake_case to camelCase
                    image: url,            // example column name
                    bio: row.bio,                   // assuming same name, no change
                    handicap: row.handicap,         // assuming same name, no change
                };
                setGolferInfo(mappedGolfer)
                console.log(mappedGolfer)
            } else {
                router.push('/createGolferProfile')
            }
        } 
        userInfo()
    }, []) 

    console.log(golferInfo?.displayName)

    return (
        <View>
            <Hamburger />
            <ScrollView contentContainerStyle={styles.container}>
            {/* Profile Picture */}
            {golferInfo?.image ? (
                <Image source={{ uri: golferInfo?.image }} style={styles.profilePic} />
                ) : (
                <Text>Loading image...</Text>
            )}
            

            {/* Display Name */}
            <Text style={styles.name}>{golferInfo?.displayName}</Text>

            {/* Handicap */}
            <Card containerStyle={styles.card}>
                <Text style={styles.label}>Handicap</Text>
                <Text style={styles.value}>{golferInfo?.handicap}</Text>
            </Card>

            {/* Bio */}
            <Card containerStyle={styles.card}>
                <Text style={styles.label}>Bio</Text>
                <Text style={styles.bio}>{golferInfo?.bio}</Text>
            </Card>

            {/* Posts Placeholder */}
            <Card containerStyle={styles.card}>
                <Text style={styles.label}>Posts</Text>
                <Text style={styles.placeholder}>User's posts will appear here.</Text>
            </Card>
        </ScrollView>
        </View>
    )  
    
    /*
         */
    
} 

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingVertical: 20,
    backgroundColor: '#f5f5f5',
  },
  profilePic: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 16,
    backgroundColor: '#ccc',
  },
  name: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 12,
  },
  card: {
    width: '90%',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 20,
    marginVertical: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 6,
    color: '#333',
  },
  value: {
    fontSize: 18,
    color: '#111',
  },
  bio: {
    fontSize: 16,
    color: '#444',
  },
  placeholder: {
    fontSize: 14,
    fontStyle: 'italic',
    color: '#888',
  },
});

/*      This is what the image will be like 
<Image
                source={{ uri: golferInfo?.image }}
                style={styles.profilePic}
            /> */
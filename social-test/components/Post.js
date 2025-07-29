import { AntDesign } from '@expo/vector-icons';
import React, { useRef, useState, useEffect } from 'react';
import { Animated, Dimensions, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
// import { getImage } from '../utilities/getImage';
import { getImageUrl } from '@/utilities/getImageUrl';
import { supabase } from '@/utilities/Supabase';



const windowWidth = Dimensions.get('window').width;
const maxFeedWidth = 600;

const Post = ({ postData }) => {
    const [likedIds, setLikedIds] = useState({});

    // Store animated values per post to avoid all hearts animating together
    const scales = useRef(
      postData.reduce((acc, post) => {
        acc[post.id] = new Animated.Value(1);
        return acc;
      }, {})
    ).current;
  
    const toggleLike = (id) => {
      // Animate scale pop for this specific post
      Animated.sequence([
        Animated.timing(scales[id], { toValue: 1.3, duration: 150, useNativeDriver: true }),
        Animated.timing(scales[id], { toValue: 1, duration: 150, useNativeDriver: true }),
      ]).start();
  
      setLikedIds(prev => ({
        ...prev,
        [id]: !prev[id],
      }));
    };

    return (
        <View style={styles.feedContainer}>
          <FlatList
            data={postData}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => {
              const liked = likedIds[item.id];
    
              return (
                <View style={styles.post}>
                  <View style={styles.posterHeader}>
                    <TouchableOpacity>
                      <Image source={require('../assets/images/placeholders/profile_pic.jpg')} style={styles.posterPicture} />
                    </TouchableOpacity>
                    <Text>Profile Name</Text>
                  </View>
                  
                  {item.image ? (
                    <Image source={{ uri: item.image }} style={styles.image} />
                  ) : (
                    <Text>Loading image...</Text>
                  )}
                  
                  {/* Heart icon button */}
                  <TouchableOpacity
                    onPress={() => toggleLike(item.id)}
                    activeOpacity={0.7}
                    style={styles.heartButton}
                  >
                    <Animated.View style={{ transform: [{ scale: scales[item.id] }] }}>
                      <AntDesign
                        name="heart"
                        size={28}
                        color={liked ? 'red' : 'rgba(0,0,0,0.2)'}
                        style={{ opacity: liked ? 1 : 0.5 }}
                      />
                    </Animated.View>
                  </TouchableOpacity>
    
                  <Text style={styles.caption}>{item.caption}</Text>
                </View>
              );
            }}
          />
        </View>
      );
    };

const styles = StyleSheet.create({
    posterHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        width: windowWidth < maxFeedWidth ? '100%' : 600,
    },
    posterPicture: {
        width: 30, 
        height: 30,
        marginHorizontal: 10,
        marginVertical: 10,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 25,
    },
    feedContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    },
    post: {
        width: windowWidth < maxFeedWidth ? '100%' : 600,
        alignItems: 'center',
        marginVertical: 10,
        backgroundColor: '#acbacaff',
        borderRadius: 10, 
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2},
        shadowOpacity: 0.1,
        shadowRadius: 4, 
        elevation: 3,
    },
    image: {
        width: windowWidth - 20,
        height: windowWidth * 0.75,
        resizeMode: 'contain',
    },
    caption: {
        backgroundColor: '#f0f0f0',
        textAlign: 'center',
        width: windowWidth < maxFeedWidth ? '100%' : 600,
        padding: 10, 
        fontSize: 16,
    },
});

export default Post
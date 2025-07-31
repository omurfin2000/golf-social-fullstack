import { StyleSheet, View, Text } from "react-native";
// import HomeScreen from './HomeScreen';
import Hamburger from "@/components/Hamburger";
import Head from '../components/Head';
import Post from '../components/Post';
import Auth from "@/components/Auth";
import { useAuth } from "@/utilities/AuthContext";
import { router } from "expo-router";
import LogoutButton from "@/components/LogoutButton";
import { useEffect, useState } from "react";
import { supabase } from "@/utilities/Supabase";
import { getImageUrl } from "@/utilities/getImageUrl";

type PostItem = {
  id: string;
  image: string | null;
  caption: string;
};

export default function Index() {
  const { session, loading } = useAuth()
  const [posts, setPosts] = useState<PostItem[]>([]);

  useEffect (() => {
    const isUser = async () => {
      if (loading) return null;
  
      if (!session) {
        return;
      }

      const { data, error } = await supabase
      .from('golfers')
      .select('*')
      .eq('accounts_id', session.user.id)

      if (error) {
        console.warn(error)
        return;
      }

      if (!data[0]) {
        router.push('/createGolferProfile')
      }

      console.log(!data[0])

    }
    isUser();
  }, [session]);
  
  useEffect(() => {
    const loadPosts = async () => {
      if (loading) return null;
  
      if (!session) {
        return;
      }

      const { data, error } = await supabase 
      .from('golfer_posts')
      .select('caption, images, id')
      .eq('golfer_id', session.user.id);

      if (error){
        console.warn(error);
        return;
      }
      
      const enriched: PostItem[] = await Promise.all(
        data.map(async (post, index) => {
          const url = await getImageUrl(post.images[0]);
          return {
            id: post.id || index.toString(),
            image: url,
            caption: post.caption || 'Oopsie Daisey',
          };
        })
      )
      setPosts(enriched);
    }

    loadPosts();
  }, [session]);

  if (loading) return null;
  
  if (!session) {
    return;
  }  

  return (
    <>
    <View style={styles.container}>
      <View style={styles.sidebar}>
        <Hamburger />
        <LogoutButton />
      </View>
      <View style={styles.header}>
      <Head />
      </View>
      {session && session.user && <Text>{session.user.id}</Text>}
      <Post postData={posts}/>
    </View></>
  );
}

const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#c2ddffe0',
    flexDirection: 'row',
  },
  sidebar: {
    flexDirection: 'column',
    backgroundColor: '#fff',
  },
  text: {
    color: '#fff'
  }, 
  options: {
    alignItems: 'flex-start'
  },
})

/*
useEffect(() => {
      const loadPosts = async () => {
      
        const { data, error } = await supabase
          .from('golfer_posts')
          .select('caption, images')
          .eq('golfer_id', 2)

        if (error) {
          console.error('Error fetching post data.', error)
        }

      const enriched = await Promise.all(
        data.map(async (post, index) => {
          console.log(post.images)
          console.log(post.caption)
          const url = await getImageUrl(post.images[0])
          const id = index.toString()
          scales[id] = new Animated.Value(1)
          return {
            id,
            image: url,
            caption: post.caption || "Oopsie Daisy"
          }
        })
      )

       setPostData(enriched)
      }

      loadPosts()
      }, [])
 */
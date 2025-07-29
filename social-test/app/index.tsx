import { StyleSheet, View, Text } from "react-native";
// import HomeScreen from './HomeScreen';
import Hamburger from "@/components/Hamburger";
import Head from '../components/Head';
import Post from '../components/Post';
import Auth from "@/components/Auth";
import { useAuth } from "@/utilities/AuthContext";
import { Redirect } from "expo-router";

export default function Index() {
  const { session, loading } = useAuth()
  
  if (loading) return null;
  
  if (!session) {
      return <Redirect href='/Auth' />
  }
  
  if(session) {
    return (
      <>
      <View style={styles.container}>
        <View style={styles.sidebar}>
          <Hamburger />
        </View>
        <View style={styles.header}>
        <Head />
        </View>
        {session && session.user && <Text>{session.user.id}</Text>}
        <Post />
      </View></>
    );
  }

  if (!session) {
    return (
      <View>
        <Auth />
      </View>
    )
  }
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
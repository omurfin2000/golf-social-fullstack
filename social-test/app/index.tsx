import { StyleSheet, View } from "react-native";
// import HomeScreen from './HomeScreen';
import Hamburger from "@/components/Hamburger";
import Head from '../components/Head';
import Post from '../components/Post';

export default function Index() {
  return (
    <><View style={styles.header}>
      <Head />
    </View>
    <View style={styles.container}>
      <View style={styles.sidebar}>
        <Hamburger />
      </View>
      <Post />
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


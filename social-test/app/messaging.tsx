import Hamburger from "@/components/Hamburger";
import AddFriend from "@/components/AddFriend";
import Head from "@/components/Head";
import MessageBox from "@/components/MessageBox";
import { StyleSheet, Text, View, Dimensions, Image, ScrollView } from "react-native";

const windowWidth = Dimensions.get('window').width;
const maxFeedWidth = 600;

export default function messaging() {
    return (
        <>
        <View style={{alignItems: 'center'}}>
            <Head />
        </View>
        <View style={styles.container}>
            <View style={{ height: 60 }}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ height: 20}}>
                    <View style={{flexDirection: 'row'}}>
                        <AddFriend />
                        <Hamburger />
                        <View style={styles.friendIcons}>
                            <Image source={require('../assets/images/placeholders/profile_pic.jpg')} style={styles.posterPicture} />
                            <Image source={require('../assets/images/placeholders/profile_pic.jpg')} style={styles.posterPicture} />
                            <Image source={require('../assets/images/placeholders/profile_pic.jpg')} style={styles.posterPicture} />
                            <Image source={require('../assets/images/placeholders/profile_pic.jpg')} style={styles.posterPicture} />
                            <Image source={require('../assets/images/placeholders/profile_pic.jpg')} style={styles.posterPicture} />
                            <Image source={require('../assets/images/placeholders/profile_pic.jpg')} style={styles.posterPicture} />
                            <Image source={require('../assets/images/placeholders/profile_pic.jpg')} style={styles.posterPicture} />
                            <Image source={require('../assets/images/placeholders/profile_pic.jpg')} style={styles.posterPicture} />
                            <Image source={require('../assets/images/placeholders/profile_pic.jpg')} style={styles.posterPicture} />
                            <Image source={require('../assets/images/placeholders/profile_pic.jpg')} style={styles.posterPicture} />
                            <Image source={require('../assets/images/placeholders/profile_pic.jpg')} style={styles.posterPicture} />
                            <Image source={require('../assets/images/placeholders/profile_pic.jpg')} style={styles.posterPicture} />
                        </View>
                    </View>
                </ScrollView>
            </View>
            
            <MessageBox />
        </View>
        </>
        
    )
}

const styles = StyleSheet.create({
    container: {
        alignSelf: 'center',
        flexDirection: 'column',
        width: windowWidth < maxFeedWidth ? '100%' : 600,
        flex: 1,
        backgroundColor: '#d5deebff',
        borderRadius: 10, 
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2},
        shadowOpacity: 0.1,
        shadowRadius: 4, 
        elevation: 3,
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
    friendIcons: {
        flexDirection: 'row',
    },
    text: {
        color: '#ff0000ff',
    },
})


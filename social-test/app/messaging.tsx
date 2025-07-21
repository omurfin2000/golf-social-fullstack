import Hamburger from "@/components/Hamburger";
import Head from "@/components/Head";
import { StyleSheet, Text, View, Dimensions } from "react-native";

const windowWidth = Dimensions.get('window').width;
const maxFeedWidth = 600;

export default function messaging() {
    return (
        <>
        <View style={{alignItems: 'center'}}>
            <Head />
        </View>
        <View style={styles.container}>
            <Hamburger />
            <Text>Message Box</Text>
        </View>
        </>
        
    )
}

const styles = StyleSheet.create({
    container: {
        alignSelf: 'center',
        flexDirection: 'row',
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
    text: {
        color: '#ff0000ff',
    }
})


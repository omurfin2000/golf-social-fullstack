import { Link } from "expo-router";
import { StyleSheet, View } from "react-native";

const Options = ({}) => {
    return (
        <View style={styles.container}>
            <Link href="/messaging">
                Go to messaging screen.
            </Link>
        </View>
    )
}

const styles = StyleSheet.create({ 
    container: {
        alignSelf: 'flex-start',
    }
})

export default Options;
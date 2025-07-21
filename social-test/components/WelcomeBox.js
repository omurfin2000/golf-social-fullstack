import { StyleSheet, Text, View } from 'react-native';

export default function WelcomeBox({ name }) {
    return (
        <View style={styles.box}>
            <Text style={styles.box}> Welcome, {name}! </Text>
        </View>);
}

const styles = StyleSheet.create({
    box: {
        padding: 16,
        backgroundColor: '#e3e3e3',
        borderRadius: 8,
    },
    text: {
        fontSize: 18,
    },
});
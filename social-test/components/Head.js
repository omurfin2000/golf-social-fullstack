import React from 'react';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { View } from 'react-native-web';

const Head = ({}) => {
    return (
        <View style = {styles.container}>
            <TouchableOpacity onPress={() => router.push('/')}>
                <Image
                    source={require('../assets/images/placeholders/logo.jpg')}
                    resizeMode='contain'
                    style = {styles.logo}
                />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'blue',
        alignItems: 'center'
    },
    logo: {
        height: 50,
        width: 50
    }
})

export default Head
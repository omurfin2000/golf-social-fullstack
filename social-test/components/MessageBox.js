import {StyleSheet, View} from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import React, { useState, useCallback, useEffect, use } from 'react';

const MessageBox = () => {

    const [messages, setMessages] = useState([]);

    useEffect(() => {
        setMessages ([
            {
                _id: 1,
                text: 'Hello Developer!',
                createdAt: new Date(),
                user: {
                    _id: 1,
                    name: 'Me',
                }
            }
        ])
    }, []);

    const onSend = useCallback((newMessages = []) => {
        setMessages(previousMessages => 
            GiftedChat.append(previousMessages, newMessages)
        );
    }, []);

    return (
        <View style={styles.container}>
            <GiftedChat
                messages={messages}
                onSend={messages => onSend(messages)}
                user={{
                    _id: 2,
                    name: 'Not me',
                }} 
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
});

export default MessageBox;
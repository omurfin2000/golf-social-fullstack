import { useAuth } from "@/utilities/AuthContext";
import { Redirect } from "expo-router";
import { View, Text } from "react-native";


export default function addFriend() {
    const { session, loading } = useAuth()
    
    if (loading) return null;
    
    if (!session) {
        return <Redirect href='/Auth' />
    }

    return (
        <View>
            <Text>Add New Friends Page</Text>
        </View>
    )
}
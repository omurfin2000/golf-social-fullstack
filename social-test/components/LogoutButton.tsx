import { useAuth } from "@/utilities/AuthContext";
import { supabase } from "@/utilities/Supabase";
import { Button } from '@rneui/themed'
import { Redirect } from "expo-router";

export default function logoutButton() {
    const { session, loading } = useAuth()
    
    if (loading) return null // or loading spinner

    if (!session) {
        return <Redirect href="/Auth" />
    }

    return(
        <Button title={"Logout"} onPress={() => supabase.auth.signOut()} />
    )
}
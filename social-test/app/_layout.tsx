import { Stack } from "expo-router";
import { AuthProvider } from "@/utilities/AuthContext";

export default function RootLayout() {
  return (
    <AuthProvider>
      <Stack>
        <Stack.Screen name="index" options={{ title: 'Home' }}/>
        <Stack.Screen name="messaging" options={{ title: 'Messages'}} />
        <Stack.Screen name="addFriend" options={{ title: 'Add Friend'}} />
        <Stack.Screen name="createPost" options={{ title: 'Create Post' }} />
      </Stack>
    </AuthProvider>
  )
}


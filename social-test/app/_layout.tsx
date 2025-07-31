import { Stack } from "expo-router";
import { AuthProvider } from "@/utilities/AuthContext";

export default function RootLayout() {
  return (
    <AuthProvider>
      <Stack>
        <Stack.Screen name="index" options={{ title: 'Home' }}/>
        <Stack.Screen name="messaging" options={{ title: 'Messages'}} />
        <Stack.Screen name="searchUsers" options={{ title: 'Search Users'}} />
        <Stack.Screen name="createPost" options={{ title: 'Create Post' }} />
        <Stack.Screen name="createGolferProfile" options={{ title: 'Create Profile' }} />
        <Stack.Screen name="viewProfile" options={{ title: 'Golfer Profile' }} />
      </Stack>
    </AuthProvider>
  )
}


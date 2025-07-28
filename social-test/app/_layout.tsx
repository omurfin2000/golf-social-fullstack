import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: 'Home' }}/>
      <Stack.Screen name="messaging" options={{ title: 'Messages'}} />
      <Stack.Screen name="addFriend" options={{ title: 'Add Friend'}} />
      <Stack.Screen name="createPost" options={{ title: 'Create Post' }} />
    </Stack>
  )
}


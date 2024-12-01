import { Stack } from "expo-router";

export default function StackLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="userBio" />
      <Stack.Screen name="userOrgs" />
      <Stack.Screen name="userRepos" />
      <Stack.Screen name="userFollowers" />
    </Stack>
  );
}

import { Stack } from 'expo-router';

// Nested stack inside the Explore tab
export default function ExploreStack() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: 'Campus Events' }} />
      <Stack.Screen name="[id]" options={{ title: 'Event Details' }} />
    </Stack>
  );
}

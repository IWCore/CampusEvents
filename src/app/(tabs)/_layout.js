import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useApp } from '../../context/AppContext';

export default function TabsLayout() {
  const { favorites } = useApp();
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: '#4f46e5' }}>
      <Tabs.Screen
        name="explore"
        options={{ title: 'Explore', headerShown: false, tabBarIcon: ({ color, size }) => <Ionicons name="compass" size={size} color={color} /> }}
      />
      <Tabs.Screen
        name="favorites"
        options={{
          title: 'Favorites',
          tabBarBadge: favorites.length || undefined,
          tabBarIcon: ({ color, size }) => <Ionicons name="heart" size={size} color={color} />,
        }}
      />
    </Tabs>
  );
}

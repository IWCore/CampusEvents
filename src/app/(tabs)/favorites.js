import { FlatList, StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import EventCard from '../../components/EventCard';
import { useApp } from '../../context/AppContext';
import { EVENTS } from '../../data/events';

export default function Favorites() {
  const router = useRouter();
  const { favorites } = useApp();
  const data = EVENTS.filter((e) => favorites.includes(e.id));

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <EventCard event={item} onPress={() => router.push(`/explore/${item.id}`)} />}
        contentContainerStyle={{ padding: 16 }}
        ListEmptyComponent={<Text style={styles.empty}>No favorites yet. Tap the heart on an event!</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f3f4f6' },
  empty: { textAlign: 'center', marginTop: 40, color: '#555', fontSize: 16 },
});

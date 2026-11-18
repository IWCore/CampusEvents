import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useApp } from '../context/AppContext';

export default function EventCard({ event, onPress }) {
  const { isFavorite, toggleFavorite } = useApp();
  const fav = isFavorite(event.id);
  return (
    <Pressable style={styles.card} onPress={onPress}>
      <Image source={{ uri: event.image }} style={styles.image} />
      <View style={styles.body}>
        <Text style={styles.category}>{event.category.toUpperCase()}</Text>
        <Text style={styles.title}>{event.title}</Text>
        <Text style={styles.meta}>{event.date} • {event.time}</Text>
        <Text style={styles.meta}>{event.location}</Text>
      </View>
      <Pressable style={styles.heart} onPress={() => toggleFavorite(event)} hitSlop={10}>
        <Ionicons name={fav ? 'heart' : 'heart-outline'} size={26} color={fav ? '#e11d48' : '#555'} />
      </Pressable>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: '#fff', borderRadius: 14, marginBottom: 16, overflow: 'hidden', elevation: 3 },
  image: { width: '100%', height: 150 },
  body: { padding: 12 },
  category: { color: '#4f46e5', fontWeight: '700', fontSize: 12 },
  title: { fontSize: 18, fontWeight: '700', marginVertical: 2 },
  meta: { color: '#555', fontSize: 13 },
  heart: { position: 'absolute', top: 10, right: 10, backgroundColor: '#fffc', borderRadius: 20, padding: 6 },
});

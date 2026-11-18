import { Alert, Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useApp } from '../../../context/AppContext';
import { EVENTS } from '../../../data/events';
import { scheduleReminder } from '../../../utils/notifications';

export default function EventDetails() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { isFavorite, toggleFavorite } = useApp();
  const event = EVENTS.find((e) => e.id === id);

  if (!event) return <Text style={{ padding: 20 }}>Event not found.</Text>;

  const remind = async () => {
    await scheduleReminder('Event reminder', `${event.title} starts at ${event.time} at ${event.location}.`, 5);
    Alert.alert('Reminder set', 'You will be notified in 5 seconds (demo).');
  };

  return (
    <ScrollView>
      <Image source={{ uri: event.image }} style={styles.image} />
      <View style={styles.body}>
        <Text style={styles.title}>{event.title}</Text>
        <Text style={styles.meta}>{event.date} • {event.time}</Text>
        <Text style={styles.meta}>{event.location}</Text>
        <Text style={styles.desc}>{event.description}</Text>

        <Pressable style={styles.btn} onPress={() => toggleFavorite(event)}>
          <Text style={styles.btnText}>{isFavorite(event.id) ? 'Remove from favorites' : 'Add to favorites'}</Text>
        </Pressable>
        <Pressable style={[styles.btn, { backgroundColor: '#0d9488' }]} onPress={remind}>
          <Text style={styles.btnText}>Remind me (5 sec demo)</Text>
        </Pressable>
        <Pressable style={[styles.btn, { backgroundColor: '#6b7280' }]} onPress={() => router.back()}>
          <Text style={styles.btnText}>Go back</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  image: { width: '100%', height: 220 },
  body: { padding: 16 },
  title: { fontSize: 24, fontWeight: '800' },
  meta: { color: '#555', marginTop: 4, fontSize: 15 },
  desc: { marginVertical: 16, fontSize: 16, lineHeight: 22 },
  btn: { backgroundColor: '#4f46e5', padding: 14, borderRadius: 10, marginBottom: 10 },
  btnText: { color: '#fff', textAlign: 'center', fontWeight: '700' },
});

import { useState } from 'react';
import { FlatList, Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import EventCard from '../../../components/EventCard';
import { useApp } from '../../../context/AppContext';
import { CATEGORIES, EVENTS } from '../../../data/events';

export default function Explore() {
  const router = useRouter();
  const { resumeCount, lastResumed } = useApp();
  const [category, setCategory] = useState('All');
  const [modalVisible, setModalVisible] = useState(false);

  const data = category === 'All' ? EVENTS : EVENTS.filter((e) => e.category === category);

  return (
    <View style={styles.container}>
      {resumeCount > 0 && (
        <View style={styles.banner}>
          <Text style={styles.bannerText}>Welcome back! App resumed {resumeCount}x (last at {lastResumed})</Text>
        </View>
      )}
      <Pressable style={styles.filterBtn} onPress={() => setModalVisible(true)}>
        <Text style={styles.filterText}>Filter: {category}</Text>
      </Pressable>

      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <EventCard event={item} onPress={() => router.push(`/explore/${item.id}`)} />}
        contentContainerStyle={{ padding: 16 }}
        ListEmptyComponent={<Text style={{ textAlign: 'center' }}>No events found.</Text>}
      />

      <Modal visible={modalVisible} transparent animationType="slide" onRequestClose={() => setModalVisible(false)}>
        <View style={styles.overlay}>
          <View style={styles.sheet}>
            <Text style={styles.sheetTitle}>Filter by category</Text>
            {CATEGORIES.map((c) => (
              <Pressable key={c} style={[styles.option, c === category && styles.optionActive]}
                onPress={() => { setCategory(c); setModalVisible(false); }}>
                <Text style={[styles.optionText, c === category && { color: '#fff' }]}>{c}</Text>
              </Pressable>
            ))}
            <Pressable onPress={() => setModalVisible(false)}><Text style={styles.cancel}>Cancel</Text></Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f3f4f6' },
  banner: { backgroundColor: '#dcfce7', padding: 10 },
  bannerText: { textAlign: 'center', color: '#166534', fontWeight: '600' },
  filterBtn: { backgroundColor: '#4f46e5', margin: 16, marginBottom: 0, padding: 12, borderRadius: 10 },
  filterText: { color: '#fff', textAlign: 'center', fontWeight: '700' },
  overlay: { flex: 1, justifyContent: 'flex-end', backgroundColor: '#0006' },
  sheet: { backgroundColor: '#fff', padding: 20, borderTopLeftRadius: 20, borderTopRightRadius: 20 },
  sheetTitle: { fontSize: 18, fontWeight: '700', marginBottom: 12 },
  option: { padding: 12, borderRadius: 8, marginBottom: 8, backgroundColor: '#eef2ff' },
  optionActive: { backgroundColor: '#4f46e5' },
  optionText: { fontSize: 16, fontWeight: '600' },
  cancel: { textAlign: 'center', color: '#e11d48', marginTop: 8, fontWeight: '600' },
});

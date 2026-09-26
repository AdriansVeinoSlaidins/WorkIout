import { useAuth } from '@/hooks/useAuth';
import { colors } from '@/styles/global';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function HomeHeader() {
  const { session, loading } = useAuth();

  const switchViews = () => {
    if (!loading && session) {
      router.replace("/profile");
    } else {
      router.push("/account")
    }
  }

  return (
    <View style={styles.header}>

      {/* Profile */}
      <TouchableOpacity style={styles.profileButton}
        onPress={switchViews}
        disabled={loading}
      >
        <Ionicons name="person-circle-outline" size={28} color={colors.text} />
      </TouchableOpacity>

      {/* Streak */}
      <TouchableOpacity style={styles.streakButton}>
        <Ionicons name="flame" size={22} color={colors.text} />
        <Text style={styles.streak}>12</Text>
      </TouchableOpacity>

      {/* Settings */}
      <TouchableOpacity style={styles.settingsButton}>
        <Ionicons name="settings-outline" size={24} color={colors.text} />
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    width: '100%',
    height: 60,
    backgroundColor: colors.header,
    paddingHorizontal: 20,
    zIndex: 10,

    borderBottomWidth: 2,
    borderBottomColor: colors.surface,

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  profileButton: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  streakButton: {
    position: 'absolute',
    left: '50%',
    
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },

  settingsButton: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  icon: {
    fontSize: 20,
  },

  streak: {
    color: colors.text,
    fontSize: 16,
    fontWeight: 'bold',
  },
});
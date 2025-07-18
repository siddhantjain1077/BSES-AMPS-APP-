import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem
} from '@react-navigation/drawer';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Alert
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from '../screens/ThemeContext';

export function CustomDrawerContent(props) {
  const { colors, isDark, setMode } = useTheme();

  const handleLogout = async () => {
    try {
      await AsyncStorage.multiRemove(['token', 'tokenExpiry']);
      props.navigation.replace('Login');
    } catch (error) {
      console.error('Logout failed:', error);
      Alert.alert('Logout Error', 'Something went wrong while logging out.');
    }
  };

  const handleThemeToggle = () => {
    const newTheme = isDark ? 'light' : 'dark';
    setMode(newTheme);
  };

  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.header}>
        <Image
          source={require('../assets/user_imgae.jpeg')}
          style={styles.logo}
        />
        <Text style={[styles.userText, { color: colors.text }]}>
          👋 Welcome, AMPS User
        </Text>
      </View>

      <DrawerItemList {...props} />

      {/* 🎨 Theme Toggle Button */}
      <DrawerItem
        label={() => (
          <Text style={{ fontWeight: 'bold', color: colors.text }}>
            🎨 Switch to {isDark ? 'Light' : 'Dark'} Mode
          </Text>
        )}
        onPress={handleThemeToggle}
      />

      {/* 🚪 Logout Button */}
      <DrawerItem
        label={() => (
          <Text style={{ fontWeight: 'bold', color: colors.text }}>
            🚪 Logout
          </Text>
        )}
        onPress={handleLogout}
      />
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  header: {
    padding: 0,
    alignItems: 'center',
    borderBottomColor: '#ccc',
    borderBottomWidth: 0.5,
    marginBottom: 10,
  },
  logo: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  userText: {
    marginTop: 10,
    fontWeight: 'bold',
    fontSize: 16,
  },
});

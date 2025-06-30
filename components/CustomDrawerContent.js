import React from 'react';
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

export function CustomDrawerContent(props) {
  const handleLogout = async () => {
    try {
      await AsyncStorage.multiRemove(['token', 'tokenExpiry']);
      props.navigation.replace('Login');
    } catch (error) {
      console.error('Logout failed:', error);
      Alert.alert('Logout Error', 'Something went wrong while logging out.');
    }
  };

  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.header}>
        <Image
          source={require('../assets/user_imgae.jpeg')}
          style={styles.logo}
        />
        <Text style={styles.userText}>👋 Welcome, AMPS User</Text>
      </View>

      <DrawerItemList {...props} />

      <DrawerItem
        label={() => (
          <Text style={{ fontWeight: 'bold', color: '#000' }}>🚪 Logout</Text>
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

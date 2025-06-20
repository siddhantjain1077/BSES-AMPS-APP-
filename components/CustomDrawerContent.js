import React from 'react';
import { DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import { View, Text, Image, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.header}>
        <Image source={require('../assets/user_imgae.jpeg')} style={styles.logo} />
        <Text style={styles.userText}>👋 Welcome, AMPS User</Text>
      </View>

      <DrawerItemList {...props} />

      <DrawerItem
        label={() => 
        <Text style={{ fontWeight: 'bold', color:
          '000' }}>🚪 Logout</Text>
        }

        // icon={({ color, size }) => <Icon name="logout" size={size} color={color} />}
        onPress={() => props.navigation.replace('Login')}
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

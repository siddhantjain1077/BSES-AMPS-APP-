import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import NetInfo from '@react-native-community/netinfo';

const NetworkGuard = ({ children }) => {
  const [isConnected, setIsConnected] = useState(true);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected);
    });

    return () => unsubscribe();
  }, []);

  if (!isConnected) {
    return (
      <View style={styles.offlineContainer}>
        <Text style={styles.offlineText}>🔌 No Internet Connection</Text>
        <Text style={styles.offlineSubText}>Please connect to the internet to continue using the app.</Text>
      </View>
    );
  }

  return children;
};

export default NetworkGuard;

const styles = StyleSheet.create({
  offlineContainer: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  offlineText: {
    fontSize: 20,
    color: 'red',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  offlineSubText: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
  },
});

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  BackHandler,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { useTheme } from '../screens/ThemeContext';
import { postRequest, PENDING_LIST_URL } from '../Services/api';

const HomeScreen = ({ navigation }) => {
  const { isDark, mode, setMode, colors } = useTheme();
  const [selectedTab, setSelectedTab] = useState('Pending');
  const [searchQuery, setSearchQuery] = useState('');
  const [dataList, setDataList] = useState([]);

  useEffect(() => {
    fetchPendingList();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
        Alert.alert('Exit App', 'Are you sure you want to exit?', [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Yes', onPress: () => BackHandler.exitApp() },
        ]);
        return true;
      });
      return () => backHandler.remove();
    }, [])
  );

  const fetchPendingList = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const expiry = await AsyncStorage.getItem('tokenExpiry');

      if (!token || Date.now() > parseInt(expiry)) {
        Alert.alert('Session Expired', 'Please log in again.');
        await AsyncStorage.multiRemove(['token', 'tokenExpiry']);
        navigation.replace('Login');
        return;
      }

      const payload = {
        userId: 'dsktfauTo',
        division: 'S2RKP',
      };
      console.log('[📦 Payload]', payload);

      const response = await postRequest(PENDING_LIST_URL, payload);
      console.log('[✅ API Response]', response);
      console.log('[✅ API Data]', response?.data);

      if (Array.isArray(response.data)) {
        console.log('Statuses:', response.data.map(d => d.status));
        console.log('[Sample Item]', response.data[0]);
        console.log('Total items:', response.data.length);
        console.log("[Total] Items]", response.data);
        setDataList(response.data);
      } else {
        Alert.alert('Error', 'Unexpected response from server.');
      }
    } catch (error) {
      console.error('Fetch error:', error);
      Alert.alert('Error', 'Failed to fetch pending case list.');
    }
  };

  const filteredData = dataList.filter(item => {
    const lower = searchQuery.toLowerCase();
    return (
      item.applicantName?.toLowerCase().includes(lower) ||
      item.orderNo?.toLowerCase().includes(lower) ||
      item.address?.toLowerCase().includes(lower)
    );
  });

  const renderHeader = () => (
    <View>
      <View style={styles.topBar}>
        <Text style={[styles.headerText, { color: colors.text }]}>👋 Welcome, AMPS User</Text>
      </View>

      <View style={styles.tabContainer}>
        {['Pending', 'Approved', 'Rejected'].map(tab => {
          const isActive = selectedTab === tab;
          const bg = isActive ? (tab === 'Pending' ? '#007bff' : tab === 'Approved' ? '#28a745' : '#dc3545') : 'transparent';
          const border = tab === 'Pending' ? '#007bff' : tab === 'Approved' ? '#28a745' : '#dc3545';
          const color = isActive ? '#fff' : border;
          return (
            <TouchableOpacity
              key={tab}
              onPress={() => setSelectedTab(tab)}
              style={[styles.tabButton, { borderColor: border, backgroundColor: bg }]}
            >
              <Text style={[styles.tabText, { color }]}>{tab}</Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <View style={[styles.searchContainer, { backgroundColor: colors.searchBg }]}>
        <TextInput
          style={[styles.searchInput, { color: colors.text }]}
          placeholder="Search by name, order no, or address..."
          placeholderTextColor="#888"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <Text style={[styles.refreshText, { color: '#007bff' }]}>⟳</Text>
      </View>

      <Text style={[styles.totalText, { color: colors.text }]}>Total Cases: {filteredData.length}</Text>
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <FlatList
        data={filteredData}
        keyExtractor={item => item.orderNo}
        ListHeaderComponent={renderHeader}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('Details', {
                orderDetails: {
                  orderNo: item.orderNo,
                  division: 'S2RKP',
                  zdin: item.zdin,
                },
              })
            }
          >
            <View style={[styles.card, { backgroundColor: colors.card }]}>
              <Text style={[styles.orderNo, { color: colors.text }]}>Order No: {item.orderNo}</Text>
              <Text style={[styles.name, { color: colors.text }]}>Applicant: {item.applicantName}</Text>
              <Text style={[styles.address, { color: colors.text }]}>{item.address}</Text>
              <Text style={[styles.date, { color: colors.text }]}>Received: {item.entryDate}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flex: 1,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
    marginTop: 10,
    paddingHorizontal: 10,
  },
  tabButton: {
    borderWidth: 1,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  tabText: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 8,
    fontSize: 16,
  },
  refreshText: {
    fontSize: 20,
    marginLeft: 8,
  },
  totalText: {
    alignSelf: 'flex-end',
    marginBottom: 10,
    fontWeight: 'bold',
  },
  card: {
    borderRadius: 12,
    padding: 15,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  orderNo: {
    fontWeight: 'bold',
    marginBottom: 4,
  },
  name: {
    fontWeight: 'bold',
    marginBottom: 4,
  },
  address: {
    fontSize: 14,
    marginBottom: 4,
  },
  date: {
    fontSize: 13,
  },
});

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
import {
  postRequest,
  PENDING_LIST_URL,
  COMPLETED_CASE_URL,
} from '../Services/api';

const HomeScreen = ({ navigation }) => {
  const { isDark, colors } = useTheme(); // Theme context
  const [selectedTab, setSelectedTab] = useState('Pending'); // Default tab
  const [searchQuery, setSearchQuery] = useState(''); // Search input
  const [dataList, setDataList] = useState([]); // List of fetched cases
  const [refreshing, setRefreshing] = useState(false); // Pull-to-refresh

  // Fetch data on tab change
  useEffect(() => {
    if (selectedTab === 'Pending') {
      fetchPendingList();
    } else {
      fetchCompletedList();
    }
  }, [selectedTab]);

  // Handle Android hardware back button with exit confirmation
  useFocusEffect(
    React.useCallback(() => {
      const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
        Alert.alert('Exit App', 'Are you sure you want to exit?', [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Yes', onPress: () => BackHandler.exitApp() },
        ]);
        return true;
      });
      return () => backHandler.remove(); // Clean up
    }, [])
  );

  // Fetch pending cases API
  const fetchPendingList = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const expiry = await AsyncStorage.getItem('tokenExpiry');

      // Token expired or not found
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

      const response = await postRequest(PENDING_LIST_URL, payload);
      if (Array.isArray(response.data)) {
        setDataList(response.data);
      } else {
        Alert.alert('Error', 'Unexpected response from pending API.');
      }
    } catch (error) {
      console.error('Pending fetch error:', error);
      Alert.alert('Error', 'Failed to fetch pending cases.');
    }
  };

  // Fetch approved/rejected cases from completed API
  const fetchCompletedList = async () => {
    try {
      const payload = {
        userId: 'dsktfauTo',
        division: 'S2RKP',
      };

      const response = await postRequest(COMPLETED_CASE_URL, payload);
      if (Array.isArray(response.data)) {
        setDataList(response.data);
        console.log('Completed cases fetched:', response.data);
      } else {
        Alert.alert('Error', 'Unexpected response from completed API.');
      }
    } catch (error) {
      console.error('Completed fetch error:', error);
      Alert.alert('Error', 'Failed to fetch completed cases.');
    }
  };

  // Pull-to-refresh logic
  const onRefresh = async () => {
    setRefreshing(true);
    if (selectedTab === 'Pending') {
      await fetchPendingList();
    } else {
      await fetchCompletedList();
    }
    setRefreshing(false);
  };

  // Filter data based on search query and tab status
  const filteredData = dataList.filter(item => {
    const lower = searchQuery.toLowerCase();
    const matchesSearch =
      item.applicantName?.toLowerCase().includes(lower) ||
      item.orderNo?.toLowerCase().includes(lower) ||
      item.address?.toLowerCase().includes(lower);

    const status = item.caseFlag?.toUpperCase();

    if (selectedTab === 'Approved') {
      return matchesSearch && status === 'A';
    } else if (selectedTab === 'Rejected') {
      return matchesSearch && status === 'R';
    }

    return matchesSearch; // For pending
  });

  // Render header (tabs + search bar + count)
  const renderHeader = () => (
    <View>
      {/* Welcome Text */}
      <View style={styles.topBar}>
        <Text style={[styles.headerText, { color: colors.text }]}>
          👋 Welcome, AMPS User
        </Text>
      </View>

      {/* Tab Buttons */}
      <View style={styles.tabContainer}>
        {['Pending', 'Approved', 'Rejected'].map(tab => {
          const isActive = selectedTab === tab;
          const bg = isActive
            ? tab === 'Pending'
              ? '#007bff'
              : tab === 'Approved'
              ? '#28a745'
              : '#dc3545'
            : 'transparent';
          const border =
            tab === 'Pending'
              ? '#007bff'
              : tab === 'Approved'
              ? '#28a745'
              : '#dc3545';
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

      {/* Search Input */}
      <View style={[styles.searchContainer, { backgroundColor: colors.searchBg }]}>
        <TextInput
          style={[styles.searchInput, { color: colors.text }]}
          placeholder="Search by name, order no, or address..."
          placeholderTextColor="#888"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        {/* Refresh Icon */}
        <Text style={[styles.refreshText, { color: '#007bff' }]}>⟳</Text>
      </View>

      {/* Total Count */}
      <Text style={[styles.totalText, { color: colors.text }]}>
        Total Cases: {filteredData.length}
      </Text>
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* List of filtered cases */}
      <FlatList
        data={filteredData}
        keyExtractor={(item, index) => `${item.orderNo}_${index}`}
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
              <Text style={[styles.orderNo, { color: colors.text }]}>
                Order No: {item.orderNo}
              </Text>
              <Text style={[styles.name, { color: colors.text }]}>
                Applicant: {item.applicantName}
              </Text>
              <Text style={[styles.address, { color: colors.text }]}>
                {item.address}
              </Text>
              <Text style={[styles.date, { color: colors.text }]}>
                Status:{' '}
                {item.caseFlag === 'A'
                  ? 'Approved'
                  : item.caseFlag === 'R'
                  ? 'Rejected'
                  : 'Pending'}
              </Text>
            </View>
          </TouchableOpacity>
        )}
        refreshing={refreshing}
        onRefresh={onRefresh}
      />
    </View>
  );
};

export default HomeScreen;

// Style definitions
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

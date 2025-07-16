import React, { useState, useEffect, useLayoutEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
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
import DateTimePicker from '@react-native-community/datetimepicker';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(customParseFormat);

const HomeScreen = ({ navigation, route }) => {
  const { isDark, colors } = useTheme();
  const [selectedTab, setSelectedTab] = useState('Pending');
  const [searchQuery, setSearchQuery] = useState('');
  const [dataList, setDataList] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      if (route?.params?.from === 'reject') {
        setSelectedTab('Rejected');
      } else if (route?.params?.from === 'approve') {
        setSelectedTab('Approved');
      } else {
        setSelectedTab('Pending');
      }

      if (selectedTab === 'Pending') {
        fetchPendingList();
      } else {
        fetchCompletedList();
      }

      return () => {};
    }, [route?.params])
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <Text style={{ fontSize: 18, fontWeight: 'bold', color: colors.text }}>
          👋 Welcome, AMPS User
        </Text>
      ),
      headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.openDrawer()} style={{ paddingHorizontal: 15 }}>
          <Text style={{ fontSize: 24, color: colors.text }}>☰</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation, colors]);

  useEffect(() => {
    if (selectedTab === 'Pending') {
      fetchPendingList();
    } else {
      fetchCompletedList();
    }
  }, [selectedTab]);

  const fetchPendingList = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const expiry = await AsyncStorage.getItem('tokenExpiry');

      if (!token || !expiry || Date.now() > parseInt(expiry)) {
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

  const fetchCompletedList = async () => {
    try {
      const payload = {
        userId: 'dsktfauTo',
        division: 'S2RKP',
      };

      const response = await postRequest(COMPLETED_CASE_URL, payload);
      if (Array.isArray(response.data)) {
        setDataList(response.data);
      } else {
        Alert.alert('Error', 'Unexpected response from completed API.');
      }
    } catch (error) {
      console.error('Completed fetch error:', error);
      Alert.alert('Error', 'Failed to fetch completed cases.');
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    if (selectedTab === 'Pending') {
      await fetchPendingList();
    } else {
      await fetchCompletedList();
    }
    setRefreshing(false);
  };

  const filteredData = dataList.filter(item => {
    const lower = searchQuery.toLowerCase();
    const matchesSearch =
      item.applicantName?.toLowerCase().includes(lower) ||
      item.orderNo?.toLowerCase().includes(lower) ||
      item.address?.toLowerCase().includes(lower);

    const status = item.caseFlag?.toUpperCase();
    const actionDateStr = item.actionTakenDate;

    let matchesStatus = false;
    if (selectedTab === 'Approved' && status === 'A') matchesStatus = true;
    else if (selectedTab === 'Rejected' && status === 'R') matchesStatus = true;
    else if (selectedTab === 'Pending') return matchesSearch;

    if (!matchesSearch || !matchesStatus) return false;

    if (!startDate && !endDate) return true;

    if (actionDateStr) {
      const format = 'DD/MM/YYYY hh:mm:ss A';
      const actionTime = dayjs(actionDateStr, format).valueOf();
      const startTime = startDate ? dayjs(startDate).startOf('day').valueOf() : -Infinity;
      const endTime = endDate ? dayjs(endDate).endOf('day').valueOf() : Infinity;

      return actionTime >= startTime && actionTime <= endTime;
    }

    return false;
  });

  const clearFilters = () => {
    setSearchQuery('');
    setStartDate('');
    setEndDate('');
  };

  const renderHeader = () => (
    <View>
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

      {/* Search Bar with Dates */}
      <View style={[styles.searchBarRow, { backgroundColor: colors.searchBg }]}>
        <TextInput
          style={[styles.searchInput, { color: colors.text }]}
          placeholder="Search by name, order no, or address..."
          placeholderTextColor="#888"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />

        <TouchableOpacity
          onPress={() => setShowStartPicker(true)}
          style={[styles.dateMiniButton, { backgroundColor: colors.card }]}
        >
          <Text style={{ color: colors.text, fontSize: 11 }}>
            {startDate ? `📅 ${startDate}` : 'Start'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setShowEndPicker(true)}
          style={[styles.dateMiniButton, { backgroundColor: colors.card }]}
        >
          <Text style={{ color: colors.text, fontSize: 11 }}>
            {endDate ? `📅 ${endDate}` : 'End'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={clearFilters}>
          <Text style={{ fontSize: 16, color: '#dc3545', marginLeft: 6 }}>✕</Text>
        </TouchableOpacity>
      </View>

      {showStartPicker && (
        <DateTimePicker
          value={startDate ? new Date(startDate) : new Date()}
          mode="date"
          display="default"
          onChange={(event, selectedDate) => {
            setShowStartPicker(false);
            if (selectedDate) {
              setStartDate(selectedDate.toISOString().split('T')[0]);
            }
          }}
        />
      )}

      {showEndPicker && (
        <DateTimePicker
          value={endDate ? new Date(endDate) : new Date()}
          mode="date"
          display="default"
          onChange={(event, selectedDate) => {
            setShowEndPicker(false);
            if (selectedDate) {
              setEndDate(selectedDate.toISOString().split('T')[0]);
            }
          }}
        />
      )}

      <Text style={[styles.totalText, { color: colors.text }]}>
        Total Cases: {filteredData.length}
      </Text>
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
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
                  consumerNumber: item.consumerMobile || item.mobileNo || item.mobile || '',
                  orderDetails: item,
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

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingTop: 0,
    flex: 1,
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
    marginTop: 20,
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
  searchBarRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 6,
    marginVertical: 10,
    gap: 6,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    paddingVertical: 6,
  },
  dateMiniButton: {
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
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

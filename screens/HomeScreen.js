// Updated HomeScreen.js
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from 'react-native';
import { useTheme } from './ThemeContext'; // Adjust path if needed

const mockData = [
  {
    orderNo: '008007158358',
    name: 'SWATI DEVI',
    address: 'QTR 806 SEC-1, R K PURAM NEW DELHI 1ST FLOOR TYPE-2 DELHI 110022',
    date: '03/04/2025 04:18 PM',
    status: 'Approved',
  },
  {
    orderNo: '008007143226',
    name: 'JAGDISH PRASAD',
    address: 'QTR-1698 SEC-5 R K PURAM 1ST FLOOR TYPE-II DELHI 110022',
    date: '07/04/2025 05:38 PM',
    status: 'Pending',
  },
  {
    orderNo: '008007143228',
    name: 'PRIYA SINGH',
    address: 'FLAT 203, GREEN APARTMENTS, SAKET, NEW DELHI 110017',
    date: '06/04/2025 09:45 AM',
    status: 'Pending',
  },
  {
    orderNo: '008007143229',
    name: 'AMAN KHAN',
    address: 'A-42, FIRST FLOOR, OKHLA PHASE II, DELHI 110020',
    date: '05/04/2025 03:30 PM',
    status: 'Rejected',
  },
  {
    orderNo: '008007143227',
    name: 'RAHUL VERMA',
    address: 'HOUSE NO 12, BLOCK C, JANAKPURI, NEW DELHI 110058',
    date: '08/04/2025 11:15 AM',
    status: 'Approved',
  },
  {
    orderNo: '008007143231',
    name: 'VIKAS SHARMA',
    address: 'H.NO 180, SECTOR-8, DWARKA, NEW DELHI 110075',
    date: '03/04/2025 06:10 PM',
    status: 'Pending',
  },
  {
    orderNo: '008007143232',
    name: 'ANITA RANI',
    address: 'FLAT NO 101, BLOCK B, VASANT KUNJ, NEW DELHI 110070',
    date: '04/04/2025 02:20 PM',
    status: 'Pending',
  },
  {
    orderNo: '008007143233',
    name: 'RAJESH KUMAR',
    address: 'H.NO 45, SECTOR-12, ROHINI, NEW DELHI 110085',
    date: '05/04/2025 10:00 AM',
    status: 'Pending',
  },
  // add more mock entries if needed
];
  // ...more items


const HomeScreen = ({ navigation }) => {
  const { isDark, mode, setMode, colors } = useTheme();
  const [selectedTab, setSelectedTab] = useState('Pending');
  const [searchQuery, setSearchQuery] = useState('');

  const toggleTheme = () => {
    const next = mode === 'light' ? 'dark' : mode === 'dark' ? 'system' : 'light';
    setMode(next);
  };

  useEffect(() => {
    setSearchQuery('');
  }, [selectedTab]);

  const filteredData = mockData.filter(item => {
    const lowerQuery = searchQuery.toLowerCase();
    return (
      item.status === selectedTab &&
      (
        item.name.toLowerCase().includes(lowerQuery) ||
        item.orderNo.toLowerCase().includes(lowerQuery) ||
        item.address.toLowerCase().includes(lowerQuery)
      )
    );
  });

  const renderHeader = () => (
    <View>
      <View style={styles.topBar}>
        <Text style={[styles.headerText, { color: colors.text }]}>👋 Welcome, TEST AMPS</Text>
        <View style={{ flexDirection: 'row', gap: 10 }}>
          <TouchableOpacity onPress={toggleTheme}>
            <Text style={{ color: colors.text, fontSize: 18 }}>
              {mode === 'light' ? '☀️' : mode === 'dark' ? '🌙' : '⚙️'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.replace('Login')}>
            <Text style={{ color: '#dc3545', fontWeight: 'bold' }}>Logout</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.tabContainer}>
        {['Pending', 'Approved', 'Rejected'].map(tab => {
          const isActive = selectedTab === tab;
          const backgroundColor = isActive ? (tab === 'Pending' ? '#007bff' : tab === 'Approved' ? '#28a745' : '#dc3545') : 'transparent';
          const borderColor = tab === 'Pending' ? '#007bff' : tab === 'Approved' ? '#28a745' : '#dc3545';
          const textColor = isActive ? '#fff' : borderColor;

          return (
            <TouchableOpacity
              key={tab}
              onPress={() => setSelectedTab(tab)}
              style={[styles.tabButton, { borderColor, backgroundColor }]}
            >
              <Text style={[styles.tabText, { color: textColor }]}>{tab}</Text>
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
          <TouchableOpacity onPress={() => navigation.navigate('Details', { orderDetails: item })}>
            <View style={[styles.card, { backgroundColor: colors.card }]}>
              <Text style={[styles.orderNo, { color: colors.text }]}>Order No: {item.orderNo}</Text>
              <Text style={[styles.name, { color: colors.text }]}>Applicant: {item.name}</Text>
              <Text style={[styles.address, { color: colors.text }]}>{item.address}</Text>
              <Text style={[styles.date, { color: colors.text }]}>Received: {item.date}</Text>
              <Text style={[styles.badge, { backgroundColor: colors.badgeBg, color: colors.badgeText }]}>🕒 {item.status}</Text>
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
    marginTop: 70,
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
  badge: {
    marginTop: 8,
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
    fontSize: 12,
    fontWeight: '600',
  },
});

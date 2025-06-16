import React from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet } from 'react-native';

const ForgetScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Change Password</Text>

      <Text style={styles.label}>Enter your UID</Text>
      <TextInput
        placeholder="UID or Email"
        placeholderTextColor="#888"
        style={styles.input}
        keyboardType="email-address"
      />

      <Text style={styles.label}>Enter Old Password</Text>
      <TextInput
        placeholder="Username"
        placeholderTextColor="#888"
        style={styles.input}
      />

      <Text style={styles.label}>Enter new password</Text>
      <TextInput
        placeholder="Password"
        placeholderTextColor="#888"
        style={styles.input}
        secureTextEntry
      />

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>SUBMIT</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ForgetScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0B1547',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
  },
  heading: {
    color: '#FFFFFF',
    fontSize: 24,
    marginBottom: 20,
    fontWeight: 'bold',
  },
  label: {
    color: '#FFFFFF',
    fontSize: 16,
    marginBottom: 10,
    alignSelf: 'flex-start',
  },
  input: {
    width: '100%',
    backgroundColor: '#333',
    padding: 12,
    borderRadius: 8,
    color: '#fff',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#FF0000',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

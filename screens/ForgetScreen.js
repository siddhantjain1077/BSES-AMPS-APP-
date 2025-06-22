import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
} from 'react-native';
import bgImage from '../assets/change_password.png'; // update path if needed

const ForgetScreen = () => {
  return (
    <ImageBackground source={bgImage} style={styles.background} resizeMode="cover">
      <View style={styles.container}>
        <Text style={styles.heading}>Change Password</Text>

        <Text style={styles.label}>Enter your UID</Text>
        <TextInput
          placeholder="UID or Email"
          placeholderTextColor="#000"
          style={styles.input}
          keyboardType="email-address"
        />

        <Text style={styles.label}>Enter Old Password</Text>
        <TextInput
          placeholder="Username"
          placeholderTextColor="#000"
          style={styles.input}
        />

        <Text style={styles.label}>Enter new password</Text>
        <TextInput
          placeholder="Password"
          placeholderTextColor="#000"
          style={styles.input}
          secureTextEntry
        />

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>SUBMIT</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

export default ForgetScreen;

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: 'rgba(25, 27, 116, 0.7)', // semi-transparent fallback
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
    placeholderTextColor: 'fff',
    marginBottom: 10,
    alignSelf: 'flex-start',
  },
  input: {
    width: '100%',
    backgroundColor: '#ffffff',
    padding: 12,
    borderRadius: 8,
    color: '#000',
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

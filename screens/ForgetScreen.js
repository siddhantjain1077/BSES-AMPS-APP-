import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  ToastAndroid,
  ActivityIndicator,
} from 'react-native';
import bgImage from '../assets/change_password.jpeg';
import { FORGET_PASSWORD } from '../Services/api';

const ForgetScreen = () => {
  const [uid, setUid] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    if (!uid || !oldPassword || !newPassword) {
      ToastAndroid.showWithGravity(
        'Please fill all fields!',
        ToastAndroid.SHORT,
        ToastAndroid.CENTER
      );
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(FORGET_PASSWORD, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: uid,
          oldPassword: oldPassword,
          newPassword: newPassword,
        }),
      });

      const data = await response.json();

      setIsLoading(false);

      if (response.ok && data?.success !== false) {
        ToastAndroid.showWithGravity(
          'Password Changed Successfully!',
          ToastAndroid.SHORT,
          ToastAndroid.CENTER
        );
        setUid('');
        setOldPassword('');
        setNewPassword('');
      } else {
        ToastAndroid.showWithGravity(
          data?.message || 'Password change failed!',
          ToastAndroid.SHORT,
          ToastAndroid.CENTER
        );
      }
    } catch (error) {
      setIsLoading(false);
      console.error('[❌ Fetch Error]', error);
      ToastAndroid.showWithGravity(
        'Something went wrong!',
        ToastAndroid.SHORT,
        ToastAndroid.CENTER
      );
    }
  };

  return (
    <ImageBackground source={bgImage} style={styles.background} resizeMode="cover">
      <View style={styles.container}>
        <Text style={styles.heading}>Change Password</Text>

        <Text style={styles.label}>Enter your UID</Text>
        <TextInput
          value={uid}
          onChangeText={setUid}
          placeholder="UID or Email"
          placeholderTextColor="#000"
          style={styles.input}
        />

        <Text style={styles.label}>Enter Old Password</Text>
        <TextInput
          value={oldPassword}
          onChangeText={setOldPassword}
          placeholder="Old Password"
          placeholderTextColor="#000"
          style={styles.input}
          secureTextEntry
        />

        <Text style={styles.label}>Enter New Password</Text>
        <TextInput
          value={newPassword}
          onChangeText={setNewPassword}
          placeholder="New Password"
          placeholderTextColor="#000"
          style={styles.input}
          secureTextEntry
        />

        <TouchableOpacity style={styles.button} onPress={handleSubmit} disabled={isLoading}>
          {isLoading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>SUBMIT</Text>
          )}
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
    // backgroundColor: 'rgba(25, 27, 116, 0.7)',
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

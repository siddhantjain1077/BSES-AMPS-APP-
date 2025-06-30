import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  Image,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import loginPage from '../assets/login_page_2.jpeg';
import BijliSevaKendraImage_withoutBG from '../assets/BijliSevaKendra_withoutBG.png';
import electric_car from '../assets/electric_car.png';

import { LOGIN_URL, postRequest } from '../Services/api';

const TOKEN_EXPIRY_TIME = 60 * 60 * 1000; // 1 hour

const LoginScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(false);

  // Auto-login logic
  useEffect(() => {
    const checkToken = async () => {
      const token = await AsyncStorage.getItem('token');
      const expiry = await AsyncStorage.getItem('tokenExpiry');

      console.log('[AutoLogin Check]', { token, expiry });

      if (token && expiry && Date.now() < parseInt(expiry)) {
        console.log('[Auth] Token still valid, navigating...');
        navigation.replace('DrawerNavigator');
      } else {
        console.log('[Auth] Token missing or expired');
        await AsyncStorage.multiRemove(['token', 'tokenExpiry']);
      }
    };

    checkToken();
  }, []);

  const handleLogin = async () => {
    const userid = 'dsktfauTo';
    const password = 'BSES@321';

    const val = { username: userid, password };

    try {
      setLoading(true);
      const result = await postRequest(LOGIN_URL, val);
      console.log('Login response:', result);

      const token = result?.data?.token;

      if (result?.success && token) {
        const expiry = Date.now() + TOKEN_EXPIRY_TIME;
        console.log('[Auth] Token received:', token);
        await AsyncStorage.setItem('token', token);
        await AsyncStorage.setItem('tokenExpiry', expiry.toString());
        console.log('[Auth] Token expiry set:', expiry);
        console.log('[Stored]', { token, expiry });
        console.log('Success', 'Login successful');
        console.log('Navigating to DrawerNavigator');
        navigation.replace('DrawerNavigator');
      } else {
        Alert.alert('Login Failed', result?.message || 'Invalid credentials');
      }
    } catch (err) {
      console.error('Login failed:', err);
      Alert.alert('Error', 'An error occurred while logging in.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ImageBackground
      source={loginPage}
      resizeMode="cover"
      style={styles.background}
    >
      <KeyboardAvoidingView
        style={styles.fullContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <Image
          source={BijliSevaKendraImage_withoutBG}
          style={styles.BijliSevaKendraImage}
          resizeMode="contain"
        />

        <View style={styles.centerContainer}>
          <View style={styles.loginBox}>
            <Text style={styles.title}>BSES AMPS LOGIN</Text>

            <Text style={styles.label}>USERNAME</Text>
            <TextInput
              style={styles.input}
              placeholder="dsktfauTo"
              value="dsktfauTo"
              editable={false}
              placeholderTextColor="#fff"
            />

            <Text style={styles.label}>PASSWORD</Text>
            <TextInput
              style={styles.input}
              placeholder="BSES@321"
              value="BSES@321"
              editable={false}
              placeholderTextColor="#fff"
              secureTextEntry
            />

            <TouchableOpacity onPress={() => navigation.navigate('Forget')}>
              <Text style={styles.forgot}>Forgot my password?</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={loading}>
              <Text style={styles.buttonText}>{loading ? 'Please wait...' : 'SUBMIT'}</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.bottomImageContainer}>
          <Image
            source={electric_car}
            style={styles.funkyImage}
            resizeMode="contain"
          />
        </View>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  background: { flex: 1 },
  fullContainer: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 0,
  },
  centerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flexGrow: 1,
    marginBottom: 60,
  },
  loginBox: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 20,
    padding: 20,
    width: '100%',
    alignItems: 'center',
    borderColor: 'white',
    borderWidth: 1,
  },
  title: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  label: {
    color: 'white',
    alignSelf: 'flex-start',
    marginLeft: 10,
    marginTop: 10,
    fontWeight: 'bold',
  },
  input: {
    backgroundColor: '#333',
    width: '100%',
    padding: 10,
    borderRadius: 5,
    marginTop: 5,
    color: 'white',
    borderBottomColor: 'black',
    borderBottomWidth: 2,
  },
  forgot: {
    color: 'red',
    marginTop: 10,
    alignSelf: 'flex-start',
    fontWeight: 'bold',
    marginRight: 170,
  },
  button: {
    backgroundColor: 'red',
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 50,
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  bottomImageContainer: {
    position: 'relative',
    bottom: 5,
  },
  funkyImage: {
    width: '100%',
    height: 145,
  },
  BijliSevaKendraImage: {
    width: '100%',
    height: 180,
    marginTop: 110,
    borderRadius: 40,
    textAlign: 'center',
    alignItems: 'center',
  },
});


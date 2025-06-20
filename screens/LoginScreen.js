import React from 'react';
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
} from 'react-native';
import loginPage from '../assets/login_page_2.jpeg';
import BijliSevaKendraImage_withoutBG from '../assets/BijliSevaKendra_withoutBG.png';
import electric_car from '../assets/electric_car.png';

const LoginScreen = ({ navigation }) => {
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
              placeholder="Enter your username"
              placeholderTextColor="#fff"
            />

            <Text style={styles.label}>PASSWORD</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your password"
              placeholderTextColor="#fff"
              secureTextEntry
            />

            <TouchableOpacity onPress={() => navigation.navigate('Forget')}>
              <Text style={styles.forgot}>Forgot my password?</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={() => navigation.replace('DrawerNavigator')}>
              <Text style={styles.buttonText}>SUBMIT</Text>
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
  background: {
    flex: 1,
  },
  fullContainer: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    // paddingVertical: 30,
    paddingTop: 30,

  },
  centerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flexGrow: 1,
    marginBottom: 120
  },
  logoBox: {
    backgroundColor: 'rgba(255,255,255,0.8)',
    borderRadius: 30,
    paddingVertical: 15,
    paddingHorizontal: 40,
    marginBottom: 20,
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
    // textDecorationLine: 'underline',
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
    height: 150,
  },
  logoText: {
    color: '#0B1547',
    fontWeight: 'bold',
  },
  BijliSevaKendraImage: {
  width: '100%',
  height: 180,
  marginBottom: 12,
  marginTop: 110, 
  borderRadius: 40,
  textAlign: 'center',
  alignItems: 'center',
  },
});


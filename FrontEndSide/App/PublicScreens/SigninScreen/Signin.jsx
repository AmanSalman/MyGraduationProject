import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Image, KeyboardAvoidingView, Platform, ActivityIndicator, Alert } from 'react-native';
import { useDispatch } from 'react-redux';
import { storeToken } from '../../ReduxAndAsyncStorage/Actions'; 
import axios from 'axios';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import Colors from '../../Common/Utils/Colors';

const Signin = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (email === '' || password === '') {
      setError('الرجاء تعبئة جميع الحقول');
    } else {
      setError('');
      setLoading(true);
      try {
        const response = await axios.post('https://ecommercebackend-jzct.onrender.com/auth/login', {
          email,
          password
        });
      
        const { token } = response.data;
      
        await dispatch(storeToken(token)); // حفظ التوكن باستخدام الـ Redux action
      
        console.log('You have been logged in successfully. Token is :', token);
        Alert.alert('Login successful', 'تم تسجيل الدخول بنجاح', [
          { text: 'OK', onPress: () => navigation.navigate('Home') }
        ]);
      } catch (error) {
        console.error('Error signing in:', error);
        setError('حدث خطأ أثناء تسجيل الدخول');
      } finally {
        setLoading(false);
      }
    }
  };
  

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <View style={styles.logoContainer}>
        <Image source={require('../../../assets/logo/logo.jpg')} style={styles.logo} />
      </View>

      <Text style={styles.title}>تسجيل الدخول</Text>
      {error !== '' && <Text style={styles.error}>{error}</Text>}
      <View style={styles.content}>
        <View style={styles.inputContainer}>
          <Icon name="envelope" size={20} color="#0abae4" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="  أدخل البريد الالكتروني "
            value={email}
            onChangeText={setEmail}
          />
        </View>

        <View style={styles.inputContainer}>
          <Icon name="lock" size={20} color="#0abae4" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder=" أدخل كلمة المرور"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
          <Text style={styles.link}>هل نسيت كلمة المرور؟</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={loading}>
        {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>تسجيل الدخول  <Icon name="sign-in" size={20} color="white" /></Text>}
      </TouchableOpacity>

      <View style={styles.bottomButtonsContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
          <Text style={styles.bottomCreateAccount}>
            <Text style={{ color: '#0abae4' }}>ليس لديك حساب؟</Text>
            <Text> </Text>
            <Text style={{ color: '#f93a8f' }}>انشاء حساب</Text>
          </Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.skipButton} onPress={() => navigation.navigate('Home')}>
        <Text style={styles.skipButtonText}>تخطي</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 50,
  },
  logoContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  logo: {
    width: 150,
    height: 150,
    borderRadius: 100,
    resizeMode: 'contain',
    borderWidth: 1,
    borderColor: '#FFA000',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffa500',
    margin: 10,
    marginBottom: 20,
  },
  error: {
    fontSize: 16,
    color: '#f93a8f',
    marginTop: 10,
    marginBottom: 20,
    textAlign: 'center',
  },
  content: {
    marginTop: 50,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#0abae4',
    borderRadius: 10,
    margin: 10,
    padding: 5,
    width: 300,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    height: 40,
    flex: 1,
    textAlign: 'right',
  },
  link: {
    color: '#f93a8f',
    textAlign: 'center',
    margin: 10,
  },
  button: {
    width: '80%',
    height: 40,
    backgroundColor: '#ffa500',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
  bottomButtonsContainer: {
    marginTop: 40,
  },
  bottomCreateAccount: {
    marginTop: 70,
  },
  skipButton: {
    width: '30%',
    height: 40,
    backgroundColor: Colors.PINK,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
  },
  skipButtonText: {
    fontSize: 16,
    color: Colors.WHITE,
  },
});

export default Signin;

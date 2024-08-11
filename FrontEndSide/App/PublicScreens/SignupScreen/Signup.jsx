import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Image, KeyboardAvoidingView, Platform, ScrollView, ActivityIndicator, Alert } from 'react-native';
import { useDispatch } from 'react-redux';
import { saveToken } from '../../ReduxAndAsyncStorage/BookSlice';
import axios from 'axios';
import Icon from 'react-native-vector-icons/FontAwesome';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';

const Signup = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [username, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignUp = async () => {
    if (username === '' || email === '' || phone === '' || password === '' || confirmPassword === '') {
      setError('الرجاء تعبئة جميع الحقول');
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setError('الرجاء إدخال عنوان بريد إلكتروني صحيح');
    } else if (!/(?=.*\d)(?=.*[a-zA-Z]).{8,}/.test(password)) {
      setError('يجب أن تحتوي كلمة المرور على الأقل 8 خانات و أحرف وأرقام');
    } else if (password !== confirmPassword) {
      setError('كلمتا المرور غير متطابقتين');
    } else if (!/^\d{10}$/.test(phone)) {
      setError('الرجاء إدخال رقم هاتف صحيح');
    } else {
      setError('');
      setLoading(true);
      try {
        const response = await axios.post('https://ecommercebackend-jzct.onrender.com/auth/register', {
          username,
          email,
          phone,
          password
        });

        const { message, token } = response.data;
        dispatch(saveToken(token));

        Alert.alert('تسجيل ناجح', message, [
          { text: 'موافق', onPress: () => navigation.navigate('Signin') } // Navigate to Signin screen after successful signup
        ]);
      } catch (error) {
        console.error('Error signing up:', error);
        if (error.response) {
          console.error('Response data:', error.response.data);
          console.error('Response status:', error.response.status);
          console.error('Response headers:', error.response.headers);

          if (error.response.status === 409) {
            setError('الحساب موجود بالفعل');
          } else {
            setError('حدث خطأ أثناء إنشاء الحساب');
          }
        } else if (error.request) {
          console.error('Request data:', error.request);
          setError('لم يتم تلقي استجابة من الخادم');
        } else {
          console.error('Error message:', error.message);
          setError('حدث خطأ أثناء إنشاء الحساب');
        }
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : null}
      style={styles.container}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 40 : 0}
    >
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.header} onPress={() => navigation.navigate('Signin')}>
            <IconAntDesign name="arrowleft" size={25} color="black" />
          </TouchableOpacity>
        </View>

        <View style={styles.logoContainer}>
          <Image source={require('../../../assets/logo/logo.jpg')} style={styles.logo} />
        </View>

        <Text style={styles.title}>إنشاء حساب</Text>
        {error !== '' && <Text style={styles.error}>{error}</Text>}
        <View style={styles.content}>
          <View style={styles.inputContainer}>
            <Icon name="user" size={20} color="#0abae4" style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="الاسم"
              value={username}
              onChangeText={setUserName}
            />
          </View>

          <View style={styles.inputContainer}>
            <Icon name="envelope" size={20} color="#0abae4" style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="البريد الالكتروني"
              value={email}
              onChangeText={setEmail}
            />
          </View>

          <View style={styles.inputContainer}>
            <Icon name="phone" size={20} color="#0abae4" style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="رقم الهاتف"
              value={phone}
              onChangeText={(text) => setPhone(text.replace(/[^0-9]/g, ''))}
              keyboardType="numeric"
            />
          </View>

          <View style={styles.inputContainer}>
            <Icon name="lock" size={20} color="#0abae4" style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="كلمة المرور"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
          </View>

          <View style={styles.inputContainer}>
            <Icon name="lock" size={20} color="#0abae4" style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="تأكيد كلمة المرور"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry
            />
          </View>

          <TouchableOpacity style={styles.button} onPress={handleSignUp} disabled={loading}>
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>
                إنشاء الحساب    <Icon name="user-plus" size={20} color="white" />
              </Text>
            )}
          </TouchableOpacity>

          <View style={styles.bottomButtonsContainer}>
            <TouchableOpacity onPress={() => navigation.navigate('Signin')}>
              <Text style={styles.bottomCreateAccount}>
                <Text style={{ color: '#0abae4' }}>هل لديك حساب؟</Text>
                <Text> </Text>
                <Text style={{ color: '#f93a8f' }}>تسجيل الدخول</Text>
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignSelf: 'stretch',
  },
  backButton: {
    color: '#0abae4',
    fontSize: 18,
  },
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
    marginBottom: 1,
  },
  error: {
    fontSize: 16,
    color: '#f93a8f',
    marginTop: 10,
    marginBottom: 20,
    textAlign: 'center',
  },
  content: {
    marginTop: 30,
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
    height:    40,
    flex: 1,
    textAlign: 'right',
  },
  link: {
    color: '#f93a8f',
    textAlign: 'center',
    margin: 10,
  },
  button: {
    width: '90%',
    height: 40,
    backgroundColor: '#ffa500',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
    alignSelf: 'center',
    padding: 10,
    paddingLeft: 40,
    paddingRight: 40,
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
  bottomButtonsContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  bottomCreateAccount: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Signup;
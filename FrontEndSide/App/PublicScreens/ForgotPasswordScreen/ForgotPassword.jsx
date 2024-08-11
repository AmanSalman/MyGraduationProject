import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, KeyboardAvoidingView, Platform, ActivityIndicator, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import Colors from '../../Common/Utils/Colors';

const ForgotPassword = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [error, setError] = useState('');
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleRequestVerificationCode = async () => {
    if (email === '') {
      setError('الرجاء إدخال بريدك الإلكتروني');
    } else {
      setError('');
      setLoading(true);

      let timeoutId = setTimeout(() => {
        setLoading(false);
        setError('حدثت مشكلة أثناء إرسال الرمز، يرجى المحاولة مرة أخرى');
        Alert.alert('حدثت مشكلة أثناء إرسال الرمز، يرجى المحاولة مرة أخرى');
      }, 10000); // 10 seconds

      try {
        const response = await axios.patch('https://ecommercebackend-jzct.onrender.com/auth/sendCode', { email });
        clearTimeout(timeoutId);
        setIsCodeSent(true);
        Alert.alert('تم إرسال الرمز بنجاح');
      } catch (error) {
        clearTimeout(timeoutId);
        setError('Failed to send the code, please try again.');
      } finally {
        setLoading(false);
      }
    }
  };

  const handleResetPassword = async () => {
    if (password === '' || verificationCode === '') {
      setError('الرجاء إدخال كلمة المرور الجديدة والكود');
      return;
    }

    if (!isValidPassword(password)) {
      setError('يجب أن تحتوي كلمة المرور على الأقل على 8 أحرف وأرقام');
      return;
    }

    setError('');
    setLoading(true);

    try {
      await axios.patch('https://ecommercebackend-jzct.onrender.com/auth/forgetPassword', { email, password, code: verificationCode });
      Alert.alert('تم تغيير كلمة المرور بنجاح', 'يمكنك الآن تسجيل الدخول باستخدام كلمة المرور الجديدة');
      navigation.navigate('Signin');
    } catch (error) {
      setError('فشل في إعادة تعيين كلمة المرور');
    } finally {
      setLoading(false);
    }
  };

  const isValidPassword = (password) => {
    const valid = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password);
    return valid;
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <View style={styles.inner}>
        <Image source={require('../../../assets/logo/logo.jpg')} style={styles.logo} />
        <Text style={styles.title}>إعادة تعيين كلمة المرور</Text>
        {error !== '' && <Text style={styles.error}>{error}</Text>}

        <View style={styles.inputContainer}>
          <Icon name="envelope" size={20} color="#0abae4" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="أدخل رقم الهاتف أو البريد الإلكتروني"
            value={email}
            onChangeText={setEmail}
          />
        </View>

        {isCodeSent && (
          <>
            <View style={styles.inputContainer}>
              <Icon name="lock" size={20} color="#0abae4" style={styles.icon} />
              <TextInput
                style={styles.input}
                placeholder="أدخل كلمة المرور الجديدة"
                secureTextEntry={true}
                value={password}
                onChangeText={setPassword}
              />
            </View>
            <View style={styles.inputContainer}>
              <Icon name="key" size={20} color="#0abae4" style={styles.icon} />
              <TextInput
                style={styles.input}
                placeholder="ادخل الكود هنا"
                value={verificationCode}
                onChangeText={setVerificationCode}
              />
            </View>
          </>
        )}

        {!isCodeSent && (
          <TouchableOpacity style={styles.button} onPress={handleRequestVerificationCode} disabled={loading}>
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>ارسال الكود</Text>
            )}
          </TouchableOpacity>
        )}

        {isCodeSent && (
          <TouchableOpacity style={styles.button} onPress={handleResetPassword} disabled={loading}>
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>تأكيد</Text>
            )}
          </TouchableOpacity>
        )}
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 50,
  },
  inner: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    marginRight: 10,
  },
  input: {
    height: 40,
    flex: 1,
    textAlign: 'right',
  },
  logo: {
    width: 150,
    height: 150,
    borderRadius: 100,
    resizeMode: 'contain',
    borderWidth: 1,
    borderColor: '#FFA000',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffa500',
    marginVertical: 20,
  },
  error: {
    fontSize: 16,
    color: Colors.PINK,
    marginVertical: 10,
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#0abae4',
    borderRadius: 10,
    marginVertical: 10,
    padding: 5,
    width: 300,
  },
  button: {
    width: '70%',
    height: 40,
    backgroundColor: Colors.ORANGE,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  buttonText: {
    fontSize: 20,
    color: Colors.WHITE,
    fontWeight: 'bold',
  },
});

export default ForgotPassword;

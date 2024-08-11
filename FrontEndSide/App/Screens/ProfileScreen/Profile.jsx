import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Linking, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Colors from '../../Common/Utils/Colors';
import { useDispatch, useSelector } from 'react-redux';
import { clearToken } from '../../ReduxAndAsyncStorage/Actions'; // Import the clearToken action
import { selectToken } from '../../ReduxAndAsyncStorage/BookSlice'; // Import selector for token
import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook

const menuItems = [
  { id: '1', title: 'تعديل الملف الشخصي', icon: 'edit', requiresAuth: true },
  { id: '2', title: 'قائمة المفضلة', icon: 'heart', requiresAuth: true },
  { id: '3', title: 'عربة التسوق', icon: 'shopping-cart', requiresAuth: true },
  { id: '4', title: 'الصفحة الرئيسية', icon: 'home', requiresAuth: false }, // Added home item
  { id: '5', title: 'تواصل معنا', icon: 'phone', requiresAuth: false },
  // { id: '6', title: 'جميع الطلبات', icon: 'file-text', requiresAuth: true }, // Added order screen item
];

const Profile = () => {
  const [showOptions, setShowOptions] = useState(false);
  const dispatch = useDispatch(); // Get dispatch function from redux
  const token = useSelector(selectToken); // Get the token from the Redux store
  const navigation = useNavigation(); // Initialize useNavigation hook

  const handleLogout = () => {
    // Function to handle logout
    Alert.alert(
      'تسجيل الخروج',
      'هل أنت متأكد من رغبتك في تسجيل الخروج؟',
      [
        {
          text: 'إلغاء',
          style: 'cancel',
        },
        {
          text: 'نعم',
          onPress: () => {
            // Clear token on logout
            dispatch(clearToken());
            navigation.navigate('Login');
          },
        },
      ],
      { cancelable: false }
    );
  };

  const handleHomeNavigation = () => {
    navigation.navigate('Home');
  };

  
  const handleOrderScreenNavigation = () => {
    navigation.navigate('AllOrders');
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={require('../../../assets/logo/logo.jpg')} style={styles.logo} />
        <Text style={styles.title}>الملف الشخصي</Text>
      </View>

      <View style={styles.content}>
        {menuItems.map((item) => {
          // Check if the item requires authentication and if token is present
          if (item.requiresAuth && !token) {
            return null; // Skip rendering this item
          }

          return (
            <TouchableOpacity
              key={item.id}
              style={styles.menuItem}
              onPress={() => {
                if (item.title === 'تواصل معنا') {
                  setShowOptions(true);
                } else if (item.title === 'تعديل الملف الشخصي') {
                  navigation.navigate('EditProfile');
                } else if (item.title === 'عربة التسوق') {
                  navigation.navigate('Cart');
                } else if (item.title === 'قائمة المفضلة') {
                  navigation.navigate('WishList');
                } else if (item.title === 'الصفحة الرئيسية') { // Handle home navigation
                  handleHomeNavigation();
                } else if (item.title === 'جميع الطلبات') { // Handle order screen navigation
                  handleOrderScreenNavigation();
                }
              }}
            >
              <Icon name={item.icon} size={24} color={Colors.BLACK} style={styles.icon} />
              <Text style={styles.menuText}>{item.title}</Text>
              <Icon name="chevron-right" size={24} color={Colors.BLACK} />
            </TouchableOpacity>
          );
        })}

        {showOptions && (
          <View style={styles.optionsContainer}>
            <TouchableOpacity style={styles.optionButton} onPress={() => Linking.openURL('https://www.instagram.com/kidskills1/')}>
              <Text style={styles.optionButtonText}>إنستجرام</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.optionButton} onPress={() => Linking.openURL('https://www.facebook.com/profile.php?id=100068874728638')}>
              <Text style={styles.optionButtonText}>فيسبوك</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.optionButtonText} onPress={() => setShowOptions(false)}>
              <Text style={styles.cancelButtonText}>إلغاء</Text>
            </TouchableOpacity>
          </View>
        )}

        {token ? (
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.buttonText}>تسجيل الخروج</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.loginButton} onPress={() => navigation.navigate('Signin')}>
            <Text style={styles.buttonText}>تسجيل الدخول</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoContainer: {
    alignItems: 'center',
  },
  logo: {
    width: 150,
    height: 150,
    borderRadius: 100,
    resizeMode: 'contain',
    borderWidth: 1,
    borderColor: Colors.PINK,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 30,
    color: Colors.BLACK,
  },
  content: {
    width: '80%',
    alignItems: 'center',
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.GRAY,
  },
  menuText: {
    flex: 1,
    textAlign: 'right',
    marginRight: 10,
    fontSize: 18,
    color: Colors.BLACK,
  },
  icon: {
    marginRight: 10,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.WHITE,
  },
  optionsContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  optionButton: {
    backgroundColor: Colors.ORANGE,
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 110,
    marginBottom: 10,
  },
  optionButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.WHITE,
  },
  cancelButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  logoutButton: {
    backgroundColor: Colors.PINK,
    borderRadius: 20,
    paddingVertical: 13,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
    width: '70%',
    marginTop: 40,
  },
  loginButton: {
    backgroundColor: Colors.PINK,
    borderRadius: 20,
    paddingVertical: 13,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
    width: '70%',
    marginTop: 40,
  },
});

export default Profile;

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, ActivityIndicator, Alert } from 'react-native';
import axios from 'axios';
import { getToken } from '../../ReduxAndAsyncStorage/Storage';
import WishlistItem from './WhishListItem';
import Footer from '../../Common/Footer/Footer';
import { MaterialCommunityIcons } from 'react-native-vector-icons';
import Colors from '../../Common/Utils/Colors';
import { useNavigation } from '@react-navigation/native';

const Wishlist = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    fetchTokenFromStorage();
  }, []);

  useEffect(() => {
    if (token) {
      fetchWishlist();
    }
  }, [token]);

  const fetchTokenFromStorage = async () => {
    try {
      const userToken = await getToken();
      setToken(userToken);
    } catch (error) {
      console.error('Error fetching token:', error);
    }
  };

  const fetchWishlist = async () => {
    try {
      const response = await axios.get('https://ecommercebackend-jzct.onrender.com/wishlist/', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `AmanGRAD__${token}`,
        },
      });

      if (response.data.message === 'success') {
        const wishList = response.data.wishList;
        if (wishList && wishList.books && Array.isArray(wishList.books)) {
          const booksWithDetails = await Promise.all(wishList.books.map(async (book) => {
            const bookDetails = await getBookDetails(book.bookId);
            return { ...book, ...bookDetails };
          }));

          setBooks(booksWithDetails);
        } else {
          setBooks([]);
        }
      } else {
        console.error('Failed to fetch wishlist:', response.status);
        Alert.alert('Error', 'Failed to fetch wishlist');
      }
    } catch (error) {
      console.error('Error fetching wishlist:', error.message);
      Alert.alert('Error', 'Failed to fetch wishlist');
    } finally {
      setLoading(false);
    }
  };

  const getBookDetails = async (bookId) => {
    try {
      const response = await axios.get(`https://ecommercebackend-jzct.onrender.com/book/${bookId}`, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      return {
        title: response.data.book.title,
        price: response.data.book.finalPrice,
        mainImage: response.data.book.mainImage.secure_url,
      };
    } catch (error) {
      console.error(`Error fetching details for bookId ${bookId}:`, error.message);
      return {};
    }
  };

 
 

  
  const handleClearWishlist = async () => {
    try {
      const response = await axios.put('https://ecommercebackend-jzct.onrender.com/wishlist/', {}, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `AmanGRAD__${token}`,
        },
      });

      if (response.data.message === 'success') {
        setBooks([]);
        Alert.alert('تم حذف قائمة المفضلة بنجاح!');
      } else {
        console.error('Failed to clear wishlist:', response.status);
        Alert.alert('Error', 'Failed to clear wishlist');
      }
    } catch (error) {
      console.error('Error clearing wishlist:', error.message);
      Alert.alert('Error', 'Failed to clear wishlist');
    }
  };

  if (!token) {
    return (
      <>  
      <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate('Profile')} style={{ marginRight: 130 }}>
            <MaterialCommunityIcons name="arrow-left" size={24} color={Colors.PINK} />
          </TouchableOpacity>
        <Text style={styles.emptyText}>الرجاء تسجيل الدخول لعرض قائمة المفضلة الخاصة بك!</Text>
      </View>
      <Footer />
      </>
    );
  }

  if (loading) {
    return (
      <> 
      <View style={styles.container}>
        <View style={styles.header}>
       
          <MaterialCommunityIcons name="heart" size={35} color={Colors.PINK} />
          <Text style={styles.headerText}>قائمة المفضلة</Text>
          
        </View>
        <ActivityIndicator size="large" color={Colors.PINK} />
      
      </View>
      
      <Footer />
      </>
    );
  }

  if (books.length === 0) {
    return (
      <> 
      <View style={styles.container}>
        <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('Profile')} style={{ marginRight: 130 }}>
            <MaterialCommunityIcons name="arrow-left" size={24} color={Colors.PINK} />
          </TouchableOpacity>
          <MaterialCommunityIcons name="heart" size={35} color={Colors.PINK} />
          <Text style={styles.headerText}>قائمة المفضلة</Text>
        </View>
        <Text style={styles.emptyText}>قائمة المفضلة فارغة, قم بإضافة كتب!</Text>
      </View>
      <Footer />
      </>
    );
  }

  return (
    <> 
    <View style={styles.container}>
      <View style={styles.header}>
      <TouchableOpacity onPress={() => navigation.navigate('Profile')} style={{ marginRight: 130 }}>
            <MaterialCommunityIcons name="arrow-left" size={24} color={Colors.PINK} />
          </TouchableOpacity>
        <MaterialCommunityIcons name="heart" size={35} color={Colors.PINK} />
        <Text style={styles.headerText}>قائمة المفضلة</Text>
        
      </View>
      <ScrollView contentContainerStyle={styles.scrollView}>
        {books.map((book) => (
          <WishlistItem
            key={book._id}
            book={book}
          />
        ))}
        <TouchableOpacity style={styles.clearButton} onPress={handleClearWishlist}>
          <Text style={styles.clearButtonText}>حذف الكل</Text>
        </TouchableOpacity>
      </ScrollView>
     
    </View>
    <Footer />
      </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    marginTop: 40,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  scrollView: {
    paddingBottom: 20,
  },
  emptyText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 200,
  },
  clearButton: {
    backgroundColor: Colors.ORANGE,
    paddingVertical: 10,
    borderRadius: 18,
    alignItems: 'center',
    marginTop: 10,
  },
  clearButtonText: {
    color: Colors.WHITE,
    fontSize: 19,
    fontWeight: 'bold',
  },
});

export default Wishlist;

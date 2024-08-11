
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, ActivityIndicator, Alert } from 'react-native';
import axios from 'axios';
import { getToken } from '../../ReduxAndAsyncStorage/Storage';
import CartItem from './CartItem'; // استيراد مكون CartItem
import { MaterialCommunityIcons } from 'react-native-vector-icons';
import Colors from '../../Common/Utils/Colors';
import Footer from '../../Common/Footer/Footer';

const Cart = ({ navigation }) => {
  const [books, setBooks] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
 
  useEffect(() => {
    fetchTokenFromStorage();
  }, []);

  useEffect(() => {
    if (token) {
      getCartAPI();
    }
  }, [token]);

  const fetchTokenFromStorage = async () => {
    try {
      const userToken = await getToken();
      setToken(userToken);
  
    } catch (error) {
     
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
      return {};
    }
  };

  const getCartAPI = async () => {
    try {
      const response = await axios.get('https://ecommercebackend-jzct.onrender.com/cart/', {
        headers: {
          'Content-Type': 'application/json',
          authorization: `AmanGRAD__${token}`,
        },
      });

      //z console.log('Cart data response:', response.data);

      if (response.data.message === 'success') {
        const cartData = response.data.cart.books || [];

        // Fetch details for each book in the cart
        const booksWithDetails = await Promise.all(cartData.map(async (book) => {
          const bookDetails = await getBookDetails(book.bookId);
          return { ...book, ...bookDetails, quantity: 1 }; // Set initial quantity to 1
        }));

        setBooks(booksWithDetails);

        // Calculate total price
        const total = booksWithDetails.reduce((sum, book) => sum + book.price * book.quantity, 0);
        setTotalPrice(total);
      } else {
        //console.error('Failed to fetch cart data:', response.status);
        Alert.alert('Error', 'Failed to fetch cart data');
      }
    } catch (error) {
      console.error('Error fetching cart data:', error.message);
      Alert.alert('Error', 'Failed to fetch cart data');
    } finally {
      setLoading(false);
    }
  };

  const handleIncrementQuantity = (id) => {
    const updatedBooks = books.map((book) => {
      if (book._id === id) {
        return { ...book, quantity: book.quantity + 1 };
      }
      return book;
    });
    setBooks(updatedBooks);
    calculateTotalPrice(updatedBooks);
  };

  const handleDecrementQuantity = (id) => {
    const updatedBooks = books.map((book) => {
      if (book._id === id && book.quantity > 1) {
        return { ...book, quantity: book.quantity - 1 };
      }
      return book;
    });
    setBooks(updatedBooks);
    calculateTotalPrice(updatedBooks);
  };

  const calculateTotalPrice = (books) => {
    const total = books.reduce((sum, book) => sum + book.price * book.quantity, 0);
    setTotalPrice(total);
  };


  /*
  const handleRemoveItem = async (id) => {
    Alert.alert(
      'تأكيد الحذف',
      'هل أنت متأكد أنك تريد إزالة هذا العنصر من السلة؟',
      [
        {
          text: 'إلغاء',
          style: 'cancel',
        },
        {
          text: 'حذف',
          onPress: async () => {
            try {
              const response = await axios.put(
                `https://ecommercebackend-jzct.onrender.com/cart/${id}`,
                {},
                {
                  headers: {
                    'Content-Type': 'application/json',
                    authorization: `AmanGRAD__${token}`,
                  },
                }
              );
  
              if (response.data.message === 'success') {
                // تحديث الحالة لإزالة الكتاب من السلة
                setBooks((prevBooks)=>prevBooks.filter((book) => book._id !== id));
                //setBooks(updatedBooks);
               // await updateBooksInDatabase(updatedBooks);
  
                Alert.alert('نجاح', 'تم إزالة العنصر من السلة بنجاح!');
              } else {
                Alert.alert( 'فشل في إزالة العنصر من السلة');
              }
            } catch (error) {
              Alert.alert('خطأ', 'فشل في إزالة العنصر من السلة');
            }
          },
        },
      ],
      { cancelable: true }
    );
  };
  
  */
  

  const handleClearCart = async () => {
    try {
      const response = await axios.put(
        'https://ecommercebackend-jzct.onrender.com/cart/',
        {},
        {
          headers: {
            'Content-Type': 'application/json',
            authorization: `AmanGRAD__${token}`,
          },
        }
      );

      if (response.data.message === 'success') {
        setBooks([]);
        setTotalPrice(0);
        Alert.alert('تم إفراغ السلة بنجاح!');
      } else {
        console.error('فشل في إفراغ السلة:', response.status);
        Alert.alert('فشل في إفراغ السلة');
      }
    } catch (error) {
      console.error('خطأ في إفراغ السلة:', error.message);
      Alert.alert('فشل في إفراغ السلة');
    }
  };

  if (!token) {
    return (
      <>
        <View style={styles.container}>
          <View style={styles.header}>
            <MaterialCommunityIcons name="cart" size={35} color="#f93a8f" />
            <Text style={[styles.headerText, { color: 'black', fontSize: 33 }]}>عربة التسوق</Text>
          </View>
          <Text style={styles.emptyCartText}>الرجاء تسجيل الدخول لعرض سلة التسوق الخاصة بك!</Text>
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
            <MaterialCommunityIcons name="cart" size={35} color="#f93a8f" />
            <Text style={[styles.headerText, { color: 'black', fontSize: 33 }]}>عربة التسوق</Text>
          </View>
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#FFA500" />
          </View>
        </View>
        <Footer />
      </>
    );
  }

  if (!Array.isArray(books) || books.length === 0) {
    return (
      <>
        <View style={styles.container}>
          <View style={styles.header}>
            <MaterialCommunityIcons name="cart" size={35} color="#f93a8f" />
            <Text style={[styles.headerText, { color: 'black', fontSize: 33 }]}>عربة التسوق</Text>
          </View>
          <View style={styles.emptyCartContainer}>
            <Text style={styles.emptyCartText}>العربة فارغة، قم بإضافة الكتب!</Text>
          </View>
        </View>
        <Footer />
      </>
    );
  }

  return (
    <>
      <View style={styles.container}>
        <View style={styles.header}>
          <MaterialCommunityIcons name="cart" size={35} color="#f93a8f" />
          <Text style={[styles.headerText, { color: 'black', fontSize: 33 }]}>عربة التسوق</Text>
        </View>
        <View style={styles.separator} />
        <ScrollView contentContainerStyle={styles.scrollView}>
          {books.map((book) => (
            <CartItem
              key={book._id}
              book={book}
              // handleRemoveItem={handleRemoveItem} // تأكد من تمرير handleRemoveItem بشكل صحيح هنا
              onIncrement={() => handleIncrementQuantity(book._id)}
              onDecrement={() => handleDecrementQuantity(book._id)}
            />
          ))}

          <View style={styles.totalContainer}>
            <Text style={styles.totalPrice}>₪{totalPrice.toFixed(2)}</Text>
            <Text style={styles.totalText}>المجموع:</Text>
          </View>
          <TouchableOpacity style={styles.clearButton} onPress={handleClearCart}>
            <Text style={styles.clearButtonText}>حذف الكل</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.orderButton}
            onPress={() => navigation.navigate('OrderScreen', { cartItems: books, totalPrice: totalPrice })}
          >
            <Text style={styles.orderButtonText}>اطلب الآن</Text>
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
  emptyCartContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20, // Adjust padding as needed
  },
  emptyCartText: {
    fontSize: 20,
    color: 'black', // Set text color to #D6DBDF
    textAlign: 'center',
    marginTop: 150,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
  },
  headerText: {
    marginLeft: 10,
    textAlign: 'center',
  },
  scrollView: {
    paddingBottom: 20,
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    marginTop: 10,
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  totalPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  clearButton: {
    backgroundColor: Colors.GRAY,
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  clearButtonText: {
    color: 'white',
    fontSize: 16,
  },
  orderButton: {
    backgroundColor: Colors.PINK,
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  orderButtonText: {
    color: 'white',
    fontSize: 16,
  },
  separator: {
    height: 1,
    backgroundColor: '#ccc',
    marginVertical: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Cart;

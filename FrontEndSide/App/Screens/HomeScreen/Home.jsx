


import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, FlatList, ActivityIndicator, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import Header from '../../Common/Header/Header';
import Footer from '../../Common/Footer/Footer';
import Navbar from '../../Common/Navbar/Navbar';
import Colors from '../../Common/Utils/Colors';
import Icon from 'react-native-vector-icons/FontAwesome';

const Home = () => {
  const navigation = useNavigation();
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // State to track loading status
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    setIsLoading(true); // Set loading status to true before fetching books
    try {
      const response = await axios.get('https://ecommercebackend-jzct.onrender.com/book/Active');
      setBooks(response.data.books);
      //console.log(response.data);
    } catch (error) {
      //console.error('Error fetching books:', error);
      // Handle error here, such as displaying an error message to the user
    } finally {
      setIsLoading(false); // Set loading status to false after books are fetched
    }
  };

  const handleBookPress = (item) => {
   // console.log('________Book pressed:', item);
    const { _id, title, price, description, mainImage, subImages, Discount, reviews } = item;
    const mainImageUrl = mainImage?.secure_url || null;
    const subImagesUrls = subImages.map((image) => image.secure_url);
    const finalPrice = price * ((100 - Discount) / 100); // Corrected final price calculation

    navigation.navigate('BookDetails', {
      id: _id,
      title,
      description,
      mainImage: mainImageUrl,
      subImages: subImagesUrls,
      Discount,
      price,
      finalPrice,
      reviews,
    });
  };

  const isNewBook = (book) => {
    const today = new Date();
    const bookDate = new Date(book.createdAt);
    const sixtyDaysAgo = new Date(today.setDate(today.getDate() - 14));
    return bookDate >= sixtyDaysAgo;
  };

  const isDiscountedBook = (book) => {
    return book.Discount !== undefined && book.Discount > 0;
  };

  const calculateDiscountPercentage = (book) => {
    if (isDiscountedBook(book)) {
      return book.Discount;
    } else {
      return 0; // No discount, so return 0 percentage
    }
  };

  const clearSearch = () => {
    setSearchTerm('');
    fetchBooks(); // Fetch all books again
  };

  const renderBookItem = ({ item }) => {
    const isNew = isNewBook(item);
    const isDiscounted = isDiscountedBook(item);
    const discountPercentage = calculateDiscountPercentage(item);
    const finalPrice = item.price * ((100 - item.Discount) / 100); // Ensure valid calculation

    return (
      <TouchableOpacity style={styles.bookContainer} onPress={() => handleBookPress(item)}>
        {item.mainImage?.secure_url ? (
          <View>
            <Image source={{ uri: item.mainImage.secure_url }} style={styles.bookImage} />
            {isDiscounted && (
              <View style={styles.discountLabel}>
                <Icon name="fire" size={19} color="white" />
                <Text style={styles.discountText}> {discountPercentage}%</Text>
              </View>
            )}
          </View>
        ) : (
          <View style={styles.bookImagePlaceholderContainer}>
            <View style={styles.bookImagePlaceholder}>
              <Text style={styles.placeholderText}>Image not available</Text>
            </View>
          </View>
        )}
        {isNew && <Text style={styles.newLabel}>جديد</Text>}
        <Text style={styles.title}>{item.title}</Text>
        {isDiscounted ? (
          <View style={styles.discountContainer}>
            <Text style={styles.discountedPrice}>₪{item.price}</Text>
            <Text style={styles.originalPrice}>₪{finalPrice.toFixed(2)}</Text>
          </View>
        ) : (
          <View style={styles.discountContainer}>
            <Text style={styles.price}>₪{item.price}</Text>
          </View>
        )}
      </TouchableOpacity>
    );
  };

  const filteredBooks = books.filter(book => book.title.includes(searchTerm.trim()));

  return (
    <View style={{ flex: 1 }}>
      <Header />
      <Navbar />
      <View style={{ paddingHorizontal: 10 }}>
        <View style={styles.searchContainer}>
          <Icon name="search" size={20} color={Colors.ORANGE} style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="ابحث عن اسم الكتاب ..."
            onChangeText={setSearchTerm}
            value={searchTerm}
          />
          {searchTerm.length > 0 && (
            <TouchableOpacity onPress={clearSearch}>
              <Icon name="times-circle" size={20} color={Colors.ORANGE} style={styles.clearIcon} />
            </TouchableOpacity>
          )}
        </View>
      </View>
      <View style={{ flex: 1, paddingHorizontal: 10, marginBottom: 50 }}>
        {isLoading ? ( // Show activity indicator if loading
          <ActivityIndicator size="large" color={Colors.ORANGE} style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} />
        ) : (
          <FlatList
            data={searchTerm ? filteredBooks : books}
            renderItem={renderBookItem}
            keyExtractor={(item) => item._id}
            numColumns={2}
            contentContainerStyle={{ paddingBottom: 20 }}
          />
        )}
      </View>
      <Footer navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  bookContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    margin: 10,
    padding: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  bookImage: {
    width: 120,
    height: 160,
    borderRadius: 10,
    marginBottom: 10,
  },
  discountLabel: {
    position: 'absolute',
    top: -5,
    right: -7,
    padding: 3,
    borderRadius: 10,
    backgroundColor: Colors.PINK,
    flexDirection: 'column',
    alignItems: 'center',
    //transform: [{ rotate: '22deg' }], // Add rotation to make it slanted
  },
  discountText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
    marginLeft: 3, // Add some margin between icon and text
  },
  bookImagePlaceholderContainer: {
    width: 120,
    height: 160,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'pink',
    borderRadius: 10,
  },
  bookImagePlaceholder: {
    width: 100,
    height: 140,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
    borderRadius: 8,
  },
  placeholderText: {
    color: 'gray',
    fontSize: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 6,
    marginBottom: 5,
  },
  price: {
    fontSize: 15,
    color: Colors.ORANGE,
    marginTop: 8,
    marginBottom: 2,
    fontWeight: 'bold',
  },
  newLabel: {
    position: 'absolute',
    top: 3,
    left: 5,
    padding: 3,
    color: 'white',
    fontSize: 15,
    fontWeight: 'bold',
    borderRadius: 10,
    backgroundColor: '#0BDA51',
  },
  discountContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 5,
  },
  discountedPrice: {
    fontSize: 15,
    color: Colors.ORANGE,
    fontWeight: 'bold',
    textDecorationLine: 'line-through',
  },
  originalPrice: {
    fontSize: 15,
    color: Colors.PINK,
    fontWeight: 'bold',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',  // تعيين خلفية اللون الأبيض هنا
    borderColor: '#fff',
    borderWidth: 1,
    borderRadius: 8,
    width: '95%',
    alignSelf: 'flex-end',
    marginRight: 10,
  },
  searchIcon: {
    marginLeft: 10,
  },
  searchInput: {
    flex: 1,
    height: 40,
    paddingHorizontal: 10,
    textAlign: 'center', // لجعل النص يتجه إلى اليمين
  },
  clearIcon: {
    marginRight: 10,
  },
});

export default Home;

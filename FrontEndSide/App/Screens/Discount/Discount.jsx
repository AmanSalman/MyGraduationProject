import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import Header from '../../Common/Header/Header';
import Footer from '../../Common/Footer/Footer';
import Navbar from '../../Common/Navbar/Navbar';
import Colors from '../../Common/Utils/Colors';
import Icon from 'react-native-vector-icons/FontAwesome'; // Import FontAwesome icons

const Discount = () => {
  const navigation = useNavigation();
  const [discountedBooks, setDiscountedBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchDiscountedBooks();
  }, []);

  const fetchDiscountedBooks = async () => {
    try {
      const response = await axios.get('https://ecommercebackend-jzct.onrender.com/book/Active');
      const books = response.data.books;
      const filteredBooks = filterDiscountedBooks(books);
      setDiscountedBooks(filteredBooks);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  const filterDiscountedBooks = (books) => {
    return books.filter((book) => book.Discount !== undefined && book.Discount > 0);
  };

  const handleBookPress = (item) => {
    const { _id, title, price, description, mainImage, subImages, Discount, createdAt } = item;
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
      createdAt,
    });
  };

  const renderBookItem = ({ item }) => {
    const isDiscounted = item.Discount !== undefined && item.Discount > 0;
    const discountPercentage = isDiscounted ? item.Discount : 0;
    const finalPrice = isDiscounted ? item.price * ((100 - item.Discount) / 100) : item.price;

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
        <Text style={styles.title}>{item.title}</Text>
        <View style={styles.priceContainer}>
          <Text style={styles.discountedPrice}>₪{item.price}</Text>
          <Text style={styles.originalPrice}>₪{finalPrice.toFixed(2)}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <Header />
      <Navbar />
      <View style={{ flex: 1, paddingHorizontal: 10, marginBottom: 50 }}>
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={Colors.ORANGE} />
          </View>
        ) : error ? (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>Error fetching books. Please try again later.</Text>
          </View>
        ) : (
          <FlatList
            data={discountedBooks}
            renderItem={renderBookItem}
            keyExtractor={(item) => item._id}
            numColumns={2}
            contentContainerStyle={{ paddingBottom: 20 }}
          />
        )}
      </View>
      <Footer />
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
  priceContainer: {
    alignItems: 'center',
    marginTop: 5,
  },
  discountedPrice: {
    fontSize: 14,
    color: Colors.ORANGE,
    fontWeight: 'bold',
    textDecorationLine: 'line-through',
  },
  originalPrice: {
    fontSize: 14,
    color: Colors.PINK,
    fontWeight: 'bold',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 16,
    color: 'red',
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
  },
  discountText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
    marginLeft: 3, // Add some margin between icon and text
  },
});

export default Discount;

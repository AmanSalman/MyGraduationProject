import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Header from '../../Common/Header/Header'; 
import Navbar from '../../Common/Navbar/Navbar'; 
import Footer from '../../Common/Footer/Footer';
import axios from 'axios';
import Colors from '../../Common/Utils/Colors';

const New = () => {
  const navigation = useNavigation();
  const [newBooks, setNewBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await axios.get("https://ecommercebackend-jzct.onrender.com/book/Active");
      const books = response.data.books;
      const filteredBooks = filterNewBooks(books);
      setNewBooks(filteredBooks);
      setIsLoading(false); // Set loading to false once books are fetched
    } catch (error) {
      //console.error("Error fetching books:", error);
      setIsLoading(false); // Set loading to false in case of error
    }
  };

  const filterNewBooks = (books) => {
    const today = new Date();
    const sixtyDaysAgo = new Date(today.setDate(today.getDate() - 14));
    
    return books.filter(book => {
      const bookDate = new Date(book.createdAt);
      return bookDate >= sixtyDaysAgo;
    });
  };

  const handleBookPress = (item) => {
    const { _id, title, price, description, mainImage, subImages, finalPrice } = item;
    const mainImageUrl = mainImage && mainImage.secure_url ? mainImage.secure_url : null;
    const subImagesUrls = subImages.map(image => image.secure_url);

    navigation.navigate('BookDetails', {
      id: _id,
      title,
      description,
      mainImage: mainImageUrl,
      subImages: subImagesUrls,
      price,
      finalPrice,
    });
  };

  const renderBookItem = ({ item }) => {
    const formatPrice = (price) => {
      return price % 1 === 0 ? `₪${price.toFixed(0)}` : `₪${price.toFixed(2)}`;
    };
  
    return (
      <TouchableOpacity style={styles.bookContainer} onPress={() => handleBookPress(item)}>
        <View style={styles.imageContainer}>
          {item.mainImage?.secure_url ? (
            <Image source={{ uri: item.mainImage.secure_url }} style={styles.bookImage} />
          ) : (
            <View style={styles.bookImagePlaceholderContainer}>
              <View style={styles.bookImagePlaceholder}>
                <Text style={styles.placeholderText}>Image not available</Text>
              </View>
            </View>
          )}
          <View style={styles.newLabelContainer}>
            <Text style={styles.newLabel}>جديد</Text>
          </View>
        </View>
        <Text style={styles.title}>{item.title}</Text>
  
        {item.price !== undefined && item.price !== item.finalPrice && (
          <Text style={styles.originalPrice}>{formatPrice(item.price)}</Text>
        )}
  
        <Text style={styles.finalPrice}>السعر: {formatPrice(item.finalPrice)}</Text>
      </TouchableOpacity>
    );
  };
  
  return (
    <View style={styles.container}>
      <Header />
      <Navbar />
      <View style={styles.content}>
        {isLoading ? ( // Show activity indicator while loading
          <ActivityIndicator size="large" color={Colors.ORANGE} style={{ flex: 1, justifyContent: "center", alignItems: "center" }} />
        ) : (
          <FlatList
            data={newBooks}
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
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 10,
    marginBottom: 50,
  },
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
  imageContainer: {
    position: 'relative',
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
  originalPrice: {
    fontSize: 14,
    color: Colors.ORANGE,
    textAlign: "center",
    textDecorationLine: 'line-through',
    marginTop:5
  },
  finalPrice: {
    fontSize: 14,
    color: Colors.PINK,
    textAlign: "center",
    fontWeight: "bold",
    marginTop:5

  },
  newLabelContainer: {
    position: 'absolute',
    top: 5,
    left: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  newLabel: {
    position: 'absolute',
    top: -10,
    left: -31,
    padding:3,
    color: 'white',
    fontSize: 15,
    fontWeight: 'bold',
    borderRadius:10,
    backgroundColor: '#0BDA51',
  },
});

export default New;

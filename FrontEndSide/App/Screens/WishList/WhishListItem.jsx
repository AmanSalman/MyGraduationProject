import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import Colors from '../../Common/Utils/Colors';
import { MaterialCommunityIcons } from 'react-native-vector-icons';

const WishlistItem = ({ book, onPress}) => {
  const { title, price, mainImage } = book;

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.bookInfo} onPress={onPress}>
        <Image source={{ uri: mainImage }} style={styles.image} resizeMode="cover" />
        <View style={styles.info}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.price}>₪{price}</Text>
        </View>
      </TouchableOpacity>
     
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 10,
    marginVertical: 10,
    backgroundColor: Colors.WHITE,
    borderRadius: 5,
    shadowColor: Colors.BLACK,
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    justifyContent: 'space-between',
  },
  bookInfo: {
    flexDirection: 'row',
    flex: 1,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 5,
  },
  info: {
    flex: 1,
    marginLeft: 10,
    justifyContent: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
textAlign:'right'
  },
  price: {
    fontSize: 16,
    color: Colors.BLUE,
    marginRight:10,
    textAlign:'right'

  },

});

export default WishlistItem;


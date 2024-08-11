import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Colors from '../../Common/Utils/Colors';
import { MaterialCommunityIcons } from 'react-native-vector-icons';

const CartItem = ({ book,  onIncrement, onDecrement }) => {
  return (
    <View style={styles.container}>
      <Image source={{ uri: book.mainImage }} style={styles.image} />
      <View style={styles.details}>
        <Text style={styles.title}>{book.title}</Text>
        <View style={styles.infoBottom}>
          {book.price !== undefined && (
            <Text style={styles.price}>₪{book.price.toFixed(2)}</Text>
          )}

          
          <View style={styles.actionButtons}>
            {/* <TouchableOpacity style={styles.removeButton} onPress={() => handleRemoveItem(book._id)}>
              <MaterialCommunityIcons name="delete" size={27} color="#f93a8f" />
            </TouchableOpacity> */}


            <TouchableOpacity style={styles.actionButton} onPress={onDecrement} disabled={book.quantity <= 1}>
              <MaterialCommunityIcons name="minus" size={20} color="black" />
            </TouchableOpacity>


            <Text style={styles.quantity}>{book.quantity}</Text>
            <TouchableOpacity style={styles.actionButton} onPress={onIncrement}>
              <MaterialCommunityIcons name="plus" size={20} color="black" />
            </TouchableOpacity>


          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  image: {
    width: 100,
    height: 100,
  },
  details: {
    flex: 1,
    marginLeft: 10,
    justifyContent: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'right',
  },
  infoBottom: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  price: {
    fontSize: 14,
    color: '#888',
  },
  actionButtons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionButton: {
    marginHorizontal: 5,
    backgroundColor: Colors.GRAY,
    borderRadius: 20,
    padding: 3,
  },
  quantity: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 9,
  },
  // removeButton: {
  //   marginLeft: 10,
  // },
});

export default CartItem;

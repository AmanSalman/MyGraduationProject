import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import Colors from "../../Common/Utils/Colors";

const BookItem = ({ title, price,  mainImage, onPress }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Image source={{ uri: mainImage }} style={styles.image} />
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.price}>₪{price}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    margin: 10,
    padding: 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  image: {
    width: 120,
    height: 160,
    borderRadius: 10,
    marginBottom: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 6,
    marginBottom: 5,
  },
  price: {
    fontSize: 15,
    color: Colors.ORANGE,
    marginTop: 8,
    marginBottom: 2,
    fontWeight: "bold",
  },
});

export default BookItem;

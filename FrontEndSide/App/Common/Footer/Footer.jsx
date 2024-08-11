import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import Colors from '../Utils/Colors';

const Footer = () => {
  const navigation = useNavigation();

  const goToHome = () => {
    navigation.navigate('Home');
  };

  const goToCart = () => {
    navigation.navigate('Cart');
  };

  const goToCategories = () => {
    navigation.navigate('Categories');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={goToHome} style={styles.iconContainer}>
        <Icon name="home" size={35} color={Colors.WHITE} />
      </TouchableOpacity>

      <TouchableOpacity onPress={goToCart} style={styles.iconContainer}>
        <Icon name="shopping-cart" size={35} color={Colors.WHITE} />
      </TouchableOpacity>

      <TouchableOpacity onPress={goToCategories} style={styles.iconContainer}>
        <Icon name="list" size={35} color={Colors.WHITE} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.BLUE,
    height: 60,
    paddingHorizontal: 20,
  },
  iconContainer: {
    flex: 1,
    alignItems: 'center',
    paddingBottom: 10,
  },
});

export default Footer;


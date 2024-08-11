import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Footer from '../../Common/Footer/Footer';

const AllOrders = () => {
  return (
    <> 
    <View style={styles.container}>
      <Text>shahd</Text>
    </View>
    <Footer/>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
});

export default AllOrders;

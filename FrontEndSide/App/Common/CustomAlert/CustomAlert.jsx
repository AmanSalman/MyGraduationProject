import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';



const CustomAlert = ({ isVisible, message, type, onClose }) => {
  const getIcon = () => {
    switch (type) {
      case 'success':
        return 'check-circle';
      case 'error':
        return 'alert-circle';
      default:
        return 'information';
    }
  };

  const getColor = () => {
    switch (type) {
      case 'success':
        return 'green';
      case 'error':
        return 'red';
      default:
        return 'blue';
    }
  };

  return (
    <Modal isVisible={isVisible}>
      <View style={styles.alertContainer}>
        <MaterialCommunityIcons name={getIcon()} size={50} color={getColor()} />
        <Text style={styles.message}>{message}</Text>
        <TouchableOpacity onPress={onClose} style={[styles.button, { backgroundColor: getColor() }]}>
          <Text style={styles.buttonText}>موافق</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  alertContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  message: {
    fontSize: 18,
    textAlign: 'center',
    marginVertical: 10,
  },
  button: {
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
});

export default CustomAlert;

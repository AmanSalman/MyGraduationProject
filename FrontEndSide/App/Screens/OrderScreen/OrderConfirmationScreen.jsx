import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Image } from 'react-native';
import { getToken } from '../../ReduxAndAsyncStorage/Storage'; // Adjust the path based on your actual storage location
import Icon from 'react-native-vector-icons/Ionicons'; // Import the icon library
import Colors from '../../Common/Utils/Colors';

const OrderConfirmationScreen = ({ route, navigation }) => {
  // Destructure parameters from route.params with default values
  const { region, city, town, street, phoneNumber, discountCode, cartItems, totalPrice, deliveryCost, totalWithDelivery } = route.params || {};
  const [token, setToken] = useState('');

  useEffect(() => {
    // Fetch token when component mounts
    async function fetchToken() {
      const fetchedToken = await getToken(); // Implement getToken function as per your storage implementation
      setToken(fetchedToken);
    }
    fetchToken();
  }, []);

  const handleSendOrder = async () => {
    // Concatenate address parts into a single string
    const address = `${city}, ${town}, ${street}`;
  
    // Prepare the data object to be sent in the POST request
    const orderData = {
      Address: address,
      phone: phoneNumber,
    };
  
   // console.log('Sending order:', orderData); // Log order data before sending
  
    try {
      // Send POST request to your backend endpoint
      const response = await fetch('https://ecommercebackend-jzct.onrender.com/order/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          authorization: `AmanGRAD__${token}`, // Ensure token is properly fetched and set
        },
        body: JSON.stringify(orderData),
      });
  
      // Log response details for debugging
     // console.log('Response status:', response.status);
     // console.log('Response OK:', response.ok);
  
      if (response.ok) {
        Alert.alert(' شكرأ لك , تم إرسال طلبك بنجاح ');
        navigation.navigate('Home'); // Navigate to the home screen after successful order submission
      } else {
        // Handle specific error cases
        if (response.status === 400) {
          const errorData = await response.json(); // Parse error response JSON if available
          //console.error('Bad Request Error:', errorData);
          Alert.alert('حدث خطأ في الطلب. الرجاء التحقق من البيانات والمحاولة مرة أخرى.');
        } else {
          //console.error('Unexpected Error:', response.statusText);
          Alert.alert('حدث خطأ غير متوقع أثناء إكمال الطلب. حاول مرة أخرى.');
        }
      }
    } catch (error) {
      //console.error('Error sending order:', error);
      Alert.alert('حدث خطأ أثناء إكمال الطلب. حاول مرة أخرى.');
    }
  };
  
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Icon name="arrow-back-outline" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.header}>تأكيد الطلب</Text>
        <Image
          source={require('../../../assets/logo/logo.jpg')}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      <View style={styles.orderDetailsContainer}>
        <Text style={[styles.detailLabel, { textAlign: 'right' }]}>المدينة:</Text>
        <Text style={[styles.detailValue, { textAlign: 'right' }]}>{city}</Text>

        <Text style={[styles.detailLabel, { textAlign: 'right' }]}>البلدة:</Text>
        <Text style={[styles.detailValue, { textAlign: 'right' }]}>{town}</Text>

        <Text style={[styles.detailLabel, { textAlign: 'right' }]}>الشارع:</Text>
        <Text style={[styles.detailValue, { textAlign: 'right' }]}>{street}</Text>

        <Text style={[styles.detailLabel, { textAlign: 'right' }]}>رقم الهاتف:</Text>
        <Text style={[styles.detailValue, { textAlign: 'right' }]}>{phoneNumber}</Text>

        <Text style={[styles.detailLabel, { textAlign: 'right' }]}>تكلفة التوصيل:</Text>
        <Text style={[styles.detailValue, { textAlign: 'right' }]}>₪{deliveryCost.toFixed(2)}</Text>

        <Text style={[styles.detailLabel, { textAlign: 'right' }]}>تكلفة الطلب كامل شامل التوصيل:</Text>
        <Text style={[styles.detailValue, { textAlign: 'right' }]}>₪{totalWithDelivery.toFixed(2)}</Text>
      </View>
      
      <TouchableOpacity style={styles.sendButton} onPress={handleSendOrder}>
        <Icon name="paper-plane-outline" size={24} color="#FFFFFF" style={{ marginRight: 10 }} />
        <Text style={styles.sendButtonText}>إرسال الطلب</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f0f0f0',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  header: {
    fontSize: 29,
    fontWeight: 'bold',
    color: Colors.Black, // Header color
    fontFamily: 'HelveticaNeue', // Set font family to 'Helvetica Neue'
    textAlign: 'right',
    marginRight: 40,
    marginLeft:50
  },
  orderDetailsContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    width: '100%',
    elevation: 2,
  },
  detailLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  detailValue: {
    fontSize: 16,
    marginBottom: 10,
    color: '#666',
  },
  sendButton: {
    marginTop: 20,
    padding: 16,
    borderRadius: 8,
    backgroundColor: Colors.ORANGE,
    alignItems: 'center',
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
  },
  sendButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  logo: {
    width: 80,
    height: 80,
    borderRadius: 50,
    marginLeft: 10,

  },
  backButton: {
    padding: 10,
    backgroundColor: Colors.Blue, // Customize back button background color
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default OrderConfirmationScreen;

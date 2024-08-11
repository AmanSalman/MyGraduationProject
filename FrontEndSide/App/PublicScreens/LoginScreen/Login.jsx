



//App Screens LoginScreen Login.jsx
import React, { useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Colors from '../../Common/Utils/Colors';
import { getToken } from '../../ReduxAndAsyncStorage/Storage';

export default function Login() {
  const navigation = useNavigation();

  const handleNavigate = () => {
    navigation.navigate('Signin');
  };
  
   useEffect(() => {
    const checkUser = async() => {
      const token = await getToken();

      if(token)
        navigation.navigate('Home');

    }
    checkUser()
  }, []);



  
  return (
    <View style={styles.container}>
      <Image
        source={require('../../../assets/images/Welcomejpg.jpg')}
        style={styles.loginImage}
      />
      <View style={styles.subContainer}>
        
        {/* <Text style={styles.headerText}>
        Kids Skills 
        </Text> */}
        <Text style={styles.headerText}>
        حب التعلم هو أفضل هدية يمكننا تقديمها لأطفالنا .      
                    </Text>
        <Text style={styles.subHeaderText}>
          {/* ستجد في هذا التطبيق كل ما يلزم لتعليم أطفالك منذ الولادة إلى سن السادسة عشر */}
          نفتح أبواب المعرفة بحب ونغرسها في قلوب أطفالكم من عمر سنة إلى 16 سنة!
        </Text>
        <TouchableOpacity style={styles.button} onPress={handleNavigate}>
          <Text style={styles.buttonText}>
            إبدأ الآن
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.WHITE,
    padding: 10,
  },
  loginImage: {
    width: 800,
    height: 500,
    resizeMode: 'contain',
    marginBottom: 40,
  },
  subContainer: {
    width: '90%',
    height:'50%',
    padding: 30,
    backgroundColor: Colors.ORANGE,
    borderRadius: 40,
    alignItems: 'center',
  },
  headerText: {
    fontSize: 29,
    color: Colors.WHITE,
    textAlign: 'center',
    marginBottom: 40,
  },
  subHeaderText: {
    fontSize: 18,
    color: Colors.WHITE,
    textAlign: 'center',
    marginBottom: 50,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 70,
    backgroundColor: Colors.WHITE,
    borderRadius: 20,
  },
  buttonText: {
    fontSize: 25,
    color: Colors.ORANGE,
    textAlign: 'center',
  },
});

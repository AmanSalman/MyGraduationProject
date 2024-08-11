
import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import Footer from '../../Common/Footer/Footer';
import Colors from '../../Common/Utils/Colors';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Categories = () => {
  const navigation = useNavigation();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = () => {
    axios.get('https://ecommercebackend-jzct.onrender.com/category/active')
      .then(response => {
        const allCategories = response.data.categories;
        const specialCategoryIndex = allCategories.findIndex(category => category.name === "من الولادة - سنتين");
        if (specialCategoryIndex !== -1) {
          const specialCategory = allCategories.splice(specialCategoryIndex, 1)[0];
          setCategories([specialCategory, ...allCategories]);
        } else {
          setCategories(allCategories);
        }
        setLoading(false);
      })
      .catch(error => {
        //console.error('Error fetching categories:', error);
        setLoading(false);
      });
  };

  const handlePress = (categoryId, categoryName, categoryImage) => {
    navigation.navigate('BooksByCategory', { categoryId, categoryName, categoryImage });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.title}>التصنيفات</Text>
          <MaterialCommunityIcons name="book-open-variant" size={50} color={Colors.PINK} style={styles.icon} />
        </View>

        <View style={styles.line} /> 
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={Colors.PINK} />
          </View>
        ) : (
          <View style={styles.content}>
            {categories.map((category, index) => (
              <TouchableOpacity
                key={index}
                style={styles.categoryContainer}
                onPress={() => handlePress(category._id, category.name, category.image.secure_url)}
              >
                <View style={styles.categoryContent}>
                  <Text style={styles.categoryName}>{category.name}</Text>
                  <View style={styles.ovalBorder}>
                    <Image source={{ uri: category.image.secure_url }} style={styles.categoryImage} />
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </ScrollView>
      <Footer />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:'flex-end',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  icon: {
    marginRight: 10,
    alignItems:'center',
    justifyContent:'center',
    marginTop:26
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    marginBottom: 70,
  },
  categoryContainer: {
    alignItems: 'flex-end',
    marginBottom: 20,
    marginRight: 5,
  },
  categoryContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ovalBorder: {
    borderRadius: 50,
    borderWidth: 2,
    borderColor: 'pink',
    borderStyle: 'dotted',
    marginLeft: 10,
  },
  categoryImage: {
    width: 90,
    height: 90,
    borderRadius: 50,
  },
  categoryName: {
    fontSize: 19,
    fontWeight: 'bold',
    color: Colors.BLACK,
    marginRight: 10,
  },
 
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    color: Colors.BLACK,
    fontFamily: 'Arial', // Add any font family you prefer
    marginTop:40,
    marginEnd:10,
    alignItems:'center'
  },

  line: {
    borderBottomColor: Colors.ORANGE, // لون الخط
    borderBottomWidth: 2, // سماكة الخط
    width: '50%', // الطول المطلوب للخط
    alignSelf: 'flex-end', // يجعل الخط في وسط الصفحة
    marginBottom: 20, // تباعد بين الخط وباقي العناصر
  },
});

export default Categories;

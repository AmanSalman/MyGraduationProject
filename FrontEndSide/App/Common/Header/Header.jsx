/*

import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput, FlatList, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Colors from '../Utils/Colors';
import axios from 'axios';

const Header = ({ title }) => {
  const navigation = useNavigation();

  const handleProfilePress = () => {
    navigation.navigate('Profile');
  };

  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!searchTerm.trim()) {
      Alert.alert('الرجاء إدخال اسم كتاب للبحث عنه');
      return;
    }

    setLoading(true);

    try {
      const response = await axios.get(`https://ecommercebackend-jzct.onrender.com/book/Active?title=${encodeURIComponent(searchTerm.trim())}`);
      const data = response.data;

      console.log('Search results:', data);

      if (data.length === 0) {
        Alert.alert('عذراً', `الكتاب "${searchTerm.trim()}" غير متوفر في الوقت الحالي`);
      }

      setSearchResults(data);
    } catch (error) {
      console.error('Error searching books:', error);
      Alert.alert('حدث خطأ أثناء البحث عن الكتاب. الرجاء المحاولة مرة أخرى.');
    } finally {
      setLoading(false);
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.itemContainer}>
      <Text style={styles.itemText}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.header}>
      <TouchableOpacity style={styles.profileContainer} onPress={handleProfilePress}>
        <Icon name="user" size={40} color={Colors.WHITE} />
      </TouchableOpacity>

      <View style={styles.middleContainer}>
        <TextInput
          placeholder="ابحث هنا ..."
          placeholderTextColor={Colors.WHITE}
          style={styles.searchInput}
          onChangeText={setSearchTerm}
          onSubmitEditing={handleSearch}
          value={searchTerm}
        />
      </View>

      <View style={styles.leftContainer}>
        <Text style={styles.title}>{title}</Text>
        <Image
          source={require('../../../assets/logo/logo.jpg')}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      {loading ? (
        <Text style={styles.loadingText}>جاري البحث...</Text>
      ) : (
        <FlatList
          data={searchResults}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          style={styles.listContainer}
          ListEmptyComponent={<Text style={styles.emptyText}>لا توجد نتائج للعرض</Text>}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 130,
    paddingHorizontal: 20,
    backgroundColor: Colors.BLUE,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    borderBottomStartRadius: 60,
    borderBottomEndRadius: 60,
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 80,
    height: 80,
    borderRadius: 50,
    marginTop: 22,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.WHITE,
  },
  profileContainer: {
    padding: 10,
    borderRadius: 20,
    marginTop: 22,
  },
  middleContainer: {
    flex: 1,
    alignItems: 'center',
  },
  searchInput: {
    backgroundColor: Colors.BLUE,
    color: Colors.WHITE,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginTop: 35,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.WHITE,
    width: '90%',
    fontSize: 16,
    textAlign: 'right',
  },
  itemContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: Colors.LIGHT_GRAY,
  },
  itemText: {
    fontSize: 18,
    color: Colors.DARK_GRAY,
  },
  listContainer: {
    flex: 1,
    marginTop: 10,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: Colors.GRAY,
  },
  loadingText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: Colors.BLUE,
  },
});

export default Header;


*/







import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput, Alert, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Colors from '../Utils/Colors';

const Header = ({ title }) => {
  const navigation = useNavigation();
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);

  const handleProfilePress = () => {
    navigation.navigate('Profile');
  };

  const handleSearchPress = () => {
    navigation.navigate('BookSearchScreen', { searchTerm });
  };

  return (
    <View style={styles.header}>
      <TouchableOpacity style={styles.profileContainer} onPress={handleProfilePress}>
        <Icon name="user" size={40} color={Colors.WHITE} />
      </TouchableOpacity>

     

      <View style={styles.leftContainer}>
        <Text style={styles.title}>{title}</Text>
        <Image
          source={require('../../../assets/logo/logo.jpg')}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 130,
    paddingHorizontal: 20,
    backgroundColor: Colors.BLUE,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    borderBottomStartRadius: 60,
    borderBottomEndRadius: 60,
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 80,
    height: 80,
    borderRadius: 50,
    marginTop: 22,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.WHITE,
  },
  profileContainer: {
    padding: 10,
    borderRadius: 20,
    marginTop: 22,
  },
  middleContainer: {
    flex: 1,
    alignItems: 'center',
  },
  searchInput: {
    backgroundColor: Colors.BLUE,
    color: Colors.WHITE,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginTop: 35,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.WHITE,
    width: '90%',
    fontSize: 16,
    textAlign: 'right',
  },
  loadingIndicator: {
    position: 'absolute',
    right: 10,
    top: 50,
  },
});

export default Header;

import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native'; 
import Colors from '../Utils/Colors';

const Navbar = () => {
  const navigation = useNavigation(); 
  const [activeTab, setActiveTab] = useState(''); // تعيين الحالة النشطة بالابتداء

  const tabs = [
    { id: 'New', title: 'جديد', screen: 'New' },
    { id: 'Discount', title: 'خصومات', screen: 'Discount' },
    { id: 'Home', title: 'الكل', screen: 'Home' },
  ];

  const handleTabPress = ( screenName) => {
  
    // توجيه المستخدم إلى الشاشة المناسبة بناءً على الزر الذي تم الضغط عليه
    navigation.navigate(screenName);
  };

  // عرض عناصر الأزرار
  const renderTabItem = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.tabItem,
        item.id === activeTab && styles.activeTab, // تطبيق الأنماط إذا كان الزر نشطًا
      ]}
      onPress={() => handleTabPress(item.id, item.screen)}
    >
      <Text style={[styles.tabText, item.id === activeTab && styles.activeTabText]}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={tabs}
        renderItem={renderTabItem}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f0f0f0',
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabItem: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginRight: 10,
    borderRadius: 20,
  },
  activeTab: {
    backgroundColor: Colors.ORANGE, // تغيير لون خلفية الزر النشط
  },
  tabText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  activeTabText: {
    color: '#fff', // تغيير لون النص للزر النشط
  },
});

export default Navbar;

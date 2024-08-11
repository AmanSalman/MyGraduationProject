// Storage.js

import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveToken = async (token) => {
  try {
    await AsyncStorage.setItem('@user_token', token);
  } catch (e) {
   // console.error('Failed to save the token to the storage', e);
  }
};

export const getToken = async () => {
  try {
    const token = await AsyncStorage.getItem('@user_token');
  //  console.log('Retrieved token:', token);
    return token;
  } catch (e) {
   // console.error('Failed to fetch the token from storage', e);
    return null;
  }
};

export const removeToken = async () => {
  try {
    await AsyncStorage.removeItem('@user_token');
  } catch (e) {
   // console.error('Failed to remove the token from storage', e);
  }
};

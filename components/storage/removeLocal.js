import AsyncStorage from '@react-native-async-storage/async-storage';

// Function to remove the token from local storage
export const removeLocal = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
    // console.log('removed successfully');
  } catch (error) {
    console.error('Error removing token:', error);
  }
};

import AsyncStorage from "@react-native-async-storage/async-storage"


async function welcomeAsyncstorage (key,value){
    try {
        await AsyncStorage.setItem(key,JSON.stringify(value))
        // console.log('true');
        
        return true
    } catch (error) {
        // console.error('Error saving data', error);
        return false
    }
}

export default welcomeAsyncstorage
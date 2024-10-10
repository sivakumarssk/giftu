import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";

async function getWelcomeAsync(key){
        try {
            const value=await AsyncStorage.getItem(key)
            // console.log(value);
            
            if (value !== null) {
                const value1=JSON.parse(value)
                return value1
              }
            // console.log(value,'sdcsdac');
        } catch (error) {
            console.error('getting error',error)
        }
}

export default getWelcomeAsync
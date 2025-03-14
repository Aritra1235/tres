import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Crypto from 'expo-crypto';

export async function storeData(key: string, value: any) {
    try {
      const data = typeof value === "string" ? value : JSON.stringify(value);
      await AsyncStorage.setItem(key, data);
    } catch (e) {
      console.error("Error saving data", e);
    }
};

export async function getData(key:string) {
    try {
      const value = await AsyncStorage.getItem(key);
      if (value !== null) {
        try {
          return JSON.parse(value); // Try parsing if it's JSON
        } catch {
          return value; // Return as a string if parsing fails
        }
      }
      return null; // Key doesn't exist
    } catch (e) {
      console.error("Error retrieving data", e);
      return null;
    }
};

export async function generateUUID() {
    const uuid =  await Crypto.randomUUID();
    storeData('uuid', uuid);
    return uuid;
}


export async function getDeviceId(): Promise<string> {
    // Check if UUID exists in storage
    const existingUuid = await getData('uuid');
    
    // If it exists, return it
    if (existingUuid) {
      return existingUuid;
    }
    
    // If it doesn't exist, generate a new one
    const deviceId = await generateUUID();
    return deviceId;
  }
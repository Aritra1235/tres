import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Crypto from "expo-crypto";
import * as SecureStore from 'expo-secure-store';


export async function setAsyncValue(key: string, value: any) {
  try {
    const data = typeof value === "string" ? value : JSON.stringify(value);
    await AsyncStorage.setItem(key, data);
  } catch (e) {
    console.error("Error saving data", e);
  }
}

export async function getAsyncValue(key: string) {
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
}

export async function generateUUID() {
  const uuid = Crypto.randomUUID();
  await setAsyncValue("uuid", uuid);
  return uuid;
}

export async function getDeviceId(): Promise<string> {
  // Check if UUID exists in storage
  const existingUuid = await getAsyncValue("uuid");

  // If it exists, return it
  if (existingUuid) {
    return existingUuid;
  }

  // If it doesn't exist, generate a new one
  return await generateUUID();
}

export async function setSecureStoreValue<T>(key: string, value: any): Promise<void> {
  try {
    const data = typeof value === "string" ? value : JSON.stringify(value);
    await SecureStore.setItemAsync(key, data);
  } catch (e) {
    console.error(`Error saving secure data for key "${key}":`, e);
  }
}

export async function getSecureStoreValue<T>(key: string): Promise<T | null> {
  try {
    const value = await SecureStore.getItemAsync(key);
    if (value !== null) {
      try {
        return JSON.parse(value) as T;
      } catch {
        return value as unknown as T; // Handle non-JSON values gracefully
      }
    }
    return null;
  } catch (e) {
    console.error(`Error retrieving secure data for key "${key}":`, e);
    return null;
  }
}
import { Stack, useRouter} from "expo-router";
import { ActionSheetProvider } from "@expo/react-native-action-sheet";
import { useState, useEffect } from "react";
import { getSecureStoreValue } from "@/utils/storage";


export default function RootLayout() {
  const [isloggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    async function checkLoginStatus() {
      const token = await getSecureStoreValue<string>("AccessToken");
      console.log("Token: ", token);
      
      if (token && typeof token === "string" && token.length > 0) {
        setIsLoggedIn(true);
        router.replace("/home");
      }
    }
    checkLoginStatus();
  }, []); 
  

  return (
      <Stack screenOptions={{headerShown: false}}/>    
  );
}
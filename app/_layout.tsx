import { Stack } from "expo-router";
import { ActionSheetProvider } from "@expo/react-native-action-sheet";

export default function RootLayout() {
  return (
      <Stack screenOptions={{headerShown: false}}/>    
  );
}
import {
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Button,
  TouchableOpacity,
  Alert,
} from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { fetch } from "expo/fetch";
import { useState } from "react";
import { router, Router } from "expo-router";
import { getData, getDeviceId } from "@/utils/storage";
import * as Device from "expo-device";

export default function Index() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleLogin() {
    setIsLoading(true);
    console.log("Logging in");
    const serverIp = await getData("serverIp");
    console.log("Server IP", serverIp);
    if (!serverIp) {
      Alert.alert("Server IP not found");
      setIsLoading(false);
      router.push("/");
    }
    const serverVersion = await getData("serverVersion");
    const deviceId = await getDeviceId();

    try {
      const response = await fetch(`${serverIp}/Users/AuthenticateByName`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `MediaBrowser Client="Tres Mobile", Device=${Device.manufacturer}, DeviceId=${deviceId}, Version=${serverVersion}`,
        },
        body: JSON.stringify({
          Username: username,
          Pw: password,
        }),
      });

      console.log("Response", response);
      console.log("Response status:", response.status);

      if (response.status === 200) {
        const data = await response.json();
        console.log("Login info:", data);
        setErrorMessage("Login successful");
        setIsError(false);
        // i need to implement a way to store the user token
      } else {
        // This handles the case where the server returns a 401 unauthorized
        console.log("Login failed with status:", response.status);
        setErrorMessage(
          response.status === 401
            ? "Invalid username or password"
            : "Login failed"
        );
        setIsError(true);
      }
    } catch (error) {
      console.error("Error during login:", error);
      setErrorMessage((error as Error).message || "Network error");
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <ThemedView
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      >
        <ThemedText style={styles.welcome}>Welcome</ThemedText>
        <ThemedText style={styles.instructions}>
          Please Log In with your JellyFin User Account
        </ThemedText>
      </ThemedView>

      <ThemedView
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {errorMessage ? (
          <ThemedText style={styles.instructions}>{errorMessage}</ThemedText>
        ) : null}
        <TextInput
          style={[styles.input, { borderColor: isError ? "red" : "#444648" }]}
          placeholder="Username"
          placeholderTextColor="#999"
          value={username}
          onChangeText={setUsername}
          autoCapitalize="none"
        />
        <TextInput
          style={[styles.input, { borderColor: isError ? "red" : "#444648" }]}
          placeholder="Password"
          placeholderTextColor="#999"
          value={password}
          onChangeText={setPassword}
          autoCapitalize="none"
          secureTextEntry
        />
        <TouchableOpacity
          style={styles.loginButton}
          onPress={handleLogin}
          disabled={isLoading}
        >
          <ThemedText style={styles.buttonText}>
            {isLoading ? "Logging in..." : "Login"}
          </ThemedText>
        </TouchableOpacity>
      </ThemedView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  //welcome: {
  //  fontSize: 40,
  //  lineHeight: 40,
  //},
  //instructions: {
  //  textAlign: "center",
  //},
  //input: {
  //  height: 40,
  //  width: 200,
  //  borderRadius: 5,
  //  color: "#ECEDEE" ,
  //  borderColor: "#444648",
  //  borderWidth: 1,
  //  backgroundColor: "#2E3032",
  //  paddingHorizontal: 10,
  //
  //},

  welcome: {
    fontSize: 40,
    lineHeight: 40,
    marginBottom: 20,
    fontWeight: "bold",
  },
  instructions: {
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    height: 50,
    width: 280,
    borderRadius: 8,
    color: "#ECEDEE",
    borderColor: "#444648",
    borderWidth: 1,
    backgroundColor: "#2E3032",
    paddingHorizontal: 15,
    fontSize: 16,
    marginBottom: 10,
  },
  loginButton: {
    backgroundColor: "transparent",
    padding: 10,
    borderRadius: 5,
    borderColor: "transparent",
    borderWidth: 1,
    width: 280,
    alignItems: "center",
  },
  buttonText: {
    color: "#007AFF",
    fontSize: 16,
    fontWeight: "600",
  },
});

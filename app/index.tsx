import {
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { fetch } from "expo/fetch";
import { useState } from "react";
import { router, Router } from "expo-router";
import { storeData } from "@/utils/storage";

export default function Index() {
  const [errorMessage, setErrorMessage] = useState("");
  const [serverIp, setServerIp] = useState("");
  const [isError, setIsError] = useState(false);

  async function checkServer() {
    console.log("Checking server");
    if (
      /^(https?:\/\/(?:\d{1,3}(?:\.\d{1,3}){3}|\S+):\d+)(\/?)$/.test(serverIp)
    ) {
      console.log("Valid Url", serverIp);
    } else {
      console.log("Invalid Url", serverIp);
      setErrorMessage("Invalid Url");
      setIsError(true);
      return 0;
    }

    console.log("Checking server", serverIp);
    await fetch(`${serverIp}/System/Info/Public`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      //body: JSON.stringify({}),
    })
      .then((response) => {
        console.log("Response", response);
        if (response.status === 200) {
          return response.json(); // here i will parse the json
        } else {
          console.log("Server not found");
          throw new Error("Server not found");
        }
      })
      .then((data) => {
        console.log("Server info:", data);
        console.log("Server name:", data.ServerName);
        console.log("Version:", data.Version);

        setErrorMessage(`Connected to ${data.ServerName} (${data.Version})`);
        setIsError(false);
        storeData("serverIp", serverIp);
        storeData("serverName", data.ServerName);
        storeData("serverVersion", data.Version);
        router.push("/login");
      })
      .catch((error) => {
        console.error(error);
        setErrorMessage(error.message);
        setIsError(true);
      });
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
          This Is A Simple Mobile Music Client For JellyFin
        </ThemedText>
      </ThemedView>

      <ThemedView
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          gap: 5,
        }}
      >
        <ThemedText style={styles.instructions}>
          Enter Server Ip/domain Including protocol
        </ThemedText>
        {errorMessage ? (
          <ThemedText style={styles.instructions}>{errorMessage}</ThemedText>
        ) : null}
        <TextInput
          style={[styles.input, { borderColor: isError ? "red" : "#444648" }]}
          placeholder="Enter Server Address"
          placeholderTextColor="#A0A0A0"
          value={serverIp}
          onChangeText={setServerIp}
          autoCapitalize="none"
          autoCorrect={false}
          autoComplete="off"
        />
        {/*<Button title="Submit" onPress={() => {
          checkServer();
        }} />*/}
        <TouchableOpacity
          style={styles.submit}
          onPress={() => {
            checkServer();
          }}
        >
          <ThemedText style={styles.buttonText}>Submit</ThemedText>
        </TouchableOpacity>
      </ThemedView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  welcome: {
    fontSize: 40,
    lineHeight: 40,
  },
  instructions: {
    textAlign: "center",
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
  submit: {
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

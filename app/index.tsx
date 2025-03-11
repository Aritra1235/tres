import { TextInput, StyleSheet, KeyboardAvoidingView, Platform, Button, } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import {fetch} from 'expo/fetch'
import { useState } from "react";


export default function Index() {
  const [errorMessage, setErrorMessage] = useState('');
  const [serverIp, setServerIp] = useState('');
  const [isError, setIsError] = useState(false);


  async function checkServer() {
    console.log('Checking server');
    if (/^(https?:\/\/(?:\d{1,3}(?:\.\d{1,3}){3}|\S+):\d+)(\/?)$/.test(serverIp)) {
      serverIp.replace(/^(https?:\/\/(?:\d{1,3}(?:\.\d{1,3}){3}|\S+):\d+)\/?$/, "$1/System/Ping");
    } else {
      console.log('Invalid Url', serverIp)
      setErrorMessage('Invalid Url')
      setIsError(true)
      return 0;
    }
    
    console.log('Checking server', serverIp);
    await fetch(`${serverIp}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({}),
    }).then((response) => {
      if (response.status === 200) {
        console.log('Server found', response);
        setErrorMessage('Server found');
        setIsError(false);
      } else
      if (response.status !== 200) {
        console.log('Server not found');
        setErrorMessage('Server not found');
        setIsError(true);
      }
    }).catch((error) => {
      console.error(error);
      //setErrorMessage('Server not found');
    });
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <ThemedView style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
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
        }}
      >
        <ThemedText style={styles.instructions}>Enter Server Ip/domain Including protocol</ThemedText>
        {errorMessage ? <ThemedText style={styles.instructions}>{errorMessage}</ThemedText> : null}
        <TextInput
          style={[
            styles.input,
            {borderColor: isError ? 'red' : '#444648'}
          ]}
          
          placeholder="Enter text"
          placeholderTextColor="#A0A0A0"
          value={serverIp}
          onChangeText={setServerIp}
        />
        <Button title="Submit" onPress={() => {
          checkServer();
        }} />

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
    height: 40,
    width: 200,
    borderRadius: 5,
    color: "#ECEDEE" ,
    borderColor: "#444648",
    borderWidth: 1,
    backgroundColor: "#2E3032",
    paddingHorizontal: 10,
    
  },
});

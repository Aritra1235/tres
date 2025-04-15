import {
    TextInput,
    StyleSheet,
    KeyboardAvoidingView,
    Platform,
    TouchableOpacity,
    View,
    Text,
  } from "react-native";
import React from "react";


export default function Home() {
    return (
      <View style={style.container}>
        <Text style={style.instructions}>Library</Text>
      </View>
    )
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#000000",
    },
    welcome: {
        fontSize: 20,
        textAlign: "center",
        margin: 10,
    },
    instructions: {
        textAlign: "center",
        color: "#ECEDEE",
        marginBottom: 5,
    },
});
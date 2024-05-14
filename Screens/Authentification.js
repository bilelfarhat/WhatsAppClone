import React, { useState, useRef } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground, ActivityIndicator } from "react-native";
import { StatusBar } from "expo-status-bar";
import { AntDesign } from "@expo/vector-icons";
import firebase from "../Config";

const auth = firebase.auth();

export default function Authentification(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isButtonPressed, setIsButtonPressed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const passwordInputRef = useRef(null);

  const handleSignIn = () => {
    setIsLoading(true);
    auth.signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        const currentId = auth.currentUser.uid;
        props.navigation.navigate("Accueil", { currentId });
      })
      .catch((error) => {
        const errorMessage =
          error.code === "auth/invalid-credential"
            ? "Email ou mot de passe incorrect"
            : error.message;
        alert(errorMessage);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <ImageBackground
      source={require("../assets/login.jpg")}
      style={styles.container}
    >
      <View style={styles.contentContainer}>
        <Text style={styles.welcomeText}>Bienvenue</Text>
        <View style={styles.inputContainer}>
          <AntDesign name="mail" size={24} color="#333" style={styles.inputIcon} />
          <TextInput
            style={styles.inputStyle}
            placeholder="Email"
            placeholderTextColor="#666"
            onChangeText={(text) => setEmail(text)}
            autoFocus={true}
            returnKeyType="next"
            onSubmitEditing={() => { passwordInputRef.current.focus(); }}
          />
        </View>
        <View style={styles.inputContainer}>
          <AntDesign name="lock" size={24} color="#333" style={styles.inputIcon} />
          <TextInput
            ref={passwordInputRef}
            secureTextEntry={true}
            style={styles.inputStyle}
            placeholder="Mot de passe"
            placeholderTextColor="#666"
            onChangeText={(text) => setPassword(text)}
            returnKeyType="done"
            onSubmitEditing={handleSignIn}
          />
        </View>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: isButtonPressed ? "#0056b3" : "#007bff" }]}
          onPressIn={() => setIsButtonPressed(true)}
          onPressOut={() => setIsButtonPressed(false)}
          onPress={handleSignIn}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator size="small" color="white" />
          ) : (
            <Text style={styles.buttonText}>Se connecter</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.createAccountText}
          onPress={() => props.navigation.navigate("NewUser")}
        >
          <Text style={styles.createAccountButtonText}>Créer un compte</Text>
          <AntDesign name="right" size={16} color="#007bff" style={{ marginLeft: 5 }} />
        </TouchableOpacity>
      </View>

      <StatusBar style="light" />
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  contentContainer: {
    width: "80%",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    borderRadius: 10,
    paddingVertical: 30,
  },
  welcomeText: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "80%",
    marginVertical: 10,
    borderBottomWidth: 1,
    borderColor: "#666",
    paddingBottom: 5,
  },
  inputIcon: {
    marginRight: 10,
  },
  inputStyle: {
    flex: 1,
    fontSize: 18,
    color: "#333",
  },
  button: {
    backgroundColor: "#007bff",
    borderRadius: 8,
    paddingVertical: 12,
    width: "80%",
    marginTop: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    textAlign: "center",
  },
  createAccountText: {
    flexDirection: "row",
    marginTop: 20,
    alignItems: "center",
  },
  createAccountButtonText: {
    color: "#007bff",
    fontSize: 16,
    textDecorationLine: "underline",
  },
});

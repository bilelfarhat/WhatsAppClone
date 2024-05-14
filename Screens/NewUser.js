import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground } from "react-native";
import { StatusBar } from "expo-status-bar";
import { AntDesign } from "@expo/vector-icons";
import firebase from "../Config";

const auth = firebase.auth();

export default function NewUser(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleCreateAccount = () => {
    if (password !== confirmPassword) {
      alert("Les mots de passe ne correspondent pas");
      return;
    }

    if (password.length < 6) {
      alert("Le mot de passe doit contenir au moins 6 caractères");
      return;
    }

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailRegex.test(email)) {
      alert("Adresse e-mail invalide");
      return;
    }

    auth.createUserWithEmailAndPassword(email, password)
      .then(() => {
        alert("Compte créé avec succès");
        const currentId = auth.currentUser.uid;
        props.navigation.navigate("Accueil", { currentId });
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  return (
    <ImageBackground
      source={require("../assets/login.jpg")}
      style={styles.container}
    >
      <View style={styles.contentContainer}>
        <Text style={styles.title}>Créer un compte</Text>
        <View style={styles.inputContainer}>
          <AntDesign name="mail" size={24} color="#333" style={styles.inputIcon} />
          <TextInput
            style={styles.inputStyle}
            placeholder="Email"
            placeholderTextColor="#ccc"
            onChangeText={(text) => setEmail(text)}
          />
        </View>
        <View style={styles.inputContainer}>
          <AntDesign name="lock" size={24} color="#333" style={styles.inputIcon} />
          <TextInput
            secureTextEntry
            style={styles.inputStyle}
            placeholder="Mot de passe"
            placeholderTextColor="#ccc"
            onChangeText={(text) => setPassword(text)}
          />
        </View>
        <View style={styles.inputContainer}>
          <AntDesign name="lock" size={24} color="#333" style={styles.inputIcon} />
          <TextInput
            secureTextEntry
            style={styles.inputStyle}
            placeholder="Confirmer le mot de passe"
            placeholderTextColor="#ccc"
            onChangeText={(text) => setConfirmPassword(text)}
          />
        </View>

        <TouchableOpacity style={styles.button} onPress={handleCreateAccount}>
          <Text style={styles.buttonText}>Créer un compte</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.linkText}
          onPress={() => props.navigation.goBack()}
        >
          <Text style={styles.linkText}>Déjà un compte ? Connectez-vous</Text>
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
    paddingHorizontal: 20, // Horizontal padding added here
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    borderRadius: 10,
    paddingVertical: 30,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginVertical: 10,
    borderBottomWidth: 1,
    borderColor: "#333",
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
    width: "100%",
    marginTop: 20,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    textAlign: "center",
  },
  linkText: {
    marginTop: 15,
    color: "#007bff",
    fontSize: 16,
  },
});

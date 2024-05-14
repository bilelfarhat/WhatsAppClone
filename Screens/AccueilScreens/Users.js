import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";
import firebase from "../../Config";
import { Dialog } from "react-native-paper";

const database = firebase.database();

const Users = ({ navigation, route }) => {
  const { currentId } = route.params || {};

  const [users, setUsers] = useState([]);
  const [isDialogVisible, setIsDialogVisible] = useState(false);
  const [itemPressed, setItemPressed] = useState({});

  useEffect(() => {
    const fetchUsers = () => {
      const ref = database.ref("users");

      ref.on("value", (snapshot) => {
        const data = snapshot.val();
        const usersList = Object.values(data).filter((user) => user.Id !== currentId);
        setUsers(usersList);
      });

      return () => {
        ref.off(); // Arrêter d'écouter les modifications lorsque le composant est démonté
      };
    };

    fetchUsers();
  }, [currentId]);

  const renderItem = ({ item }) => (
    <View style={styles.userContainer}>
      <TouchableOpacity
        onPress={() => {
          setItemPressed(item);
          setIsDialogVisible(true);
        }}
      >
        <Image source={{ uri: item.UrlImage }} style={styles.userImage} />
      </TouchableOpacity>
      <Text style={styles.userText}>{item.Pseudo}</Text>
      <View style={styles.statusIndicator}>
        <View
          style={{
            height: 10,
            width: 10,
            backgroundColor: item.Connected ? "green" : "red",
            borderRadius: 15,
            marginRight: 5,
          }}
        />
        <Text>{item.Connected ? "Connecté" : "Non connecté"}</Text>
      </View>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Chat", {
            currentId,
            secondId: item.Id,
          });
        }}
        style={styles.chatButton}
      >
        <Ionicons name="chatbubble-ellipses-outline" size={24} color="#007bff" />
      </TouchableOpacity>
    </View>
  );

  return (
    <ImageBackground source={require("../../assets/login.jpg")} style={styles.container}>
      <StatusBar style="light" />
      <Text style={styles.title}>Users</Text>
      <FlatList
        data={users}
        renderItem={renderItem}
        keyExtractor={(item) => item.Id}
        style={styles.listContainer}
      />
      <Dialog visible={isDialogVisible} onDismiss={() => setIsDialogVisible(false)}>
        <Dialog.Title>Details and Options</Dialog.Title>
        <Dialog.Content>
          <View style={styles.dialogContentContainer}>
            <Image source={{ uri: itemPressed.UrlImage }} style={styles.dialogImage} />
            <View style={styles.infoContainer}>
              <Text style={styles.infoText}>Nom: {itemPressed.Nom}</Text>
              <Text style={styles.infoText}>Prénom: {itemPressed.Prenom}</Text>
              <Text style={styles.infoText}>Téléphone: {itemPressed.Telephone}</Text>
              <Text style={styles.infoText}>Pseudo: {itemPressed.Pseudo}</Text>
            </View>
          </View>
        </Dialog.Content>
      </Dialog>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingTop: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#fff",
  },
  userContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  userImage: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginRight: 10,
  },
  userText: {
    fontSize: 16,
    flex: 1,
    color: "#000",
  },
  statusIndicator: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 10,
  },
  chatButton: {
    padding: 10,
  },
  listContainer: {
    marginBottom: 20,
  },
  dialogContentContainer: {
    alignItems: "center",
    paddingVertical: 20,
  },
  dialogImage: {
    width: 110,
    height: 110,
    borderRadius: 55,
    marginBottom: 10,
  },
  infoContainer: {
    alignItems: "center",
  },
  infoText: {
    fontSize: 16,
    marginBottom: 5,
    color: "#000",
  },
});

export default Users;

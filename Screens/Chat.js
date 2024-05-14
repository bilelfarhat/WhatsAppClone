import React, { useEffect, useState } from "react";
import {
  FlatList,
  ImageBackground,
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons"; // Import the Ionicons icon set

import firebase from "../Config";
const database = firebase.database();

export default function Chat(props) {
  const currentid = props.route.params.currentId;
  const secondid = props.route.params.secondId;

  const [data, setData] = useState([]);
  const [msg, setMsg] = useState("");
  const [istypingVisible, setIstypingVisible] = useState(false);

  const iddisc = currentid > secondid ? currentid + secondid : secondid + currentid;

  useEffect(() => {
    const ref_discussion = database.ref("discussion");
    const ref_la_disc = ref_discussion.child(iddisc);

    const handleSnapshot = (snapshot) => {
      const dataArray = [];
      snapshot.forEach((childSnapshot) => {
        const item = childSnapshot.val();
        if (item.Time) {
          dataArray.push(item);
        }
      });
      setData(dataArray);
    };

    ref_la_disc.on("value", handleSnapshot);

    return () => {
      ref_la_disc.off("value", handleSnapshot);
    };
  }, [iddisc]);

  useEffect(() => {
    const ref_discussion = database.ref("discussion");
    const ref_la_disc = ref_discussion.child(iddisc);
    const ref_typing = ref_la_disc.child(secondid + "isTyping");

    const handleTypingSnapshot = (snapshot) => {
      setIstypingVisible(snapshot.val());
    };

    ref_typing.on("value", handleTypingSnapshot);

    return () => {
      ref_typing.off("value", handleTypingSnapshot);
    };
  }, [iddisc, secondid]);

  const renderItem = ({ item }) => {
    const isSender = item.Sender === currentid;

    return (
      <View
        style={[
          styles.messageContainer,
          { alignSelf: isSender ? "flex-end" : "flex-start" },
        ]}
      >
        <View
          style={[
            styles.messageBubble,
            { backgroundColor: isSender ? "#DCF8C6" : "#ECEFF1" },
          ]}
        >
          {item.UrlImage && (
            <Image
              source={{ uri: item.UrlImage }}
              style={styles.avatar}
              resizeMode="cover"
            />
          )}
          <View style={{ marginLeft: item.UrlImage ? 10 : 0 }}>
            <Text style={{ color: isSender ? "#000" : "#000" }}>
              {item.Message}
            </Text>
            <Text style={styles.messageTime}>{item.Time}</Text>
          </View>
        </View>
      </View>
    );
  };

  const sendMessage = () => {
    if (!msg.trim()) {
      alert("Message is empty");
      return;
    }

    const ref_discussion = database.ref("discussion");
    const ref_la_disc = ref_discussion.child(iddisc);
    const key = ref_la_disc.push().key;
    const ref_un_msg = ref_la_disc.child(key);

    const messageData = {
      Time: new Date().toLocaleString(),
      Message: msg,
      Sender: currentid,
      Receiver: secondid,
    };

    ref_un_msg.set(messageData).then(() => {
      setMsg("");
    });
  };

  return (
    <ImageBackground
      style={styles.container}
      source={require("../assets/chat.png")}
    >
      <FlatList
        style={{ flex: 1, marginVertical: 10 }}
        data={data}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        inverted // Start rendering items from the bottom
      />

      {istypingVisible && (
        <View style={styles.typingIndicator}>
          <Text style={{ marginRight: 5 }}>is typing...</Text>
          <Ionicons name="ellipsis-horizontal" size={16} color="#888" />
        </View>
      )}

      <View style={styles.inputContainer}>
        <TextInput
          value={msg}
          onChangeText={(ch) => setMsg(ch)}
          placeholder="Type a message..."
          placeholderTextColor="white"
          style={styles.input}
        />
        <TouchableOpacity onPress={sendMessage} style={styles.sendButton}>
          <Ionicons name="send" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    justifyContent: "flex-end",
  },
  messageContainer: {
    marginBottom: 10,
    alignItems: "flex-end",
  },
  messageBubble: {
    flexDirection: "row",
    alignItems: "center",
    maxWidth: "80%",
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  avatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 10,
  },
  messageTime: {
    fontSize: 12,
    color: "#888",
    marginTop: 5,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#0008",
    borderRadius: 25,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginBottom: 10,
  },
  input: {
    flex: 1,
    height: 40,
    color: "white",
  },
  sendButton: {
    marginLeft: 10,
    padding: 8,
    backgroundColor: "#22f9",
    borderRadius: 20,
  },
  typingIndicator: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
});

import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import * as ImagePicker from 'expo-image-picker';
import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';

import firebase from '../../Config';
const database = firebase.database();
const storage = firebase.storage();

export default function MyProfil(props) {
  const currentId = props.route.params.currentId;

  const [Nom, setNom] = useState('');
  const [Prenom, setPrenom] = useState('');
  const [Telephone, setTelephone] = useState('');
  const [Pseudo, setPseudo] = useState('');
  const [UrlImage, setUrlImage] = useState('');

  useEffect(() => {
    const ref_users = database.ref('users');
    const user = ref_users.child(currentId);

    user.once('value', (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        setNom(data.Nom || '');
        setPrenom(data.Prenom || '');
        setTelephone(data.Telephone || '');
        setPseudo(data.Pseudo || '');
        setUrlImage(data.UrlImage || '');
      }
    }).catch((error) => {
      Alert.alert('Erreur', error.message);
    });
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setUrlImage(result.uri);
    }
  };

  const uploadImage = async (uri) => {
    try {
      const blob = await fetch(uri).then((response) => response.blob());
      const ref = storage.ref('images').child('image');
      await ref.put(blob);
      const url = await ref.getDownloadURL();
      return url;
    } catch (error) {
      Alert.alert('Erreur', 'Une erreur s\'est produite lors du chargement de l\'image.');
      return null;
    }
  };

  const saveProfile = async () => {
    if (!Nom || !Prenom || !Telephone || !Pseudo || !UrlImage) {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs.');
      return;
    }

    try {
      const imageUrl = await uploadImage(UrlImage);

      if (!imageUrl) {
        return;
      }

      const userRef = database.ref(`users/${currentId}`);
      await userRef.set({
        Nom,
        Prenom,
        Telephone,
        Pseudo,
        UrlImage: imageUrl,
        Id: currentId,
      });

      Alert.alert('Succès', 'Profil enregistré avec succès.');
      setNom('');
      setPrenom('');
      setTelephone('');
      setPseudo('');
      setUrlImage('');
    } catch (error) {
      Alert.alert('Erreur', 'Une erreur s\'est produite lors de l\'enregistrement du profil.');
    }
  };

  const logout = async () => {
    try {
      const userRef = database.ref(`users/${currentId}`);
      await userRef.update({ Connected: false });

      // Rediriger vers la page d'authentification
      props.navigation.replace('Authentification'); // Assurez-vous que 'Auth' est la bonne route vers l'écran d'authentification
    } catch (error) {
      Alert.alert('Erreur', 'Une erreur s\'est produite lors de la déconnexion.');
    }
  };

  return (
    <ImageBackground
      source={require('../../assets/backprofil.jpg')}
      style={styles.container}
    >
      <StatusBar style="dark" />
      <Text style={styles.textstyle}>My profile</Text>
      <TouchableOpacity onPress={pickImage}>
        <Image
          source={UrlImage ? { uri: UrlImage } : require('../../assets/backprofil.jpg')}
          style={styles.profileImage}
        />
      </TouchableOpacity>

      <TextInput
        onChangeText={(text) => setNom(text)}
        textAlign="center"
        placeholder="Nom"
        style={styles.textinputstyle}
        value={Nom}
      />
      <TextInput
        onChangeText={(text) => setPrenom(text)}
        textAlign="center"
        placeholder="Prenom"
        style={styles.textinputstyle}
        value={Prenom}
      />
      <TextInput
        onChangeText={(text) => setTelephone(text)}
        textAlign="center"
        placeholder="Telephone"
        keyboardType="phone-pad"
        style={styles.textinputstyle}
        value={Telephone}
      />
      <TextInput
        onChangeText={(text) => setPseudo(text)}
        textAlign="center"
        placeholder="Pseudo"
        style={styles.textinputstyle}
        value={Pseudo}
      />

      <TouchableOpacity onPress={saveProfile} style={styles.saveButton}>
        <Text style={styles.buttonText}>Enregistrer</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={logout} style={[styles.saveButton, { backgroundColor: '#d9534f' }]}>
        <Text style={[styles.buttonText, { color: '#fff' }]}>Déconnexion</Text>
      </TouchableOpacity>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 20,
    backgroundColor: '#fff',
  },
  textstyle: {
    fontSize: 32,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  profileImage: {
    height: 150,
    width: 150,
    borderRadius: 75,
    borderWidth: 2,
    borderColor: '#fff',
    marginVertical: 10,
  },
  textinputstyle: {
    fontStyle: 'italic',
    backgroundColor: '#0002',
    fontSize: 16,
    width: '70%',
    height: 40,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
    color: 'black',
  },
  saveButton: {
    backgroundColor: '#4682a0',
    width: '50%',
    height: 40,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

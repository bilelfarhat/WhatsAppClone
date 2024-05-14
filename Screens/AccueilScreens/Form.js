import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Form = ({ route }) => {
  const { groupName } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Group Name: {groupName}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0', // Couleur de fond du conteneur
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333', // Couleur du texte
  },
});

export default Form;

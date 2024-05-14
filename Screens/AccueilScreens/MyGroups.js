import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';

const MyGroups = ({ navigation }) => {
  const groups = ['GL1', 'BI1', 'GL2', 'BI2'];

  const handleGroupPress = (groupName) => {
    navigation.navigate('Form', { groupName });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Groups</Text>
      {groups.map((groupName, index) => (
        <TouchableOpacity
          key={index}
          style={styles.groupButton}
          onPress={() => handleGroupPress(groupName)}
        >
          <Text style={styles.groupText}>{groupName}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  groupButton: {
    backgroundColor: '#4682a0',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  groupText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default MyGroups;

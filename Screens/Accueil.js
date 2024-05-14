import React, { useEffect } from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import Users from './AccueilScreens/Users';
import MyGroups from './AccueilScreens/MyGroups';
import MyProfile from './AccueilScreens/MyProfile';
import firebase from '../Config'; 

const Tab = createMaterialBottomTabNavigator();

export default function Accueil(props) {
  const currentId = props.route.params.currentId;

  useEffect(() => {
    
    const ref_users = firebase.database().ref('users');
    const userRef = ref_users.child(currentId);

  
    userRef.child('Connected').set(true)
      .then(() => {
        console.log('Connected set to true for current user.');
      })
      .catch((error) => {
        console.error('Error setting Connected:', error);
      });

  
    return () => {
      userRef.child('Connected').set(false)
        .then(() => {
          console.log('Connected set to false for current user.');
        })
        .catch((error) => {
          console.error('Error setting Connected:', error);
        });
    };
  }, [currentId]);

  return (
    <Tab.Navigator shifting={true} barStyle={{ backgroundColor: '#E0F7FA' }}>
      <Tab.Screen
        name="Users"
        component={Users}
        initialParams={{ currentId }}
        options={{
          tabBarIcon: ({ focused, color }) => (
            <Ionicons
              name={focused ? 'people-circle' : 'people-circle-outline'}
              size={24}
              color={color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="MyGroups"
        component={MyGroups}
        options={{
          tabBarIcon: ({ focused, color }) => (
            <MaterialCommunityIcons
              name={focused ? 'account-group' : 'account-group-outline'}
              size={24}
              color={color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="MyProfile"
        component={MyProfile}
        initialParams={{ currentId }}
        options={{
          tabBarIcon: ({ focused, color }) => (
            <Ionicons
              name={focused ? 'person-circle' : 'person-circle-outline'}
              size={24}
              color={color}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

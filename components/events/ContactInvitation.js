import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, Alert } from 'react-native';
import * as Contacts from 'expo-contacts';
import * as Sharing from 'expo-sharing';

const ContactInvitation = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Function to request permission and fetch contacts
  const getContacts = async () => {
    const { status } = await Contacts.requestPermissionsAsync();

    if (status === 'granted') {
      const { data } = await Contacts.getContactsAsync({
        fields: [Contacts.Fields.Emails, Contacts.Fields.PhoneNumbers],
      });

      if (data.length > 0) {
        setContacts(data);
      } else {
        Alert.alert('No contacts found');
      }
    } else {
      Alert.alert('Permission denied');
    }
    setLoading(false);
  };

  // Function to check if contacts are in the app

  // Function to invite unregistered contacts
  const inviteUnregisteredContacts = async (unregisteredContacts) => {
    unregisteredContacts.forEach((contact) => {
      // You can use expo-sharing or another method to share an invite
      if (Sharing.isAvailableAsync()) {
        Sharing.shareAsync('Join our app using this link: https://app-link.com', {
          dialogTitle: `Invite ${contact.name}`,
        });
      }
    });
  };

  useEffect(() => {
    getContacts();
  }, []);

  return (
    <View style={{ flex: 1, padding: 20 }}>
      {loading ? (
        <Text>Loading Contacts...</Text>
      ) : (
        <FlatList
          data={contacts}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={{ marginVertical: 10 }}>
              <Text>{item.name}</Text>
              <Text>{item.phoneNumbers?.[0]?.number}</Text>
            </View>
          )}
        />
      )}
    </View>
  );
};

export default ContactInvitation;

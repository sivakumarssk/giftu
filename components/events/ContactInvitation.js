import React, { useState, useEffect } from 'react';
import { View, Text, Alert, SectionList } from 'react-native';
import * as Contacts from 'expo-contacts';
import * as Sharing from 'expo-sharing';
import useApiCalls from '../../api/useApiCalls';
import GuessList from './GuessList';
import { colors } from '../utills/colors';
import { useNavigation } from '@react-navigation/native';


const ContactInvitation = ({ selectedContacts, setSelectedContacts,addGuest,eventId }) => {

  const navigation =useNavigation()

  const { loading, apiError, setApiError, baseUrl, apiCall } = useApiCalls();
  const [contacts, setContacts] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [checkedContacts, setCheckedContacts] = useState({
    invitationSentList:[],
    registeredList: [],
    inviteList: []
  });

  // const [selectedContacts, setSelectedContacts] = useState([])

  // Function to request permission and fetch contacts
  const getContacts = async () => {
    const { status } = await Contacts.requestPermissionsAsync();

    if (status === 'granted') {
      const { data } = await Contacts.getContactsAsync({
        fields: [Contacts.Fields.PhoneNumbers],
      });

      const uniquePhoneNumbers = new Set();

      const validContacts = data
        .filter(contact =>
          contact.phoneNumbers &&
          contact.phoneNumbers.some(phone => phone.number.replace(/\D/g, '').length >= 10)
        )
        .map(contact => ({
          name: contact.name,
          phone: contact.phoneNumbers[0].number.replace(/\D/g, '').replace(/^91/, '')
        }))
        .filter(contact => {
          if (uniquePhoneNumbers.has(contact.phone)) {
            return false;
          }
          uniquePhoneNumbers.add(contact.phone);
          return true;
        });

      if (validContacts.length > 0) {
        setContacts(validContacts);
      } else {
        Alert.alert('No valid contacts found');
      }
    } else {
      Alert.alert('Permission denied');
    }
    setLoading(false);
  };

  // Function to invite unregistered contacts
  // const inviteUnregisteredContacts = async (unregisteredContacts) => {
  //   unregisteredContacts.forEach((contact) => {
  //     if (Sharing.isAvailableAsync()) {
  //       Sharing.shareAsync('Join our app using this link: https://app-link.com', {
  //         dialogTitle: `Invite ${contact.name}`,
  //       });
  //     }
  //   });
  // };

  const checkContacts = async () => {
    const formData = new FormData();
    formData.append('contacts', JSON.stringify(contacts));

    const response = await apiCall('post', addGuest ? `addGuests/${eventId}`:'checkContacts', formData);

    if (response) {
      // console.log(response,'res');

      setCheckedContacts({
        invitationSentList: response.invitationSentList || [],
        registeredList: response.registeredList || response.RegisteredList || [],
        inviteList: response.inviteList || response.InviteList|| [],
      });
    }
  };

  useEffect(() => {
    getContacts();
  }, []);

  useEffect(() => {
    if (contacts.length > 0) {
      checkContacts();
    }
  }, [contacts]);


  //  let customregisteredList = checkedContacts.registeredList.map((each)=>{
  //   return {...each,isSelected:false}
  //  })

  const onSelectContact = (id) => {
    setSelectedContacts(prevSelected => {
      const isSelected = prevSelected.some(each => each.selectedUserId === id);

      if (isSelected) {
        return prevSelected.filter(each => each.selectedUserId !== id);
      } else {
        const selectedCon = checkedContacts.registeredList.find(each => each.userId === id);
        if (!selectedCon) return prevSelected;

        const finalSelected = {
          selectedUserId: selectedCon.userId,
          contactName: selectedCon.name,
          contactNumber: selectedCon.phone
        };
        return [...prevSelected, finalSelected];
      }
    });
  };

  const handleRemove=async(id)=>{
    const response = await apiCall('delete',`removeInvitation/${eventId}/${id}`);

    if(response){
      console.log(response);
      
      navigation.goBack();
      navigation.navigate('EventDetails',{
        userevent:response
      })
    }
  }

  // console.log(checkedContacts);


  //  console.log(customregisteredList);

 const sections = [
    ...(addGuest ? [{ title: "Invited Contacts", data: checkedContacts.invitationSentList || [], invite: false, list:false,guest: true }] : []),
    { title: "Registered Contacts", data: checkedContacts.registeredList || [], invite: false, list: true,guest: false  },
    { title: "Invite Contacts", data: checkedContacts.inviteList || [], invite: true, list: false,guest: false },
  ];
  return (
    <View style={{ flex: 1, padding: 20 }}>
      {isLoading ? (
        <Text>Loading Contacts...</Text>
      ) : (
        <SectionList
          sections={sections}
          keyExtractor={(item, index) => item.phone + index}
          renderItem={({ item, section }) => (
            <GuessList
              image={section.invite ? require('../../assets/access/image.png') : { uri: `${baseUrl}${item.image}` }}
              name={item.name}
              invite={section.invite}
              list={section.list}
              contactId={item.userId}
              isSelected={selectedContacts.some(each => each.selectedUserId === item.userId)}
              onselectContact={onSelectContact}
              addGuest={section.guest}
              handleRemove={loading?'': handleRemove}
            />
          )}
          renderSectionHeader={({ section: { title } }) => (
            <Text style={{ fontWeight: 'bold', fontSize: 16, color: colors.nav }}>{title}</Text>
          )}
        />
      )}
    </View>
  );
};

export default ContactInvitation;

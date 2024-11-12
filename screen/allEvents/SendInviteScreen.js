import { StyleSheet, Text, View } from "react-native";
import ContactInvitation from "../../components/events/ContactInvitation";
import FormHead from "../../components/login-signup/FormHead";
import NavBack from "../../components/utills/NavBack";
import CustomButton from "../../components/onboard/CustomButton";
import Search from "../../components/home/Search";
import { useState } from "react";
import useApiCalls from "../../api/useApiCalls";

function SendInviteScreen({route,navigation}) {

    const eventId=route.params?.eventId

    const addGuest = route.params?.addGuest

    // console.log(eventId,'event');
    

    const { loading, apiError, setApiError, baseUrl, apiCall } = useApiCalls();

    const [selectedContacts, setSelectedContacts] = useState([])

    const handleSendInvite=async()=>{
        const formdata =new FormData()

        formdata.append('selectedContacts', JSON.stringify(selectedContacts))
        formdata.append('eventId',eventId)

        const response =await apiCall('post','sendInvitation',formdata)

        if(response){
            navigation.goBack()
            if(addGuest){
                navigation.navigate('EventDetails',{
                    userevent:response
                  })
            }
        }
    }

    return (
        <View style={styles.conMain}>
            <View style={styles.head}>
                <NavBack>New Event</NavBack>
            </View>

            {apiError && <View style={{ marginTop: 15 }}><Text style={{textAlign:'center',color:'red'}}>{apiError}</Text></View>}


            <View style={styles.searchCon}>
                <Search />
            </View>

            <ContactInvitation selectedContacts={selectedContacts}
                setSelectedContacts={setSelectedContacts} addGuest={addGuest} 
                eventId={eventId}/>

           {selectedContacts.length > 0 && <View style={styles.btn}>
                <CustomButton externalFunction={loading ? '' :handleSendInvite}
                >Send Invite</CustomButton>
            </View>}
        </View>
    )
}

export default SendInviteScreen


const styles = StyleSheet.create({
    conMain: {
        flex: 1,
        position: 'relative',
        marginTop: '15%',
        marginHorizontal: 10,
        maxWidth: '100%',
    },
    head: {
        gap: 10,
        marginHorizontal: '5%',
        // marginTop: 20,
        marginBottom: '5%'
    },
    searchCon: {
        marginHorizontal: '2%'
    },
    btn: {
        position: 'absolute',
        bottom: 10,
        width: '90%',
        alignSelf: 'center',
        // marginHorizontal:'5%',
        backgroundColor: 'transparent',
        paddingBottom: 25
    }
})
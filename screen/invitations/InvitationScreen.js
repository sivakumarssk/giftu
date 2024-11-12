import { StyleSheet, Text, View } from "react-native";
import NavBack from "../../components/utills/NavBack";
import { colors } from "../../components/utills/colors";
import EventsFlatlist from "../../components/home/EventsFlatlist";
import useApiCalls from "../../api/useApiCalls";
import { useCallback, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";

function InvitationScreen() {

    const [invitations, setInvitaions] = useState([])

    const { apiCall, loading, baseUrl, apiError } = useApiCalls()

    const handleInvitation = async () => {
        const response = await apiCall('get', 'getInvitagtion')
        if (response) {
            setInvitaions(response.events)
        }
    }

    useFocusEffect(
        useCallback(() => {
            handleInvitation()
        }, [])
    );

    return (
        <View style={styles.invitationMainCon}>
            <NavBack icon={false}>All Invitation</NavBack>

            <View style={styles.infoClickCon}>
                <Text style={styles.infoClickText}>Click to View Wish List</Text>
            </View>

            <View style={{ flex: 1 }}>
                <EventsFlatlist data={invitations} baseUrl={baseUrl}  
                    route={{direction:'InvitationEventDetials', paraName:'invitaion',value:invitations}}/>
            </View>
        </View>
    )
}

export default InvitationScreen


const styles = StyleSheet.create({
    invitationMainCon: {
        flex: 1,
        marginTop: '15%',
        marginHorizontal: '5%',
    },
    infoClickCon: {
        marginVertical: 20,
        marginHorizontal: 10
    },
    infoClickText: {
        fontSize: 14,
        fontWeight: '600',
        fontFamily: 'Manrope-semiBold',
        color: colors.nav
    },
})
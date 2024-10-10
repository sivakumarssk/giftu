import { StyleSheet, Text, View } from "react-native";
import NavBack from "../../components/utills/NavBack";
import { colors } from "../../components/utills/colors";
import EventsFlatlist from "../../components/home/EventsFlatlist";

function InvitationScreen(){

    const dummydata = [
        { id: 1, Image: require('../../assets/dummt/event1.png')  },
        { id: 2, Image: require('../../assets/dummt/event2.png') },
        { id: 3, Image: require('../../assets/dummt/event3.png') },
        { id: 4, Image: require('../../assets/dummt/draftEvent1.png') },
    ]

    return(
        <View style={styles.invitationMainCon}>
            <NavBack icon={false}>All Invitation</NavBack>
            
            <View style={styles.infoClickCon}>
                <Text style={styles.infoClickText}>Click to View Wish List</Text>
            </View>

            <View style={{flex:1}}>
                <EventsFlatlist data={dummydata} direction={'InvitationWishlist'}/>
            </View>
        </View>
    )
}

export default InvitationScreen


const styles=StyleSheet.create({
    invitationMainCon:{
        flex:1,
        marginTop:'15%',
        marginHorizontal:'5%',
    },
    infoClickCon:{
        marginVertical:20,
        marginHorizontal:10
    },
    infoClickText:{
        fontSize:14,
        fontWeight:'600',
        fontFamily:'Manrope-semiBold',
        color:colors.nav
    },
})
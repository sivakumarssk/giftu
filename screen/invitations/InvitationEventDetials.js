import { Linking, Pressable, StyleSheet, Text, View } from "react-native";
import NavBack from "../../components/utills/NavBack";
import { colors } from "../../components/utills/colors";
import CustomButton from "../../components/onboard/CustomButton";

function InvitationEventDetials({route, navigation}) {

    const invitaion= route.params.invitaion

    const utcDate = new Date(invitaion.date);

    const istOffset = 5.5 * 60 * 60 * 1000; 
    const istDate = new Date(utcDate.getTime() + istOffset);
    
   
    const formattedDate = istDate.toLocaleDateString('en-IN', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      });
      
      const formattedTime = istDate.toLocaleTimeString('en-IN', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      });
    
    // console.log('Date and Time in Indian Format:', formattedDate,formattedTime);

    const link =(url='')=>{
        Linking.openURL(url)
    }


    const handleBtn=()=>{
        // route={{direction:'InvitationWishlist', paraName:'invitaion',value:invitations}}
        navigation.navigate('InvitationWishlist',{
            invitaion: invitaion
        })
    }

    return (
        <View style={styles.invitationDetialsCon}>
            <NavBack>Event Detials</NavBack>

            <View style={styles.dataMainCon}>
                <View style={styles.titleCon}>
                    <Text style={styles.titleText}>Event :</Text>
                    <Text style={styles.titleText}>Name :</Text>
                    <Text style={styles.titleText}>Venue :</Text>
                    <Text style={styles.titleText}>Date :</Text>
                    <Text style={styles.titleText}>Time :</Text>
                    <Text style={styles.titleText}>Address :</Text>
                    <Text style={styles.titleText}>Location :</Text>
                </View>
                <View style={styles.valueCon}>
                    <Text style={styles.valueText}>{invitaion.category}</Text>
                    <Text style={styles.valueText}>{invitaion.name}</Text>
                    <Text style={styles.valueText}>{invitaion.venue}</Text>
                    <Text style={styles.valueText}>{formattedDate}</Text>
                    <Text style={styles.valueText}>{formattedTime}</Text>
                    <Text style={styles.valueText}>{invitaion.address}</Text>
                    <Pressable onPress={()=>link(invitaion.location)}>
                    <Text style={[styles.valueText,styles.link]}>{invitaion.location}</Text>
                    </Pressable>
                </View>
            </View>

            <CustomButton  externalFunction={handleBtn}
            >Buy a Gift</CustomButton>
        </View>
    )
}

export default InvitationEventDetials


const styles = StyleSheet.create({
    invitationDetialsCon: {
        flex: 1,
        marginTop: '15%',
        marginHorizontal: '5%',
    },
    dataMainCon:{
        flexDirection:'row',
        marginVertical:40,
        borderWidth:1,
        borderColor:colors.primary,
        borderRadius:10,
        padding:10,
        paddingHorizontal:15,
        gap:20,
        // maxWidth:'95%'
    },
    titleCon:{
        gap:20,
    },
    titleText:{
        fontSize:14,
        fontWeight:'600'
    },
    valueCon:{
        gap:20,
        flexShrink:1
    },
    valueText:{
        fontSize:14,
        fontWeight:'400'
    },
    link:{
        color:'blue',
        // textDecorationLine:'underline'
    }
})
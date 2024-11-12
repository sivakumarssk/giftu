import { Image, StyleSheet, Text, View } from "react-native";
import NavBack from "../../components/utills/NavBack";
import PressableItem from "../../components/utills/PressableItem";
import { colors } from "../../components/utills/colors";
import ColFaltlist from "../../components/utills/ColFaltlist";
import LoadingScreen from "../../components/utills/LoadingScreen";
import WishlistName from "../../components/Wishlist/WishlistName";
import { useEffect, useState } from "react";
import PurchaseItem from "./PurchaseItem";

function InvitationWishlist({route}) {

    const paramsinvitaion=route.params?.invitaion    

    // console.log(paramsinvitaion);
    
    const [invitaion,setInvitaion]=useState(paramsinvitaion)
    const[popUp,setPopUp]=useState(false)
    const [invitationId,setInvitationId] = useState('')
    const [singleInvitation,setSingleInvitation] = useState('')

    // console.log(invitationId);

    useEffect(()=>{
        if(invitationId){
            const singleInvitation = invitaion?.wishlist.find((each)=>each._id === invitationId)
            setSingleInvitation(singleInvitation)
        }
    },[invitationId])
    

    return (
        <View style={styles.wishitemsMainCon}>
            <View style={styles.wishitemsMain}>

            <NavBack >Wish List Items</NavBack>

            <View style={styles.itemCon}>
                <View style={styles.eventitemNameCon}>
                    <Text style={styles.eventitemName} numberOfLines={1} ellipsizeMode="tail"
                    >{ `${invitaion?.name} ${invitaion?.category}` }</Text>
                </View>
            </View>
            </View>

            <View style={styles.itemlist}>
                <ColFaltlist renderData={invitaion?.wishlist} isroute={true}
                externalFunction={()=>setPopUp(true)} setInvitationId ={setInvitationId}/>
            </View>

            <View>
                {popUp && <PurchaseItem setPopUp={setPopUp} invitaion={invitaion}
                 singleInvitation={singleInvitation} setInvitaion={setInvitaion}/> }
            </View>

        </View>
    )
}

export default InvitationWishlist


const styles = StyleSheet.create({
    wishitemsMainCon:{
        flex:1,
    },
    wishitemsMain: {
        marginHorizontal: '5%',
        marginTop: '15%',
    },
    itemCon: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: '10%'
    },
    eventitemNameCon: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        flexShrink:1,
        // maxWidth: '55%',
        // overflow:'scroll' 
    },
    eventitemName: {
        fontSize: 28,
        fontWeight: '600',
        color: colors.blue,
        fontFamily: 'Manrope-semiBold'
    },
    itemlist:{
        flex:1,
    },
})
import { Image, StyleSheet, Text, View } from "react-native";
import NavBack from "../../components/utills/NavBack";
import PressableItem from "../../components/utills/PressableItem";
import { colors } from "../../components/utills/colors";
import ColFaltlist from "../../components/utills/ColFaltlist";
import LoadingScreen from "../../components/utills/LoadingScreen";
import WishlistName from "../../components/Wishlist/WishlistName";
import { useState } from "react";
import PurchaseItem from "./PurchaseItem";

function InvitationWishlist({route}) {

    const wishListName=route.params?.wishListName    

    const[popUp,setPopUp]=useState(false)

    const dummydata = [
        { id: 1, Image: require('../../assets/dummt/w1.jpeg'), purched:true,},
        { id: 2, Image: require('../../assets/dummt/w2.jpeg'), link: 'https://www.google.com/', },
        { id: 3, Image: require('../../assets/dummt/w3.jpeg'), link: 'https://www.google.com/',},
        { id: 11, Image: require('../../assets/dummt/w1.jpeg'), link: 'https://www.google.com/',},
        { id: 21, Image: require('../../assets/dummt/w2.jpeg'), link: 'https://www.google.com/', },
        { id: 31, Image: require('../../assets/dummt/w3.jpeg'), link: 'https://www.google.com/',},
        { id: 12, Image: require('../../assets/dummt/w1.jpeg'), link: 'https://www.google.com/',},
        { id: 22, Image: require('../../assets/dummt/w2.jpeg'), link: 'https://www.google.com/', },
        { id: 32, Image: require('../../assets/dummt/w3.jpeg'), link: 'https://www.google.com/',},
        { id: 13, Image: require('../../assets/dummt/w1.jpeg'), link: 'https://www.google.com/',},
        { id: 23, Image: require('../../assets/dummt/w2.jpeg'), link: 'https://www.google.com/', },
        { id: 33, Image: require('../../assets/dummt/w3.jpeg'), link: 'https://www.google.com/',},
    ];

    return (
        <View style={styles.wishitemsMainCon}>
            <View style={styles.wishitemsMain}>

            <NavBack direction={'WishlistScreen'}>Wish List Items</NavBack>

            <View style={styles.itemCon}>
                <View style={styles.eventitemNameCon}>
                    <Text style={styles.eventitemName}>{wishListName ? wishListName :'Birthday'}</Text>
                </View>
            </View>
            </View>

            <View style={styles.itemlist}>
                <ColFaltlist renderData={dummydata} externalFunction={()=>setPopUp(true)}/>
            </View>

            <View>
                {popUp && <PurchaseItem setPopUp={setPopUp}/> }
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
        maxWidth: '55%',
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
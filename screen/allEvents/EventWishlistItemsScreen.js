import { Image, StyleSheet, Text, View } from "react-native";
import NavBack from "../../components/utills/NavBack";
import PressableItem from "../../components/utills/PressableItem";
import { colors } from "../../components/utills/colors";
import ColFaltlist from "../../components/utills/ColFaltlist";
import LoadingScreen from "../../components/utills/LoadingScreen";
import WishlistName from "../../components/Wishlist/WishlistName";
import { useState } from "react";
import useApiCalls from "../../api/useApiCalls";

function EventWishlistItemsScreen({route}) {

    // const wishlistName=route.params?.wishlistName
    const event = route.params?.event 
    const wishlistitem= event?.wishlist
    
    // console.log(event);
    

    // const { loading,apiError,baseUrl,apiCall,setApiError } = useApiCalls()


    return (
        <View style={styles.wishitemsMainCon}>
            <View style={styles.wishitemsMain}>

            <NavBack direction={'WishlistScreen'}>Wish List Items</NavBack>

            <View style={styles.itemCon}>
                <View style={styles.eventitemNameCon}>
                    <Text style={styles.eventitemName}>{event?.wishlistName}</Text>
                    {/* <PressableItem externalFunction={()=>setPopUp(true)}>
                        <Image source={require('../../assets/wishlist/editpen.png')}
                            style={styles.itemnameEditImage} />
                    </PressableItem> */}
                </View>

                <PressableItem 
                 route={{dir:'AddItemScreen',paraName:'userevent', value:event}}>
                    <View style={styles.addItemCon}>
                        <Text style={styles.addItemText}>Add Item</Text>
                        <Image source={require('../../assets/wishlist/plus.png')}
                            style={styles.plus} />
                    </View>
                </PressableItem>
            </View>
            </View>

            <View style={styles.itemlist}>
                <ColFaltlist renderData={wishlistitem} edit={true} paraName={'userevent'} exwishlist={event}/>
            </View>

        </View>
    )
}

export default EventWishlistItemsScreen


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
    itemnameEditImage: {
        marginTop: 15,
        width: 22,
        height: 22,
    },
    addItemCon: {
        flexDirection: 'row',
        alignItems:'center',
        gap:5,
    },
    addItemText: {
        fontSize: 18,
        fontWeight: '600',
        color: colors.primary,
        fontFamily: 'Manrope-semiBold'
    },
    plus: {
        marginTop:5,
        width: 16,
        height: 16,
    },
    itemlist:{
        flex:1,
    },
})
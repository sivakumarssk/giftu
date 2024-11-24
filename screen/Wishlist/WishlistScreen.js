import React, { useCallback, useEffect, useState } from "react";
import { FlatList, Image, Text, View, StyleSheet, TouchableWithoutFeedback, Keyboard } from "react-native";
import NavBack from "../../components/utills/NavBack";
import ColFaltlist from "../../components/utills/ColFaltlist";
import WishlistName from "../../components/Wishlist/WishlistName";
import useApiCalls from "../../api/useApiCalls";
import { useFocusEffect } from "@react-navigation/native";

function WishlistScreen() {

<<<<<<< HEAD
    const [popUp,setPopUp]=useState(false)

    const [wishlist,setWishlist]=useState('')

    const { loading, apiError, setApiError, apiCall } = useApiCalls()

    const getWishlist =async()=>{
        const response =await apiCall('get','getWishlist')

        if(response){
=======
    const [popUp, setPopUp] = useState(false)

    const [wishlist, setWishlist] = useState([])

    const { loading, apiError, setApiError, apiCall } = useApiCalls()

    const getWishlist = async () => {
        const response = await apiCall('get', 'getWishlist')

        if (response) {
            console.log(response);
>>>>>>> 13d87f0 (Describe)
            setWishlist(response)
        }
    }

    useFocusEffect(
        useCallback(() => {
            getWishlist();
        }, [])
    );

<<<<<<< HEAD
    const staticImage = { id: 0, Image: require('../../assets/wishlist/create.png'), 
        link: '', isStatic: true,tag:'Create New Wish List' };
=======
    const staticImage = {
        id: 0, Image: require('../../assets/wishlist/create.png'),
        link: '', isStatic: true, tag: 'Create New Wish List'
    };

>>>>>>> 13d87f0 (Describe)

    // Combine the static image with dynamic data
    let combinedData = [staticImage, ...wishlist];

    return (
<<<<<<< HEAD
            // <TouchableWithoutFeedback onPress={Keyboard.dismiss()}>
=======
        // <TouchableWithoutFeedback onPress={Keyboard.dismiss()}>
>>>>>>> 13d87f0 (Describe)
        <View style={styles.wishlistMainCon}>
            <View style={styles.wishlistTextCon}>
                <NavBack icon={false}>Wishlist</NavBack>
            </View>

            <View>
                <ColFaltlist renderData={combinedData} setPopUp={setPopUp}
<<<<<<< HEAD
                imageClickDir={'WishlistItemsScreen'}/>
            </View>
            {popUp && <WishlistName setPopUp={setPopUp} endPoint={'addWishlist'}/>}
=======
                    imageClickDir={'WishlistItemsScreen'} />
            </View>
            {popUp && <WishlistName setPopUp={setPopUp} endPoint={'addWishlist'} />}
>>>>>>> 13d87f0 (Describe)
        </View>
        // </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
<<<<<<< HEAD
    wishlistMainCon:{
        flex:1,
    },
    wishlistTextCon:{
        marginTop:'15%',
        marginBottom:'5%',
        marginHorizontal:'5%'
    },
    wishlistText:{
        fontSize:18,
        fontWeight:'600',
        fontFamily:'Manrope-semiBold'
=======
    wishlistMainCon: {
        flex: 1,
    },
    wishlistTextCon: {
        marginTop: '15%',
        marginBottom: '5%',
        marginHorizontal: '5%'
    },
    wishlistText: {
        fontSize: 18,
        fontWeight: '600',
        fontFamily: 'Manrope-semiBold'
>>>>>>> 13d87f0 (Describe)
    },
    item: {
        flex: 1,
        margin: 10,
        height: 150,
<<<<<<< HEAD
        color:'#140301CC'
=======
        color: '#140301CC'
>>>>>>> 13d87f0 (Describe)
    },
    staticImage: {
        borderWidth: 2,
        borderColor: 'red', // Example of different styling
    },
    dynamicImage: {
        borderWidth: 1,
        borderColor: 'blue', // Example of different styling
    },
    placeholder: {
        backgroundColor: 'transparent',
    },
});

export default WishlistScreen;

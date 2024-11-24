import React, { useCallback, useEffect, useState } from "react";
import { FlatList, Image, Text, View, StyleSheet, TouchableWithoutFeedback, Keyboard } from "react-native";
import NavBack from "../../components/utills/NavBack";
import ColFaltlist from "../../components/utills/ColFaltlist";
import WishlistName from "../../components/Wishlist/WishlistName";
import useApiCalls from "../../api/useApiCalls";
import { useFocusEffect } from "@react-navigation/native";

function WishlistScreen() {

    const [popUp, setPopUp] = useState(false)

    const [wishlist, setWishlist] = useState([])

    const { loading, apiError, setApiError, apiCall } = useApiCalls()

    const getWishlist = async () => {
        const response = await apiCall('get', 'getWishlist')

        if (response) {
            console.log(response);
            setWishlist(response)
        }
    }

    useFocusEffect(
        useCallback(() => {
            getWishlist();
        }, [])
    );

    const staticImage = {
        id: 0, Image: require('../../assets/wishlist/create.png'),
        link: '', isStatic: true, tag: 'Create New Wish List'
    };


    // Combine the static image with dynamic data
    let combinedData = [staticImage, ...wishlist];

    return (
        // <TouchableWithoutFeedback onPress={Keyboard.dismiss()}>
        <View style={styles.wishlistMainCon}>
            <View style={styles.wishlistTextCon}>
                <NavBack icon={false}>Wishlist</NavBack>
            </View>

            <View>
                <ColFaltlist renderData={combinedData} setPopUp={setPopUp}
                    imageClickDir={'WishlistItemsScreen'} />
            </View>
            {popUp && <WishlistName setPopUp={setPopUp} endPoint={'addWishlist'} />}
        </View>
        // </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
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
    },
    item: {
        flex: 1,
        margin: 10,
        height: 150,
        color: '#140301CC'
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

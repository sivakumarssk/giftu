import React, { useState } from "react";
import { FlatList, Image, Text, View, StyleSheet, TouchableWithoutFeedback, Keyboard } from "react-native";
import NavBack from "../../components/utills/NavBack";
import ColFaltlist from "../../components/utills/ColFaltlist";
import WishlistName from "../../components/Wishlist/WishlistName";

function WishlistScreen() {

    const [popUp,setPopUp]=useState(false)

    const staticImage = { id: 0, Image: require('../../assets/wishlist/create.png'), 
        link: '', isStatic: true,tag:'Create New Wish List' };

    const dummydata = [
        { id: 1, Image: require('../../assets/dummt/w1.jpeg'), link: 'https://www.google.com/',tag:'Birthyday' },
        { id: 2, Image: require('../../assets/dummt/w2.jpeg'), link: 'https://www.google.com/',tag:'Anniversary'  },
        { id: 3, Image: require('../../assets/dummt/w3.jpeg'), link: 'https://www.google.com/',tag:'Engagement'  },
    ];

    // Combine the static image with dynamic data
    let combinedData = [staticImage, ...dummydata];

    return (
            // <TouchableWithoutFeedback onPress={Keyboard.dismiss()}>
        <View style={styles.wishlistMainCon}>
            <View style={styles.wishlistTextCon}>
                <NavBack icon={false}>Wishlist</NavBack>
            </View>

            <View>
                <ColFaltlist renderData={combinedData} setPopUp={setPopUp}
                imageClickDir={'WishlistItemsScreen'}/>
            </View>
            {popUp && <WishlistName setPopUp={setPopUp}/>}
        </View>
        // </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
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
    },
    item: {
        flex: 1,
        margin: 10,
        height: 150,
        color:'#140301CC'
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

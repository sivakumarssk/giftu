import { Keyboard, KeyboardAvoidingView, Modal, Platform, ScrollView, StyleSheet, Text, TouchableWithoutFeedback, View } from "react-native";
import FormHead from "../login-signup/FormHead";
import { useEffect, useState } from "react";
import InputCom from "../login-signup/InputCom";
import CustomButton from "../onboard/CustomButton";
import { colors } from "../utills/colors";
import PressableItem from "../utills/PressableItem";
import { useNavigation } from "@react-navigation/native";
import useApiCalls from "../../api/useApiCalls";


function WishlistName({ setPopUp, update, endPoint, upwishlist }) {

    const navigation = useNavigation()

    const { loading, apiError, setApiError, apiCall } = useApiCalls()

    const [listName, setListName] = useState('')

    // console.log(listName);

    

    useEffect(()=>{
        if(upwishlist){
            setListName(upwishlist.name)
        }
    },[upwishlist])


    const validateName = () => {
        if (!listName) {
            setApiError('Wishlist Name is Required')
            return false
        } else {
            return true
        }

    }


    const handleCreateName = async () => {
        if (validateName()) {

            const formData =new FormData()
            
            formData.append('name', listName )

            if(upwishlist){

                const response = await apiCall('patch',`${endPoint}/${upwishlist._id}`,formData)
                
                if (response) {
                    // setListName(listName)
                    setPopUp(false)
                    navigation.navigate('WishlistItemsScreen', {
                        wishlist: response.updatedWishlist
                    })
                }
            }else {
                const response = await apiCall('post', endPoint, formData)
                if (response) {
                    setPopUp(false)
                    navigation.navigate('WishlistItemsScreen', {
                        wishlist: response.wishlist
                    })
                }
            }
        }
    }


    const handleDlete=async()=>{
        const response  =await apiCall('delete',`deleteWishlist/${upwishlist._id}`)

        if (response) {
            setPopUp(false)
            navigation.navigate('WishlistScreen')
        }
    }

    return (
        <Modal transparent={true}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false} style={{ flex: 1 }}>
                <View style={styles.modalStyle}>
                    <View style={styles.titleCon}>
                        <PressableItem externalFunction={() => setPopUp(false)} extraStyles={styles.extra}>
                            <Text style={styles.cross}>✕</Text>
                        </PressableItem>
                        <View style={styles.nameCon}>
                            <Text style={styles.head}>Enter the Name of the Wishlist</Text>

                            {apiError && <View >
                                <Text style={{ textAlign: 'center', color: 'red' }}>{apiError}</Text>
                            </View>}


                            <InputCom
                                label={'Name'}
                                value={listName}
                                onChangeText={(value) => { setListName(value); setApiError('') }}
                                maxLength={12}
                            />

                            <View>
                                <CustomButton
                                    externalFunction={loading ? '' : handleCreateName}
                                    background={colors.primary}
                                >
                                    {update ? 'Update' : 'Continue'}
                                </CustomButton>

                                {update && <CustomButton background="transparent" color="blue"
                                externalFunction={loading ? '' : handleDlete}
                                >Delete Item</CustomButton>}

                            </View>
                        </View>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    )
}

export default WishlistName


const styles = StyleSheet.create({
    modalStyle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
    },
    titleCon: {
        backgroundColor: 'white',
        marginHorizontal: 15,
        paddingHorizontal: 20,
        paddingTop: 15,
        borderRadius: 8,
    },
    nameCon: {
        // paddingTop: 10,
        paddingBottom: 30,
        gap: 20,
        // overflow:'hidden'
    },
    extra: {
        width: 35,
        padding: 5,
        alignSelf: 'flex-end',
        // backgroundColor:'yellow',
    },
    cross: {

        // backgroundColor:'yellow',
        fontSize: 18,
        fontWeight: '800',
        fontFamily: 'Manrope-semiBold',
        textAlign: 'right',

    },
    head: {
        fontSize: 14,
        fontWeight: '600',
        fontFamily: 'Manrope-semiBold',
        textAlign: 'center'
    }
})
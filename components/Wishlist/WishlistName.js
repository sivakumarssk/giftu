import { Keyboard, KeyboardAvoidingView, Modal, Platform, ScrollView, StyleSheet, Text, TouchableWithoutFeedback, View } from "react-native";
import FormHead from "../login-signup/FormHead";
import { useState } from "react";
import InputCom from "../login-signup/InputCom";
import CustomButton from "../onboard/CustomButton";
import { colors } from "../utills/colors";
import PressableItem from "../utills/PressableItem";
import { useNavigation } from "@react-navigation/native";


function WishlistName({ setPopUp, update }) {

    const navigation = useNavigation()

    const [listName, setListName] = useState('')

    // console.log(listName);

    const validateName = () => {

        if (listName !== '') {
            setPopUp(false)
            navigation.navigate('WishlistItemsScreen', {
                wishListName: listName
            })
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

                                <InputCom
                                    label={'Name'}
                                    value={listName}
                                    onChangeText={setListName}
                                />

                                <CustomButton
                                    externalFunction={validateName}
                                    background={colors.primary}
                                >
                                    {update?'Update':'Continue'}
                                </CustomButton>
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
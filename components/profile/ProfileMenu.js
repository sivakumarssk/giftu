import { Image, StyleSheet, Text, View } from "react-native";
import PressableItem from "../utills/PressableItem";

function ProfileMenu({ children, image, externalStyles,direction,externalFunction }) {
    return (
        <PressableItem direction={direction} externalFunction={externalFunction}>
                <View style={[styles.menuMainCon, externalStyles]}>
                <Image source={image} style={styles.menuImg} />
                <Text style={styles.menuText}>{children}</Text>
        </View>
            </PressableItem>

    )
}

export default ProfileMenu

const styles = StyleSheet.create({

    menuMainCon: {
        // backgroundColor:'yellow',
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 20,
        gap: 20
    },
    menuImg: {
        width: 18,
        height: 18
    },
    menuText: {
        fontSize: 16,
        fontWeight: '400',
        fontFamily: 'Manrope-Medium'
    },
})
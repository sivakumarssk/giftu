import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { colors } from "../utills/colors";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "react-native/Libraries/NewAppScreen";

function GuessList({ image, name, status, invite = false, list = false, contactId, isSelected,
    onselectContact, addGuest = false,handleRemove }) {

    return (
        <View style={styles.guestCon}>

            <View style={styles.imageAndNameCon}>
                <View style={styles.profileCon}>
                    <Image source={image} style={styles.profileImg} />
                </View>
                <View style={styles.nameTextCon}>
                    <Text style={styles.nameText} numberOfLines={1} ellipsizeMode="tail">
                        {name}
                    </Text>
                </View>
            </View>

            {invite ? (
                <View style={styles.textCon}>
                    <Text style={[styles.statusText, { color: 'blue' }]}>Invite To App</Text>
                </View>
            ) : list ? (
                <View style={styles.textCon}>
                    <Pressable onPress={() => onselectContact(contactId)}>
                        {!isSelected ? (<View style={styles.circleImgCon}>
                            <Image source={require('../../assets/access/circle.png')}
                                style={styles.circleImg} />
                        </View>) : (
                            <Ionicons name="checkmark-circle-outline" size={29} />
                        )}
                    </Pressable>
                </View>
            ) : addGuest ? (
                <View style={styles.textCon}>
                    <Pressable onPress={()=>handleRemove ? handleRemove(contactId) : ''}>
                        <Text style={[styles.statusText, {
                            color: colors.primary,
                            fontSize: 16,
                        }]}>Remove</Text>
                    </Pressable>
                </View>
            ) : (
                <View style={styles.textCon}>
                    <Text style={[
                        styles.statusText,
                        status === 'Attending' ? { color: '#2A9C02' } :
                            status === 'Not Attending' ? { color: '#CB1E25' } :
                                { color: '#FFA800' }
                    ]}>
                        {status}
                    </Text>
                </View>
            )}
        </View>
    );
}

export default GuessList;

const styles = StyleSheet.create({
    guestCon: {
        flexDirection: 'row',
        marginVertical: 10,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    imageAndNameCon: {
        flexDirection: 'row',
        flex: 1,
        alignItems: 'center',
    },
    profileCon: {
        width: 40,
        height: 40,
        borderRadius: 500,
        overflow: 'hidden',
    },
    profileImg: {
        resizeMode: 'cover',
        width: '100%',
        height: '100%',
    },
    circleImgCon: {
        width: 26,
        height: 26
    },
    circleImg: {
        resizeMode: 'cover',
        width: '100%',
        height: '100%'
    },
    textCon: {
        justifyContent: "center",
        alignItems: 'center',
        marginRight: 15,
    },
    nameTextCon: {
        flexShrink: 1,
        marginHorizontal: 15,
    },
    nameText: {
        textAlign: 'left',
        fontSize: 16,
        fontWeight: '600',
        fontFamily: "Manrope-semiBold",
        color: colors.nav,
    },
    statusText: {
        textAlign: 'right',
    }
});

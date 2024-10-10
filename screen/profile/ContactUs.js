import { FlatList, Linking, StyleSheet, Text, View } from "react-native";
import NavBack from "../../components/utills/NavBack";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../components/utills/colors";
import PressableItem from "../../components/utills/PressableItem";


const contactData = [
    { id: 1, iconName: 'headset-outline', name: 'Customer Services', url: 'tel:+919948740433' },
    { id: 2, iconName: 'logo-whatsapp', name: 'WhatsApp', url: 'https://wa.me/+919948740733' },
    { id: 3, iconName: 'globe-outline', name: 'Website', url: 'https://www.google.com/' },
    { id: 4, iconName: 'logo-facebook', name: 'Facebook', url: 'https://www.facebook.com' },
    { id: 5, iconName: 'logo-instagram', name: 'Instagram', url: 'https://www.instagram.com/' },
]

function ContactUs() {
    return (
        <View style={styles.contactUsCon}>
            <NavBack>Contact Us</NavBack>

            <View style={styles.subConContact}>
                <FlatList data={contactData}
                    renderItem={(itemData) => {
                        return (
                            <PressableItem externalFunction={()=>Linking.openURL(itemData.item.url)}>
                                <View style={styles.contCon}>
                                    <Ionicons name={itemData.item.iconName} size={24}
                                        color={colors.primary} />
                                    <Text style={styles.nameContact}>{itemData.item.name}</Text>
                                </View>
                            </PressableItem>
                        )
                    }} />
            </View>

        </View>
    )
}

export default ContactUs

const styles = StyleSheet.create({
    contactUsCon: {
        flex: 1,
        marginTop: '15%',
        marginHorizontal: '5%'
    },
    subConContact: {
        marginTop: '5%',
    },
    contCon: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 20,
        backgroundColor: '#F8F8F8',
        borderRadius: 500,
        paddingVertical: 12,
        paddingLeft: 15,
        marginVertical: 18,
        marginHorizontal: 5,
        elevation: 4,

        shadowColor: 'black',
        shadowOpacity: 0.25,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 2 },
    },
    nameContact: {
        fontSize: 16,
        fontWeight: '600',
        fontFamily: 'Manrope-semiBold'
    }
})
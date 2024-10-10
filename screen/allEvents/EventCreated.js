import { Image, ImageBackground, StyleSheet, Text, View } from "react-native"
import { colors } from "../../components/utills/colors"
import PressableItem from "../../components/utills/PressableItem"
import { Ionicons } from "@expo/vector-icons"
import CustomButton from "../../components/onboard/CustomButton"

function EventCreated() {
    return (
        <View style={styles.createdMain}>

            <View style={styles.gifboxCon}>
                <Image source={require('../../assets/createEvents/sucessEvent.gif')}
                    style={styles.gifbox} />
            </View>

            <View style={styles.textSuCon}>
                <Text style={styles.textSu}>Event Created Successfully !</Text>
            </View>

            <View style={styles.eventCon}>
                <View style={styles.eventSubCon}>
                        <PressableItem>
                    <ImageBackground source={require('../../assets/createEvents/birthday.jpeg')} style={styles.eventImg}>
                            <View style={styles.viewStyles}>
                            <Text style={styles.text}>View Wishlist  {'>>'}</Text>
                            </View>
                    </ImageBackground>
                        </PressableItem>
                </View>
            </View>

            <View style={styles.btnInvite}>
                <CustomButton>Send Invite Message to Guest</CustomButton>
            </View>

        </View>
    )
}

export default EventCreated


const styles = StyleSheet.create({
    createdMain: {
        flex: 1,
        marginTop: '15%',
        marginHorizontal:'5%'
    },
    gifboxCon: {
        justifyContent: 'center',
        alignItems: "center",
    },
    gifbox: {
        width: 180,
        height: 180
    },
    textSuCon: {
        marginVertical: 20
    },
    textSu: {
        textAlign: 'center',
        fontSize: 18,
        fontWeight: "800",
        color: colors.primary
    },
    eventCon: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    eventSubCon: {
        marginTop: 10,
        width: '100%',
        height: 170,
        borderRadius: 8,
        elevation: 4,
        shadowColor:'black',
        shadowOpacity:0.25,
        shadowRadius:8,
        shadowOffset:{width:0,height:2},
        backgroundColor: 'white',
        overflow: 'hidden'
    },
    eventImg: {
        width: '100%',
        height: '100%',
    },
    viewStyles:{
        marginHorizontal:'10%',
        marginVertical:'15%',
        // justifyContent:'center',
        // alignItems:'center'
    },
    text:{
        fontSize:14,
        fontWeight:'700',
        fontFamily:'Manrope-semiBold'
    },
    btnInvite:{
        marginVertical:30
    }
})
import { Image, ImageBackground, StyleSheet, Text, View } from "react-native"
import { colors } from "../../components/utills/colors"
import PressableItem from "../../components/utills/PressableItem"
import { Ionicons } from "@expo/vector-icons"
import CustomButton from "../../components/onboard/CustomButton"
import useApiCalls from "../../api/useApiCalls"

function EventCreated({route,navigation}) {

    const userevent =route.params?.userevent

    // console.log(userevent);

    const { baseUrl } =useApiCalls()

    const handleBtn=()=>{
        navigation.replace('SendInviteScreen',{
            eventId:userevent._id
        })
    }
    

    return (
        <View style={styles.createdMain}>

            <View style={styles.gifboxCon}>
                <Image source={require('../../assets/access/sucessEvent.gif')}
                    style={styles.gifbox} />
            </View>

            <View style={styles.textSuCon}>
                <Text style={styles.textSu}>Event Created Successfully !</Text>
            </View>

            <View style={styles.eventCon}>
                <View style={styles.eventSubCon}>
                        <PressableItem>
                    <ImageBackground source={{uri:`${baseUrl}${userevent?.image}`}} 
                    resizeMode="stretch" style={styles.eventImg}>
                    </ImageBackground>
                        </PressableItem>
                </View>

                <View style={styles.viewStyles}>
                <View style={styles.nameTextCon}>
                        <Text style={styles.eventName}  numberOfLines={1} ellipsizeMode="tail"
                        >{userevent.category}</Text>
                    </View>
                            <PressableItem 
                        externalFunction={()=>navigation.navigate('EventWishlistItemsScreen',{
                            event:userevent,
                            // wishlistName:userevent.wishlistName,
                        })}>

                            <Text style={styles.text}>View Wishlist  {'>>'}</Text>
                        </PressableItem>
                </View>
            </View>

            <View style={styles.btnInvite}>
                <CustomButton
                externalFunction={handleBtn}
                >Send Invite Message to Guest</CustomButton>
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
        marginTop: 10,
        justifyContent: 'center',
        // alignItems: 'center',
        borderRadius: 8,
        elevation: 4,
        shadowColor:'black',
        shadowOpacity:0.25,
        shadowRadius:8,
        shadowOffset:{width:0,height:2},
        backgroundColor: 'white',
        overflow: 'hidden'
    },
    eventSubCon: {
        width: '100%',
        height: 170,
        // borderRadius: 8,
        // elevation: 4,
        // shadowColor:'black',
        // shadowOpacity:0.25,
        // shadowRadius:8,
        // shadowOffset:{width:0,height:2},
        // backgroundColor: 'white',
        // overflow: 'hidden'
    },
    eventImg: {
        width: '100%',
        height: '100%',
    },
    viewStyles:{
        flexDirection:'row',
        justifyContent:'space-between',
        padding:10,
        paddingBottom:15,
        backgroundColor:'white'
        // justifyContent:'center',
        // alignItems:'center'
    },
    nameTextCon: {
        flexShrink: 1,
        marginRight:8,
    },
    eventName:{
        fontSize:14,
        fontWeight:'700',
        color:'#424242',
        fontFamily: 'Manrope-semiBold'
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
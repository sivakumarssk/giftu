import { FlatList, Image, ImageBackground, StyleSheet, Text, View } from "react-native";
import NavBack from "../../components/utills/NavBack";
import PressableItem from "../../components/utills/PressableItem";
import { colors } from "../../components/utills/colors";
import Search from "../../components/home/Search";
import GuessList from "../../components/events/GuessList";
import useApiCalls from "../../api/useApiCalls";


function EventDetails({route,navigation}) {
    const userevent =route.params?.userevent

    const {baseUrl} =useApiCalls()

    // console.log(userevent,'rrhhr');
    

    return (
        <View style={styles.detailsMain}>

            <View>
                <NavBack>Events Details</NavBack>
            </View>

            <View style={styles.eventCon}>
                <View style={styles.eventSubCon}>
                    <PressableItem>
                        <ImageBackground source={{uri:`${baseUrl}${userevent.image}`}}
                       resizeMode="stretch"  style={styles.eventImg}>

                            <View style={styles.itemEditCon}>
                                <PressableItem 
                                // route={{ dir: 'AddItemScreen', paraName: 'edit', value: true }}
                                >

                                    <Image
                                        source={require('../../assets/wishlist/edititem.png')}
                                        // resizeMode="cover"
                                        style={styles.editImage}
                                    />
                                </PressableItem>
                            </View>

                            
                        </ImageBackground>
                        
                    </PressableItem>
                    
                </View>
                <View style={styles.viewStyles}>

                    <View style={styles.nameTextCon}>
                        <Text style={styles.eventName} numberOfLines={1}
                        ellipsizeMode="tail"
                        >{userevent.category}</Text>
                    </View>
                            <PressableItem 
                                externalFunction={()=>navigation.navigate('EventWishlistItemsScreen',{
                                    // wishlist:userevent.wishlist,
                                    // wishlistName:userevent.wishlistName,
                                    event:userevent,
                                })}>

                                <Text style={styles.text}>View Wishlist  {'>>'}</Text>
                                </PressableItem>
                            </View>
            </View>

            <View style={styles.addGuestCon}>
                <Text style={styles.inviteText}>Guest’s Invited</Text>

                <PressableItem route={{dir:'SendInviteScreen',paraName:"addGuest",value:true}}
                route2={{paraName:"eventId",value:userevent._id}}>
                    <View style={styles.addItemCon}>
                        <Text style={styles.addItemText}>Add Guest</Text>
                        <Image source={require('../../assets/wishlist/plus.png')}
                            style={styles.plus} />
                    </View>
                </PressableItem>
            </View>

            <View>
                <Search />
            </View>

            <View style={styles.eventListCon}>
                <FlatList data={userevent.guestList}
                    renderItem={(itemData) => 
                        <GuessList image={{uri:(`${baseUrl}${itemData.item.profilePic}`)}} name={itemData.item.contactName} 
                        status={itemData.item.status}/>
                    }
                    keyExtractor={(item, index) => index.toString()}
                    showsVerticalScrollIndicator={false}
                    alwaysBounceVertical={false}
                />
            </View>

        </View>
    )
}

export default EventDetails

const styles = StyleSheet.create({
    detailsMain: {
        flex: 1,
        marginTop: '15%',
        marginHorizontal: '5%'
    },
    eventCon: {
        marginVertical: 20,
        justifyContent: 'center',
        borderRadius:8,
        elevation: 4,
        shadowColor: 'black',
        shadowOpacity: 0.25,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 2 },
        backgroundColor: 'white',
        overflow: 'hidden'
        // alignItems: 'center'
    },
    eventSubCon: {
        position: 'relative',
        // marginTop: 10,
        width: '100%',
        height: 170,
        // backgroundColor:'yellow'
        // elevation: 4,
        // shadowColor: 'black',
        // shadowOpacity: 0.25,
        // shadowRadius: 8,
        // shadowOffset: { width: 0, height: 2 },
        // backgroundColor: 'white',
        // overflow: 'hidden'
    },
    eventImg: {
        width: '100%',
        height: '100%',
    },
    viewStyles: {
        flexDirection:'row',
        justifyContent:'space-between',
        padding:10,
        paddingBottom:15,
        backgroundColor:'white'
        // marginHorizontal: '10%',
        // marginVertical: '15%',
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
    text: {
        fontSize: 14,
        fontWeight: '700',
        fontFamily: 'Manrope-semiBold',
        color:'#424242'
    },
    itemEditCon: {
        position: 'absolute',
        right: 0,
        width: 40,
        height: 40,
        zIndex: 30,
        overflow: 'hidden'
    },
    addGuestCon: {
        marginVertical: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    editImage: {
        width: '100%',
        height: '100%'
    },
    inviteText: {
        fontSize: 16,
        fontWeight: '500',
        color: colors.nav,
        fontFamily: 'Manrope-semiBold'
    },
    addItemCon: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
    },
    addItemText: {
        fontSize: 18,
        fontWeight: '600',
        color: colors.primary,
        fontFamily: 'Manrope-semiBold'
    },
    plus: {
        marginTop: 5,
        width: 16,
        height: 16,
    },
    eventListCon:{
        flex:1,
    },
})
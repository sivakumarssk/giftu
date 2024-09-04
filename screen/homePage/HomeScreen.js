import { Image, StyleSheet, Text, View } from "react-native";
import PressableItem from "../../components/utills/PressableItem";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../components/utills/colors";
import Search from "../../components/home/Search";
import HomeCon from "../../components/home/HomeCon";
import EventsFlatlist from "../../components/home/EventsFlatlist";

function HomeScreen({navigation}) {

    const dummydata = [
        { id: 1, Image: require('../../assets/home/eventslist/1.png'),link:'https://www.google.com/' },
        { id: 2, Image: require('../../assets/home/eventslist/2.png'),link:'https://www.google.com/' },
        { id: 3, Image: require('../../assets/home/eventslist/3.png'),link:'https://www.google.com/' },
        { id: 4, Image: require('../../assets/home/eventslist/4.png'),link:'https://www.google.com/' },
    ]

    return (
        <View style={styles.homeMainCon}>
             <View style={styles.headCon}>
                <View style={styles.logoCon}>
                    <Image source={require('../../assets/logo.png')}  
                    style={styles.logoImage}/>
                    <Text style={styles.userName}>Hi Priya !</Text>
                </View>

                <PressableItem >
                    <Ionicons name="notifications-outline" size={24} color="black" />
                </PressableItem>
            </View>

            <View style={styles.subheadCon}>
                <Text style={styles.subText}>Create your event and get your gift.</Text>
            </View>

            <View style={styles.searCon}>
                <Search direction={'SearchScreen'}/>
            </View>

            <View style={styles.homeCon}>
                <HomeCon gifImg={require('../../assets/home/wishlistGif.gif')}
                background={'#D7E4F6'} pageImg={require('../../assets/home/wishlist.png')}
                heading={'Create Wish List'}
                descreption={'Our goal is to ensure that you have everything you need to feel comfortable..'}
                direction={'WishlistScreen'}
                />

                <HomeCon gifImg={require('../../assets/home/eventGif.gif')}
                background={'#FFC7D0'} pageImg={require('../../assets/home/event.png')}
                heading={'Create Event'}
                descreption={'Seamlessly plan your events with integrated gift tracking ...'}
                direction={'AllEventsScreen'}
                />
            </View>


            <View style={styles.popularEventsCon}>
                <Text style={styles.popularEventshead}>Popular events for you</Text>
            </View>

            <View style={{flex:1}}>
                <EventsFlatlist data={dummydata}/>
            </View>

        </View>
    )
}

export default HomeScreen

const styles=StyleSheet.create({
    homeMainCon:{
        flex:1,
        marginTop:'15%',
        marginHorizontal:'5%'
    },
    headCon:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
    },
    logoCon:{
        flexDirection:'row',
        // justifyContent:'flex-start',
        alignItems:'center',
        gap:10
    },
    userName:{
        fontSize:30,
        fontWeight:'600',
        fontFamily:'Manrope-semiBold',
        color:colors.primary
    },
    logoImage:{
        width:80,
        height:27,
    },
    subheadCon:{
        marginTop:'1%'
    },
    subText:{
        fontSize:14,
        fontWeight:'500',
        fontFamily:'Manrope-semiBold',
        color:colors.formLable
    },
    searCon:{
        marginTop:'5%',
    },
    homeCon:{
        flexDirection:'row',
        marginTop:'5%',
        // marginHorizontal:'3%',
        paddingRight:'3%',
        justifyContent:'space-between'
    },
    popularEventsCon:{
        marginVertical:'5%'
    },
    popularEventshead:{
        fontSize:16,
        fontWeight:'600'
    }
})
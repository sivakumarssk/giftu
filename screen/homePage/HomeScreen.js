import { FlatList, Image, ScrollView, StyleSheet, Text, View } from "react-native";
import PressableItem from "../../components/utills/PressableItem";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../components/utills/colors";
import Search from "../../components/home/Search";
import HomeCon from "../../components/home/HomeCon";
import EventsFlatlist from "../../components/home/EventsFlatlist";
import Coursole from "../../components/home/Coursole";
import useApiCalls from "../../api/useApiCalls";
import { useEffect, useState } from "react";

function HomeScreen({ navigation }) {


    const { baseUrl, loading, apiError, apiCall } = useApiCalls()

    const [banners, setBanners] = useState({})
    const [name, setName] = useState({})

    const handleName = async () => {
        const response = await apiCall('get', 'getName')
        if(response){
            setName(response)
        }
        // console.log(response,'rses');
    }

    const handleBanners = async () => {
        const response = await apiCall('get', 'getBanners')
        if(response){
            setBanners(response)
        }
        // console.log(response,'rses');
    }


    useEffect(() => {
        handleName()
        handleBanners()
    }, [])

    // console.log(banners.events)
    

    return (
        <View style={styles.homeMainCon}>
            <View style={styles.headCon}>
                <View style={styles.logoCon}>
                    <Image source={require('../../assets/logo.png')}
                        style={styles.logoImage} />
                    <Text style={styles.userName}>{`${name?.userName} !`}</Text>
                </View>

                <PressableItem direction={'NotifiCation'}>
                    <Ionicons name="notifications-outline" size={24} color="black" />
                </PressableItem>
            </View>

            <View style={styles.subheadCon}>
                <Text style={styles.subText}>Create your event and get your gift.</Text>
            </View>

            <View style={styles.searCon}>
                <Search editable={false}
                route={{dir:'SearchScreen',paraName:'data',value:banners.events}} 
                />
            </View>


            <FlatList
                data={[]}
                renderItem={''}
                // keyExtractor={(item, index) => index.toString()}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                ListHeaderComponent={
                    <>
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
                                direction={'CreateEventsScreen'}
                            />
                        </View>
                        {/* Static Content */}

                        { (Object.keys(banners).length <= 0 || 
                        (banners.events?.length <= 0  && banners.promotions?.length <= 0 )) &&
                            <View style={styles.noEventsCon} >
                                <Text style={styles.noEvents}>No Events or Banners Avaliable </Text>
                            </View>
                        } 

                        {banners.events?.length > 0 && <View style={styles.popularEventsCon}>
                            <Text style={styles.popularEventshead}>Events</Text>
                        </View>
                        }

                        {/* Coursole */}
                        {banners.events?.length > 0 && <View style={styles.coursoleCon}>
                            <Coursole DATA={banners.events} baseUrl={baseUrl} />
                        </View>
                        }

                        {/* More Static Content */}
                        {banners.promotions?.length > 0 && <View style={styles.popularEventsCon}>
                            <Text style={styles.popularEventshead}>Promotions</Text>
                        </View>
                        }

                        {/* Events FlatList */}
                        {banners.promotions?.length > 0 && <View style={{ flex: 1, marginHorizontal: '5%' }}>
                            <EventsFlatlist data={banners.promotions} baseUrl={baseUrl} />
                        </View>
                        }
                    </>
                }
            />
        </View>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    homeMainCon: {
        flex: 1,
        marginTop: '15%',
    },
    headCon: {
        marginHorizontal: '5%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    logoCon: {
        flexDirection: 'row',
        // justifyContent:'flex-start',
        alignItems: 'center',
        gap: 10
    },
    userName: {
        fontSize: 30,
        fontWeight: '600',
        fontFamily: 'Manrope-semiBold',
        color: colors.primary
    },
    logoImage: {
        width: 80,
        height: 27,
    },
    subheadCon: {
        marginHorizontal: '5%',
        marginTop: '1%'
    },
    subText: {
        fontSize: 14,
        fontWeight: '500',
        fontFamily: 'Manrope-semiBold',
        color: colors.formLable
    },
    searCon: {
        marginHorizontal: '5%',
        marginTop: '5%',
    },
    homeCon: {
        marginHorizontal: '5%',
        flexDirection: 'row',
        marginTop: '5%',
        // marginHorizontal:'3%',
        paddingRight: '3%',
        justifyContent: 'space-between'
    },
    popularEventsCon: {
        margin: '5%'
    },
    popularEventshead: {
        fontSize: 16,
        fontWeight: '600'
    },
    noEventsCon: {
        // flex:1,
        paddingVertical: '15%',
    },
    noEvents: {
        textAlign: 'center',
        fontSize: 18,
        fontWeight: '700',
        fontFamily: 'Manrope-semiBold',
        color: colors.formLable
    },
})
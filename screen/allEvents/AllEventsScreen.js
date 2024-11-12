import { FlatList, ScrollView, SectionList, StyleSheet, Text, View } from "react-native";
import NavBack from "../../components/utills/NavBack";
import { colors } from "../../components/utills/colors";
import EventsFlatlist from "../../components/home/EventsFlatlist";
import PressableItem from "../../components/utills/PressableItem";
import useApiCalls from "../../api/useApiCalls";
import { useCallback, useEffect, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";

function AllEventsScreen() {

    const { loading, apiError, baseUrl, apiCall } = useApiCalls()
    const [userData, setUserData] = useState([])

    // const sections = [
    //     {
    //         data: [
    //             { _id: 1, Image: require('../../assets/dummt/event1.png') },
    //             { _id: 2, Image: require('../../assets/dummt/event2.png') }
    //         ],
    //     },
    //     { title: "Draft Events",  data: [
    //         { _id: 1, Image: require('../../assets/dummt/draftEvent1.png') }
    // ] },
    // ];

    const getEvents = async () => {
        const response = await apiCall('get', 'getUserEvent')

        if (response) {
            // console.log(response);
            
            setUserData(response)
        }
    }


    useFocusEffect(
        useCallback(() => {
            getEvents()
        }, [])
    );

 

    // const renderSection = ({ item }) => (
    //     <View>
    //         {/* <View style={styles.sectionHeaderCon}>
    //         <Text style={styles.sectionHeader}>{item.title}</Text>
    //         </View> */}
    //         <EventsFlatlist data={userData} externalImgStyles={styles.imageStyles}
    //          route={{direction:'EventDetails',paraName:'userevent'}}
    //          baseUrl={baseUrl} />
    //     </View>
    // );


    return (

        <View style={styles.allEventsMainCon}>

            <View>
                <NavBack icon={false}>All Events</NavBack>
            </View>

            <PressableItem direction={'CreateEventsScreen'}>
                <View style={styles.createEventsCon}>
                    <Text style={styles.createEventsText}>Create a New Event</Text>
                    <Text style={styles.createEventsText}>+</Text>
                </View>
            </PressableItem>

            <View style={styles.sectionHeaderCon}>
                <Text style={styles.sectionHeader}>Upcoming Events</Text>
            </View>

            {/* <FlatList
                // sections={sections}
                data={sections}
                keyExtractor={(item, index) => index.toString()}
                renderItem={renderSection}
                // contentContainerStyle={{ paddingBottom: 20 }}
                showsVerticalScrollIndicator={false}
            /> */}
            <View style={{flex:1,marginBottom:20}}>
                <EventsFlatlist data={userData} 
                    route={{ direction: 'EventDetails', paraName: 'userevent' }}
                    baseUrl={baseUrl} />
            </View>
        </View>
    )
}


export default AllEventsScreen


const styles = StyleSheet.create({
    allEventsMainCon: {
        flex: 1,
        marginTop: '15%',
        marginHorizontal: '5%'
    },
    createEventsCon: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10,
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: colors.blue,
        borderRadius: 20,
        marginTop: '10%',
        marginBottom: '3%',
        paddingVertical: '12%',
        elevation: 8,
        shadowColor: 'black',
        shadowOpacity: 0.25,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 2 },
    },
    createEventsText: {
        fontSize: 18,
        fontWeight: '800',
        color: colors.blue,
        fontFamily: 'Manrope-Medium',
    },
    sectionHeaderCon: {
        marginVertical: '4%'
    },
    sectionHeader: {
        fontSize: 18,
        fontWeight: '600',
        color: colors.nav,
        fontFamily: 'Manrope-Medium'
    },
    imageStyles: {
        // borderRadius: 20,
    },
})
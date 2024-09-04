import { FlatList, ScrollView, SectionList, StyleSheet, Text, View } from "react-native";
import NavBack from "../../components/utills/NavBack";
import { colors } from "../../components/utills/colors";
import EventsFlatlist from "../../components/home/EventsFlatlist";

function AllEventsScreen(){
    const sections = [
        { title: "Upcoming Events",  data: [
                { id: 1, Image: require('../../assets/dummt/event1.png') },
                { id: 2, Image: require('../../assets/dummt/event2.png') }
        ],},
        { title: "Draft Events",  data: [
            { id: 1, Image: require('../../assets/dummt/draftEvent1.png') }
    ] },
    ];

    const renderSection = ({ item }) => (
        <View>
            <View style={styles.sectionHeaderCon}>
            <Text style={styles.sectionHeader}>{item.title}</Text>
            </View>
            <EventsFlatlist data={item.data} externalImgStyles={styles.imageStyles}/>
        </View>
    );

    
    return(
       
        <View style={styles.allEventsMainCon}>

            <View>
                <NavBack icon={false}>All Events</NavBack>
            </View>

            <View style={styles.createEventsCon}>
                <Text style={styles.createEventsText}>Create a New Event</Text>
                <Text style={styles.createEventsText}>+</Text>
            </View>

            <FlatList
                // sections={sections}
                data={sections}
                keyExtractor={(item, index) => index.toString()}
                renderItem={renderSection}
                contentContainerStyle={{ paddingBottom: 20 }}
                showsVerticalScrollIndicator={false}
            />
        </View>
    )
}


export default AllEventsScreen


const styles=StyleSheet.create({
    allEventsMainCon:{
        flex:1,
        marginTop:'15%',
        marginHorizontal:'5%' 
    },
    createEventsCon:{
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        gap:10,
        backgroundColor:'white',
        borderWidth:1,
        borderColor:colors.blue,
        borderRadius:20,
        marginTop:'10%',
        marginBottom:'3%',
        paddingVertical:'12%',
        elevation:8,
        shadowColor:'black',
        shadowOpacity:0.25,
        shadowRadius:8,
        shadowOffset:{width:0,height:2},

    },
    createEventsText:{
        fontSize:18,
        fontWeight:'800',
        color:colors.blue,
        fontFamily:'Manrope-Medium',
    },
    sectionHeaderCon:{
        marginVertical:'4%'
    },
    sectionHeader:{
        fontSize:18,
        fontWeight:'600',
        color:colors.nav,
        fontFamily:'Manrope-Medium'
    },
    imageStyles:{
        borderRadius:20,
    },
})
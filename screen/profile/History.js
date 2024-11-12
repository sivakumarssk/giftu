import { FlatList, StyleSheet, Text, View } from "react-native";
import NavBack from "../../components/utills/NavBack";
import EventsFlatlist from "../../components/home/EventsFlatlist";
import { colors } from "../../components/utills/colors";


// const sections = [
//     { title: "June 2024",  data: [
//             { id: 1, Image: require('../../assets/dummt/event1.png') },
//             { id: 2, Image: require('../../assets/dummt/event2.png') }
//     ],},
//     { title: "April 2024",  data: [
//         { id: 1, Image: require('../../assets/dummt/draftEvent1.png') }
// ] },
// ];

const renderSection = ({ item }) => (
    <View>
        <View style={styles.sectionHeaderCon}>
        <Text style={styles.sectionHeader}>{item.title}</Text>
        </View>
        <EventsFlatlist data={item.data} externalImgStyles={styles.imageStyles}
        direction={'EventAttenders'} indtext={true}/>
    </View>
);


function History(){

    return(
        <View style={styles.historyMain}>
            <NavBack>History of Events</NavBack>

            <View>
            <FlatList
                // sections={sections}
                data={sections}
                keyExtractor={(item, index) => index.toString()}
                renderItem={renderSection}
                // contentContainerStyle={{ paddingBottom: 20 }}
                showsVerticalScrollIndicator={false}
            />
            </View>
        </View>
    )
}

export default History

const styles=StyleSheet.create({
    historyMain:{
        flex:1,
        marginTop:'15%',
        marginHorizontal:'5%'
    },
    sectionHeaderCon:{
        marginVertical:'5%'
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
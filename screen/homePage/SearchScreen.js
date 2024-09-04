import { StyleSheet, View } from "react-native";
import Search from "../../components/home/Search";
import EventsFlatlist from "../../components/home/EventsFlatlist";
import NavBack from "../../components/utills/NavBack";

function SearchScreen(){

    const dummydata = [
        { id: 1, Image: require('../../assets/home/eventslist/1.png'),link:'https://www.google.com/' },
        { id: 2, Image: require('../../assets/home/eventslist/2.png'),link:'https://www.google.com/' },
        { id: 3, Image: require('../../assets/home/eventslist/3.png'),link:'https://www.google.com/' },
        { id: 4, Image: require('../../assets/home/eventslist/4.png'),link:'https://www.google.com/' },
    ]

    return(
        <View style={styles.searchMainCon}>

            <NavBack direction={'HomeScreen'}>Search</NavBack>

            <View style={styles.searchSubCon}>
            <Search autoFocus={true}/>
            </View>

<View style={styles.eventListCon}>
            <EventsFlatlist data={dummydata}/>
</View>
        </View>
    )
}

export default SearchScreen


const styles =StyleSheet.create({
    searchMainCon:{
        flex:1,
        marginHorizontal:'5%',
        marginTop:'15%'
    },
    searchSubCon:{
        marginVertical:'8%'
    },
    eventListCon:{
        flex:1,
    },
})
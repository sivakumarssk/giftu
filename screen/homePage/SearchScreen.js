import { StyleSheet, View } from "react-native";
import Search from "../../components/home/Search";
import EventsFlatlist from "../../components/home/EventsFlatlist";
import NavBack from "../../components/utills/NavBack";
import useApiCalls from "../../api/useApiCalls";
import { useState } from "react";

function SearchScreen({route}) {

    
    const data =route.params?.data
    
    const { baseUrl, apiCall }= useApiCalls()
    const [searchData,setSearchData]=useState(data)

    // console.log(data);

    const handleSearch =()=>{
        
    }
    


    return (
        <View style={styles.searchMainCon}>

            <NavBack direction={'HomeScreen'}>Search</NavBack>

            <View style={styles.searchSubCon}>
                <Search autoFocus={true} />
            </View>

            <View style={styles.eventListCon}>
                <EventsFlatlist data={searchData}  baseUrl={baseUrl}/>
            </View>
        </View>
    )
}

export default SearchScreen


const styles = StyleSheet.create({
    searchMainCon: {
        flex: 1,
        marginHorizontal: '5%',
        marginTop: '15%'
    },
    searchSubCon: {
        marginVertical: '8%'
    },
    eventListCon: {
        flex: 1,
    },
})
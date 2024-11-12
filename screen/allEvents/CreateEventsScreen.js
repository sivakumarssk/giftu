import { Image, StyleSheet, View } from "react-native"
import NavBack from "../../components/utills/NavBack"
import FormHead from "../../components/login-signup/FormHead"
import EventsFlatlist from "../../components/home/EventsFlatlist"
import useApiCalls from "../../api/useApiCalls"
import { useEffect, useState } from "react"

// const dummydata=[
//         { _id: 1, Image: require('../../assets/createEvents/fathersday.jpeg'), },
//         { _id: 2, Image: require('../../assets/createEvents/birthday.jpeg'), },
//         { _id: 3, Image: require('../../assets/createEvents/mothersday.jpeg'),},
//         { _id: 4, Image: require('../../assets/home/eventslist/4.png'), },
// ]

function CreateEventsScreen(){

    const { loading,baseUrl,apiCall,apiError } =useApiCalls([])

    const [data,setData]=useState([])

    const defaultEvents=async()=>{
        const response =await apiCall('get','getDefaultEvents')
        // console.log(response);
        
        if(response){
            setData(response)
        }
    }



    useEffect(()=>{
        defaultEvents()
    },[])
    

    return(
        <View style={styles.createMain}>
            <View style={styles.headCon}>
                <NavBack>Create Events</NavBack>
                <FormHead text={'Select any Template for your New Events'}/>
            </View>



            <View style={{flex:1}}>
                <EventsFlatlist data={data} externalImgStyles={styles.extraImageStyles}
                 baseUrl={baseUrl}
                route={{direction:'NewEventScreen',paraName:'categoryName'}}
                />
            </View>
        </View>
    )
}

export default CreateEventsScreen

const styles=StyleSheet.create({
    createMain:{
        flex:1,
        marginTop:'15%',
        marginHorizontal:'5%' 
    },
    headCon:{
        gap:10,
        marginBottom:'5%'
    },
    extraImageStyles:{
        borderRadius:10,

    },
})
import { StyleSheet, View } from "react-native"
import NavBack from "../../components/utills/NavBack"
import FormHead from "../../components/login-signup/FormHead"
import EventsFlatlist from "../../components/home/EventsFlatlist"

const dummydata=[
        { id: 1, Image: require('../../assets/createEvents/fathersday.jpeg'), },
        { id: 2, Image: require('../../assets/createEvents/birthday.jpeg'), },
        { id: 3, Image: require('../../assets/createEvents/mothersday.jpeg'),},
        { id: 4, Image: require('../../assets/home/eventslist/4.png'), },
]

function CreateEventsScreen(){
    return(
        <View style={styles.createMain}>
            <View style={styles.headCon}>
                <NavBack>Create Events</NavBack>
                <FormHead text={'Select any Template for your New Events'}/>
            </View>

            <View style={{flex:1}}>
                <EventsFlatlist data={dummydata} externalImgStyles={styles.extraImageStyles}
                direction={'NewEventScreen'} />
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
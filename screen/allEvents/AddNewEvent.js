import { StyleSheet, Text, View } from "react-native";
import NavBack from "../../components/utills/NavBack";
import FormHead from "../../components/login-signup/FormHead";
import { colors } from "../../components/utills/colors";
import InputPressable from "../../components/events/InputPressable";
import PressableItem from "../../components/utills/PressableItem";
import CustomButton from "../../components/onboard/CustomButton";

function AddNewEvent({navigation}){
    return(
        <View style={styles.addEventsMainCon}>
            <View style={styles.head}>
                <NavBack>Add New Event</NavBack>
                <FormHead heading={'Enter Details About the Event'} headingStyles={styles.heading} />
            </View>

            <View>
                <InputPressable label={'Add Guest'} icon={'add-outline'}
                extraFunction={()=>navigation.navigate('ContactInvitation')}/>

                <PressableItem extraStyles={styles.allguestCon}>
                    <Text style={styles.allguest}>View all guest’s</Text>
                </PressableItem>
                <InputPressable label={'Add Wish List'} icon={'chevron-down-sharp'}/>

            </View>
                <CustomButton direction={'EventCreated'} externalStyles={styles.extrabtn}
                >Create the Event</CustomButton>
        </View>
    )
}

export default AddNewEvent


const styles=StyleSheet.create({
    addEventsMainCon: {
        flex: 1,
        marginTop: '15%',
        marginHorizontal: '5%',
    },
    head: {
        gap: 10,
        marginTop:20,
        marginBottom: '5%'
    },
    heading: {
        color: colors.primary,
        fontSize: 28
    },
    allguestCon:{
        marginVertical:10
    },
    allguest:{
        color:colors.primary,
        fontSize:16,
        textAlign:'right',
    },
    extrabtn:{
        marginVertical:30
    },
})
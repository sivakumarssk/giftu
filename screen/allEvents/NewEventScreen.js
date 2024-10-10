import { KeyboardAvoidingView, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import NavBack from "../../components/utills/NavBack";
import FormHead from "../../components/login-signup/FormHead";
import { colors } from "../../components/utills/colors";
import ImagePick from "../../components/utills/ImagePick";
import InputCom from "../../components/login-signup/InputCom";
import DateTime from "../../components/events/DateTime";
import { useState } from "react";
import InputPressable from "../../components/events/InputPressable";
import CustomButton from "../../components/onboard/CustomButton";


function NewEventScreen() {
    const [date, setDate] = useState(new Date());
    const [show, setShow] = useState(false);
    const [mode, setMode] = useState('date')



    const handleDate = (event) => {
        setMode(event)
        setShow(true)
    }

    return (

        <View style={styles.newEventCon}>
            <View style={styles.head}>
                <NavBack>New Event</NavBack>
                <FormHead heading={'Enter Details About the Event'} headingStyles={styles.heading}
                    text={'Upload any Invitation for the event if its there'} />
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
                <KeyboardAvoidingView >
                    <View style={styles.formCon}>
                        <ImagePick />
                        <InputCom label={'Event Category'} labelStyles={true} />

                        <InputCom label={'Name'} labelStyles={true} />


                        <InputPressable extraFunction={() => handleDate('date')} label={'Date'}
                            icon={'calendar-outline'} />

                        <InputPressable extraFunction={() => handleDate('time')} label={'time'}
                            icon={'time-outline'} />

                        <InputCom label={'Venue'} labelStyles={true} />
                        <InputCom label={'Address'} labelStyles={true} multiline={true} />
                        <InputCom label={'Location'} labelStyles={true} />

                        <View style={styles.btnCon}>
                        <CustomButton icon={true} direction={'AddNewEvent'}
                        >Next</CustomButton>
                        </View>


                    </View>
                </KeyboardAvoidingView>
            </ScrollView>

            {show && <DateTime mode={mode} value={date} setShow={setShow} />}
        </View>

    )
}

export default NewEventScreen

const styles = StyleSheet.create({
    newEventCon: {
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
    formCon: {
        gap: 15
    },
    btnCon:{
        marginTop:10,
        marginBottom:30
    },
})
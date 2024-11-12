import { KeyboardAvoidingView, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import NavBack from "../../components/utills/NavBack";
import FormHead from "../../components/login-signup/FormHead";
import { colors } from "../../components/utills/colors";
import ImagePick from "../../components/utills/ImagePick";
import InputCom from "../../components/login-signup/InputCom";
import DateTime from "../../components/events/DateTime";
import { useEffect, useState } from "react";
import InputPressable from "../../components/events/InputPressable";
import CustomButton from "../../components/onboard/CustomButton";
import useApiCalls from "../../api/useApiCalls";
import PressableItem from "../../components/utills/PressableItem";


function NewEventScreen({ route,navigation }) {

    const categoryName = route.params?.categoryName.name
    // const categoryImage = route.params?.categoryImage

    // console.log(categoryName,categoryImage);


    const { loading, apiError, setApiError, apiCall } = useApiCalls()

    const [eventForm, setEventForm] = useState({
        invitationImage: '',
        category: categoryName,
        name: '',
        date: '',
        dateTime: '',
        time: '',
        venue: '',
        address: '',
        wishlistName: '',
        location: ''
    })

    const [error, setError] = useState({
        invitationImage: '',
        category: '',
        name: '',
        date: '',
        time: '',
        venue: '',
        address: '',
        wishlistName: '',
        location: ''
    })

    const [date, setDate] = useState(new Date());
    const [show, setShow] = useState(false);
    const [mode, setMode] = useState('date')

    const [selectShow, setSelectShow] = useState(false)
    const [wishlistName, setWishlistName] = useState([])

    const validate = () => {
        let valid = true;
        let newErrors = {};

        Object.keys(eventForm).forEach((key) => {
            if ( key !== 'invitationImage' && !eventForm[key]) {
                newErrors[key] = 'This field is required'
                valid = false;
            }
        })

        setError(newErrors);
        return valid
    }



    const handleOnChange = (value, key) => {
        setApiError('')
        setError((prev) => ({ ...prev, [key]: '' }))

        setEventForm((prev) => ({ ...prev, [key]: value }))

        if (key === 'location') {
            if (!/^https:\/\/maps\.app\.goo\.gl\/[A-Za-z0-9]+$/.test(value)) {
                setError((prev) => ({ ...prev, location: "Please enter a valid Google Maps link." }));
            }
        }
    }


    const handleSubmit = async () => {
        // console.log(eventForm.invitationImage);

        if (validate() && Object.values(error).every(error => !error)) {
            const formData = new FormData();

            formData.append("invitationImage", eventForm.invitationImage)
            formData.append("category", eventForm.category)
            formData.append("wishlistName", eventForm.wishlistName)
            formData.append("date", eventForm.dateTime.toString())
            formData.append("name", eventForm.name)
            formData.append("venue", eventForm.venue)
            formData.append("address", eventForm.address)
            formData.append("location", eventForm.location)

            // console.log(formData, 'foprmdata');

            const response = await apiCall('post', 'createUserEvent', formData)

            if (response) {
                navigation.replace('EventCreated',{
                    userevent:response
                })
            }

        }
    }

    const formatToISTDate = (dateObj) => {
        return dateObj?.toLocaleDateString('en-IN', {
            timeZone: 'Asia/Kolkata'
        });
    };

    const formatToISTTime = (dateObj) => {
        return dateObj?.toLocaleTimeString('en-IN', {
            timeZone: 'Asia/Kolkata',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const handleDateChange = (selectedDate, mode) => {
        setError((prev) => ({ ...prev, date: '', time: '' }));

        // Create a new Date object based on the existing `eventForm.dateTime` or use the selected date/time
        const updatedDateTime = eventForm.dateTime ? new Date(eventForm.dateTime) : new Date();

        if (mode === 'date') {
            // Update only the date part, keep the previous time
            updatedDateTime.setFullYear(selectedDate.getFullYear());
            updatedDateTime.setMonth(selectedDate.getMonth());
            updatedDateTime.setDate(selectedDate.getDate());

            setEventForm((prev) => ({
                ...prev,
                dateTime: updatedDateTime,  // Save combined date and time
                date: formatToISTDate(updatedDateTime),  // Format date for display
            }));
        }

        if (mode === 'time') {
            // Update only the time part, keep the previous date
            updatedDateTime.setHours(selectedDate.getHours());
            updatedDateTime.setMinutes(selectedDate.getMinutes());
            updatedDateTime.setSeconds(0);  // Optional: set seconds to zero for simplicity

            const currentDate = new Date();
            if (updatedDateTime < currentDate && updatedDateTime.toDateString() === currentDate.toDateString()) {
                // If selected time is in the past on today's date, show an error
                setError((prev) => ({ ...prev, time: 'Time cannot be in the past.' }));
            } else {
                setEventForm((prev) => ({
                    ...prev,
                    dateTime: updatedDateTime,  // Save combined date and time
                    time: formatToISTTime(updatedDateTime),  // Format time for display
                }));
            }
        }
    };




    const handleDate = (event) => {
        setMode(event)
        setShow(true)
    }

    const wishlistNamesapi = async () => {
        const response = await apiCall('get', 'getlistWishlist')
        setWishlistName(response)
    }


    useEffect(() => {
        wishlistNamesapi()
    }, [])


    // console.log(date,'date');
    // console.log(eventForm);


    return (

        <View style={styles.newEventCon}>
            <View style={styles.head}>
                <NavBack>New Event</NavBack>
                <FormHead heading={'Enter Details About the Event'} headingStyles={styles.heading}
                    text={'Upload any Invitation for the event if its there'} />
            </View>

            <View style={styles.formCon}>
                <KeyboardAvoidingView style={{ flex: 1 }}>
                    <ScrollView showsVerticalScrollIndicator={false}
                        keyboardShouldPersistTaps="handled"
                        contentContainerStyle={{ flexGrow: 1, gap: 15 }}>

                        <ImagePick image={eventForm.invitationImage}
                            setImage={(data) => { setEventForm((prev) => ({ ...prev, invitationImage: data })) }}
                            error={error.image}
                            setError={(err) => { setError((prev) => ({ ...prev, invitationImage: err })) }}
                            setApiError={setApiError}
                        />

                        <InputCom label={'Event Category'} labelStyles={true}
                            value={eventForm.category}
                            editable={false}
                            error={error.category}
                        />

                        <View style={styles.selectCon}>

                            <InputPressable label={'Add Wish List'}
                                icon={selectShow ? 'chevron-up-sharp' : 'chevron-down-sharp'}
                                value={eventForm.wishlistName}
                                extraFunction={() => setSelectShow(!selectShow)}
                                error={error.wishlistName} />


                            {/* <View style={styles.selectmenu}> */}
                            {selectShow && <ScrollView style={styles.selectmenu} nestedScrollEnabled={true}>

                                {
                                    wishlistName.map((each, index) => {
                                        // console.log(index);

                                        return (
                                            <View key={each._id}>
                                                <PressableItem extraStyles={styles.selectOption}
                                                    externalFunction={() => {
                                                        setError((prev) => ({ ...prev, wishlistName: '' }))
                                                        setEventForm((prev) => ({ ...prev, wishlistName: each.name }))
                                                        setSelectShow(false);
                                                    }}
                                                >
                                                    <Text style={styles.optionText}>{each.name}</Text>
                                                </PressableItem>
                                                {(index < wishlistName.length - 1) && <View style={styles.selectOptionline}></View>}
                                            </View>
                                        )

                                    })
                                }

                                {/* <View style={styles.selectOptionline}></View> */}


                            </ScrollView>}
                            {/* </View> */}

                        </View>


                        <InputPressable extraFunction={() => handleDate('date')} label={'Date'}
                            icon={'calendar-outline'}
                            value={eventForm.date}
                            error={error.date} />

                        <InputPressable extraFunction={() => handleDate('time')} label={'time'}
                            icon={'time-outline'}
                            value={eventForm.time}
                            error={error.time}
                        />

                        <InputCom label={'Name'} labelStyles={true}
                            value={eventForm.name}
                            onChangeText={(value) => handleOnChange(value, 'name')}
                            maxLength={20}
                            error={error.name}
                        />

                        <InputCom label={'Venue'} labelStyles={true}
                            value={eventForm.venue}
                            onChangeText={(value) => handleOnChange(value, 'venue')}
                            error={error.venue} />

                        <InputCom label={'Address'} labelStyles={true} multiline={true}
                            value={eventForm.address}
                            onChangeText={(value) => handleOnChange(value, 'address')}
                            error={error.address}
                        />

                        <InputCom label={'Location'} labelStyles={true}
                            value={eventForm.location}
                            onChangeText={(value) => handleOnChange(value, 'location')}
                            error={error.location} />


                        <View style={styles.btnCon}>
                            {/* <CustomButton icon={true} direction={'AddNewEvent'}
                        >Next</CustomButton> */}

                            <CustomButton externalStyles={styles.extrabtn}
                                // direction={'EventCreated'}
                                externalFunction={loading ? '' : handleSubmit}
                            >Create the Event</CustomButton>
                        </View>


                    </ScrollView>
                </KeyboardAvoidingView>
            </View>

            {show && <DateTime mode={mode} value={date} setShow={setShow}
                onChange={handleDateChange} />}
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
        // marginTop: 20,
        marginBottom: '5%'
    },
    heading: {
        color: colors.primary,
        fontSize: 28
    },
    formCon: {
        flex: 1,
    },
    btnCon: {
        marginTop: 10,
        marginBottom: 30
    },
    selectCon: {
        position: 'relative'
    },
    // selectmenu:{
    //     maxHeight: 80,
    //     backgroundColor:'white',
    //     zIndex:10,
    //     paddingHorizontal:15,
    //     paddingVertical:10,
    //     borderRadius:8,
    //     width:'100%',
    // }
    selectmenu: {
        position: 'absolute',
        top: '100%',
        backgroundColor: 'white',
        zIndex: 20,
        paddingHorizontal: 15,
        // paddingVertical:30,
        // marginHorizontal:2,
        borderRadius: 8,
        width: '100%',
        height: 150,
        // overflow:'scroll',
    },
    selectOption: {
        marginVertical: 10
    },
    selectOptionline: {
        height: 2,
        width: '100%',
        backgroundColor: '#0C0C0D1A',
    },
    optionText: {
        fontSize: 18,
    }
})
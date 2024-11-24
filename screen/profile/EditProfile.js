import { KeyboardAvoidingView, ScrollView, StyleSheet, Text, View } from "react-native";
import NavBack from "../../components/utills/NavBack";
import InputCom from "../../components/login-signup/InputCom";
import CustomButton from "../../components/onboard/CustomButton";
import useApiCalls from "../../api/useApiCalls";
import { useState } from "react";


function EditProfile({ route, navigation }) {

    const profile = route.params?.profile
    // console.log(profile);


    const [edit, setEdit] = useState(false)


    const { apiCall, loading, apiError, setApiError } = useApiCalls()

    const [updateData, setUpdateData] = useState({
        userName: profile?.userName,
        email: profile?.email,
        location: profile?.location,
        password: ''
    })

    const [error, setError] = useState({
        userName: '',
        email: '',
        location: '',
        password: ''
    })


    const validate = () => {
        let valid = true;
        let newErrors = {};

        Object.keys(updateData).forEach((key) => {
            if (!updateData[key]) {
                newErrors[key] = 'This field is required';
                valid = false;
            }
        });


        // if (isChecked) {
        //     setIconColor('');
        // } else {
        //     setIconColor('red');
        //     valid = false;
        // }

        setError(newErrors);
        return valid;
    };



    const handleOnChange = (value, key) => {
        setApiError('')

        setError((prev) => ({ ...prev, [key]: '' }))

        setUpdateData((prev) => ({ ...prev, [key]: value }))


        if (key === 'email') {
            if (!value) {
                setError((prev) => ({ ...prev, [key]: 'Enter a Valid Email' }));
            }
        }

        if (key === 'username') {
            if (!value) {
                setError((prev) => ({ ...prev, [key]: `Enter a Valid ${key}` }));
            }
        }

        if (key === 'password') {
            if (!/^(?=.*[A-Z])(?=.*\d)(?=.*[@$#!%*?&])[A-Za-z\d@$#!%*?&]{8,}$/.test(value)) {
                setError((prev) => ({ ...prev, [key]: 'Password is not strong' }));
            } else if (!value) {
                setError((prev) => ({ ...prev, [key]: 'Enter a Valid Password' }));
            }
        }
    }


    const handleOnBlur = (key) => {
        if (key === 'email') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(registerData.email)) {
                setError((prev) => ({ ...prev, [key]: 'Enter a Valid Email' }));
            }
        }

    }


    // console.log(registerData.image);
    const buttonExtraFun = async() => {
        const formData = new FormData();


        formData.append('userName', updateData.userName);
        formData.append('email', updateData.email);
        formData.append('location', updateData.location);
        formData.append('password', updateData.password);

        // console.log(formData);

        const response = await apiCall('patch', `updateUser/${profile._id}`, formData);

        if (response) {
            // console.log(response, 'API hit successfully');
            navigation.goBack();
        }
    }


return (
    <View style={styles.editCon}>
        <NavBack >Edit Profile</NavBack>

        <KeyboardAvoidingView style={{ flex: 1 }}>

            <ScrollView showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
                contentContainerStyle={{ flexGrow: 1 }}>

                <View style={styles.signupinput}>

                    {apiError && <View style={{ marginTop: 15 }}><Text style={{ textAlign: 'center', color: 'red' }}>{apiError}</Text></View>}


                    <InputCom label={'User Name'}
                        placeholder={'Enter UserName - Max 6 Characters'}
                        value={updateData.userName}
                        onChangeText={(value) => handleOnChange(value, 'userName')}
                        maxLength={7}
                        error={error.userName}
                        editable={edit} />

                    <InputCom label={'Email'} placeholder={'Enter Email Address'}
                        value={updateData.email}
                        onChangeText={(value) => handleOnChange(value, 'email')}
                        onBlur={() => handleOnBlur('email')}
                        error={error.email}
                        editable={edit}
                    />

                    {/* <InputCom label={'Phone number'} placeholder={'Enter Phone Number'}
                            phone={true}
                            keyboardType={'number-pad'}
                            maxLength={10}
                        /> */}

                    <InputCom label={'Location'}
                        placeholder={'Enter Location'}
                        value={updateData.location}
                        onChangeText={(value) => handleOnChange(value, 'location')}
                        error={error.location}
                        editable={edit}
                    />

                    {edit && <InputCom
                        icon={true}
                        placeholder={'Enter Password'}
                        label={'Password'}
                        value={updateData.password}
                        onChangeText={(value) => handleOnChange(value, 'password')}
                        error={error.password}
                    />

                    }
                    <CustomButton externalStyles={styles.btnsty}
                        externalFunction={loading ? '' :
                            edit ? buttonExtraFun : () => setEdit(true)}>
                        {edit ? 'Save Changes' : 'Edit'}</CustomButton>

                </View>

                <View>
                    {edit && <CustomButton background="transparent" color="blue"
                        externalFunction={loading ? '' : ''}
                    >Change PhoneNumber</CustomButton>}
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    </View>
)
}

export default EditProfile

const styles = StyleSheet.create({
    editCon: {
        flex: 1,
        marginTop: '15%',
        marginHorizontal: '5%',
    },
    signupinput: {
        marginTop: '5%',
        gap: 15
    },
    btnsty: {
        marginTop: '5%'
    },
})
import { Keyboard, ScrollView, StyleSheet, Text, TouchableWithoutFeedback, View } from "react-native";
import FormHead from "../../components/login-signup/FormHead";
import InputCom from "../../components/login-signup/InputCom";
import CustomButton from "../../components/onboard/CustomButton";
import { colors } from "../../components/utills/colors";
import { useEffect, useState } from "react";
import useApiCalls from "../../api/useApiCalls";
import { useSelector } from "react-redux";
import LoadingScreen from "../../components/utills/LoadingScreen";

function ForgotPassScreen({navigation,route}) {

    const [phoneNumber, setPhoneNumber] = useState(null)
    const [errors, setErrors] = useState(null)
    const { loading, apiError, apiCall, setApiError, responseData } = useApiCalls()

    // const token =useSelector((state)=>state.tempData?.token)


    const validate = () => {

        let validateErrors = null
        let valid = true

        if (!phoneNumber) {
            validateErrors = 'This Field is required'
            valid = false
        } else if (!/^\d{10}$/.test(phoneNumber)) {
            validateErrors = 'Phone number must be 10 digits';
            valid = false;
        }

        // console.log(errors);

        setErrors(validateErrors)

        if ((!errors)) {
            return valid
        }

    }


    const handlePhoneNumber = (value) => {
        setPhoneNumber(value)
        setErrors(null)
        setApiError(null)
        if (/^[12345]/.test(value)) {
            setErrors('Enter Vaild Phone Number')
        }
    }

    useEffect(()=>{
        if (responseData) {
            // console.log(responseData);
            navigation.navigate('ForgotOtp',{
                phoneNo:phoneNumber
            })
        }
    },[responseData])


    const hanlesubmit =() => {
        if (validate()) {
            const formdata = {
                phone: phoneNumber,
            };
            apiCall('api/forget-password', formdata)
        }

    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.forgotMainCon}>
                <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
                    <FormHead heading={'Secure Your Account'}
                        text={'Enter your Registed Phone Number'}
                    />

                    {apiError && <View style={{ marginTop: 15 }}><Text style={{textAlign:'center',color:'red'}}>{apiError}</Text></View>}

                    <View style={styles.forgotInput}>
                        <InputCom phone={true}  label={'Phone Number'}
                        placeholder={'Enter Phone Number'}
                            maxLength={10}
                            autoComplete={'tel'}
                            keyboardType={'number-pad'}
                            value={phoneNumber}
                            onChangeText={handlePhoneNumber}
                            error={errors}
                        />

                        <CustomButton background={colors.primary} externalFunction={hanlesubmit}
                        >Next</CustomButton>
                    </View>
                    {loading && <LoadingScreen/>}
                </ScrollView>
            </View>
        </TouchableWithoutFeedback>
    )
}

export default ForgotPassScreen

const styles = StyleSheet.create({
    forgotMainCon: {
        flex: 1,
        marginHorizontal: '5%',
        marginTop: '15%',
        gap: 20,
    },
    forgotInput: {
        marginTop:'8%',
        gap: 40
    }
})
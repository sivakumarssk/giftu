import { Keyboard, ScrollView, StyleSheet, Text, TouchableWithoutFeedback, View } from "react-native"
import FormHead from "../../components/login-signup/FormHead"
import InputCom from "../../components/login-signup/InputCom"
import CustomButton from "../../components/onboard/CustomButton"
import { colors } from "../../components/utills/colors"
import { useEffect, useState } from "react"
import useApiCalls from "../../api/useApiCalls"
import LoadingScreen from "../../components/utills/LoadingScreen"

function ChangePassScreen({ navigation, route }) {

    const token = route.params?.passwordToken

    // console.log(token);

    const [changePassword, setChangePassword] = useState({ password: null, rePassword: null });
    const [errors, setErrors] = useState({ password: '', rePassword: '' })
    const { apiCall, apiError, loading, setApiError,responseData } = useApiCalls()


    const validate = () => {

        let valid = true;

        if (!changePassword.password) {
            setErrors((prev) => ({ ...prev, password: 'This Field is Required' }))
            valid = false
        }
        if (!changePassword.rePassword) {
            setErrors((prev) => ({ ...prev, rePassword: 'This Field is Required' }))
            valid = false
        }
        if (!errors.password && !errors.rePassword) {
            return valid
        }

    }


    const handleOnChange = (value, field) => {
        setErrors((prev) => ({ ...prev, [field]: null }))
        setChangePassword((prev) => ({ ...prev, [field]: value }))
        setApiError(null)

        if (field === 'password') {
            const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;
            if (value && !passwordRegex.test(value)) {
                setErrors((prev) => ({ ...prev, password: 'Password is not strong' }))
            }
            if (value === changePassword.rePassword && changePassword.rePassword) {
                setErrors((prev) => ({ ...prev, rePassword: '' }))
            }
        }

        if (field === 'rePassword') {
            if (changePassword.password !== value) {
                setErrors((prev) => ({ ...prev, rePassword: 'Password is not matched' }))
            }
            if (!changePassword.password) {
                setErrors((prev) => ({ ...prev, password: 'This Field is Required' }))
            }
        }
    }


    const buttonExtraFun = async () => {

        if (validate()) {
            // console.log(getToken);
            const formData = { password: changePassword.password, 
                password_confirmation: changePassword.rePassword }
            apiCall('api/update-password', formData,token)
        }

    }

    useEffect(()=>{
        if(responseData){
            navigation.reset({
                index: 0,
                routes: [{ name: 'Login' }],
            });
        }
    },[responseData])

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.changeMainCon}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <FormHead heading={'Change Password'}
                        text={'Password must contain at least one uppercase letter, one number, one special character, and be at least 8 characters long.'} />

{apiError && <View style={{ marginTop: 15 }}><Text style={{textAlign:'center',color:'red'}}>{apiError}</Text></View>}

                    <View style={styles.changeinputCon}>
                        <InputCom icon={true}
                            placeholder={'Enter New Password'} label={'New Password'}
                            value={changePassword.password}
                            onChangeText={(value) => handleOnChange(value, 'password')}
                            error={errors.password} />

                        <InputCom icon={true} placeholder={'Re-Enter Password'} label={'Re-Password'}
                            value={changePassword.rePassword}
                            onChangeText={(value) => handleOnChange(value, 'rePassword')}
                            error={errors.rePassword} />

                        <CustomButton background={colors.primary}
                            externalStyles={styles.changebtn}
                            externalFunction={buttonExtraFun}
                        >Change</CustomButton>

                    </View>

                    {loading && <LoadingScreen/>}
                </ScrollView>
            </View>
        </TouchableWithoutFeedback>
    )
}

export default ChangePassScreen


const styles = StyleSheet.create({
    changeMainCon: {
        flex: 1,
        marginHorizontal: '5%',
        marginTop: '15%',
        gap: 25
    },
    changeinputCon: {
        marginTop: '8%',
        gap: 20
    },
    changebtn: {
        marginTop: '10%'
    }
})
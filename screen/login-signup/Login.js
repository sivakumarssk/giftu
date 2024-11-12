import { Keyboard, ScrollView, StyleSheet, Text, TouchableWithoutFeedback, View } from "react-native";
import FormHead from "../../components/login-signup/FormHead";
import RememberMe from "../../components/login-signup/RememberMe";
import CustomButton from "../../components/onboard/CustomButton";
import { colors } from "../../components/utills/colors";
import AlredyAccount from "../../components/login-signup/AlredyAccount";
import InputCom from "../../components/login-signup/InputCom";
import React, { useCallback, useEffect, useState } from "react";
import useApiCalls from "../../api/useApiCalls";
import * as SecureStore from 'expo-secure-store'

// const removeToken =async () =>{
//     await SecureStore.deleteItemAsync('accessToken')
//     await SecureStore.deleteItemAsync('refreshToken')
// }

function Login({ navigation }) {

    const [loginForm, setLoginForm] = useState({ phoneNumber: '', password: '' })
    const [errors, setErrors] = useState({ phoneNumber: null, password: null })
    const { loading, apiError, apiCall, setApiError } = useApiCalls()

    const [checked, setChecked] = useState(true)

    useEffect(() => {
        const loadSecureStoreData = async () => {
        // await removeToken()

            const phoneNumber = await SecureStore.getItemAsync('localphone');
            const password = await SecureStore.getItemAsync('localpass');
            setLoginForm({ phoneNumber: phoneNumber || '', password: password || '' });
        };
        loadSecureStoreData();

    }, []);

    // console.log(loginForm);
    
    const validate = () => {

        const validateErrors = { phoneNumber: '', password: '' }
        let valid = true

        if (!loginForm.phoneNumber) {
            validateErrors.phoneNumber = 'This Field is required'
            valid = false
        } else if (!/^\d{10}$/.test(loginForm.phoneNumber)) {
            validateErrors.phoneNumber = 'Phone number must be 10 digits';
            valid = false;
        }

        if (!loginForm.password) {
            validateErrors.password = 'Password is Required'
            valid = false
        }


        // console.log(errors);

        setErrors(validateErrors)
        if ((!errors.password && !errors.phoneNumber)) {
            return valid
        }

    }


    const handleOnChange = (value, field) => {
        setLoginForm((prev) => ({ ...prev, [field]: value }))
        setErrors((prev) => ({ ...prev, [field]: null }))
        setApiError(null)

        if (field === 'phoneNumber') {
            if (/^[12345]/.test(value)) {
                setErrors((prev) => ({ ...prev, phoneNumber: 'Enter Vaild Phone Number' }))
            }
        }
        if (field === 'password') {
            const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$#!%*?&])[A-Za-z\d@$#!%*?&]{8,}$/;
            if (value && !passwordRegex.test(value)) {
                setErrors((prev) => ({ ...prev, password: 'Password is not strong' }))
            }
        }
    }


    const hanlesubmit = async() => {
        if (validate()) {
            const formdata = {
                phone: loginForm.phoneNumber,
                password: loginForm.password
            };

            const response=await apiCall('post','login', formdata)

            if (response) {            
                // console.log('inner');
                navigation.replace('HomeScreen')
                if(checked){
                    await SecureStore.setItemAsync('localphone',loginForm.phoneNumber)
                    await SecureStore.setItemAsync('localpass',loginForm.password)
                }
            }

        }

    }

    

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.loginMainCon}>

                <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">

                    <View style={styles.welcomeData}>
                        <FormHead
                            heading={'Hi, Welcome Back!  👋'}
                            text={'Hello again, you’ve been missed!'}
                        />
                    </View>

                    {apiError && <View style={{ marginTop: 15 }}><Text style={{ textAlign: 'center', color: 'red' }}>{apiError}</Text></View>}

                    <View style={styles.loginInputCon}>
                        <InputCom
                            label={'Phone Number'}
                            placeholder={'Enter Phone Number'}
                            maxLength={10}
                            phone={true}
                            keyboardType={"number-pad"}
                            autoComplete={'tel'}
                            value={loginForm.phoneNumber}
                            onChangeText={(value) => handleOnChange(value, 'phoneNumber')}
                            error={errors.phoneNumber}
                        />
                        <InputCom
                            icon={true}
                            placeholder={'Please Enter Your Password'}
                            label={'Password'}
                            value={loginForm.password}
                            onChangeText={(value)=>handleOnChange(value,'password')}
                            error={errors.password}
                        />
                        <RememberMe forgot={true} checked={checked} setChecked={setChecked} />
                    </View>

                    <View style={styles.loginButton}>
                        <CustomButton background={colors.primary} externalFunction={loading? '': hanlesubmit}
                        >Log in</CustomButton>

                        <AlredyAccount clickText={' Create Account'} direction={'SignUpScreen'}
                        >Don’t have an account? </AlredyAccount>
                    </View>
                </ScrollView>
            </View>
        </TouchableWithoutFeedback>
    )
}

export default Login


const styles = StyleSheet.create({
    loginMainCon: {
        flex: 1,
        marginHorizontal: '5%',
        // gap:80,
        marginTop: '15%'
    },
    loginInputCon: { gap: 20, marginTop: '5%' },
    loginButton: { gap: 30, marginTop: '8%' },
})
import { KeyboardAvoidingView, ScrollView, StyleSheet, View } from "react-native";
import FormHead from "../../components/login-signup/FormHead";
import InputCom from "../../components/login-signup/InputCom";
import RememberMe from "../../components/login-signup/RememberMe";
import CustomButton from "../../components/onboard/CustomButton";
import { colors } from "../../components/utills/colors";
import AlredyAccount from "../../components/login-signup/AlredyAccount";
import { useState } from "react";
import useApiCalls from "../../api/useApiCalls";
import ImagePick from "../../components/utills/ImagePick";

function SignUpScreen({ navigation }) {
    const { apiCall, loading, apiError } = useApiCalls()

    const [registerData, setRegisterData] = useState({
        userName: '',
        email: '',
        phone: '',
        password: ''
    })

    const [error, setError] = useState({
        userName: '',
        email: '',
        phone: '',
        password: ''
    })


    const validate = () => {
        let valid = true;
        let newErrors = {};

        Object.keys(registerData).forEach((key) => {
            if (!registerData[key]) {
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

        setError((prev) => ({ ...prev, [key]: '' }))

        setRegisterData((prev) => ({ ...prev, [key]: value }))


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

        if (key === 'phone') {
            if (/^[12345]/.test(value)) {
                setError((prev) => ({ ...prev, [key]: 'Enter a Valid Phone Number' }));
            } else if (!value) {
                setError((prev) => ({ ...prev, [key]: 'Enter a Valid Phone Number' }));
            }
        }

        if (key === 'password') {
            if (!/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(value)) {
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

        if (key === 'phone') {
            if (!/^\d{10}$/.test(registerData.phone)) {
                setError((prev) => ({ ...prev, [key]: 'Enter a Valid 10 digit Phone Number' }));
            }
        }

    }


    const buttonExtraFun = async () => {
        if (validate() && Object.values(error).every(error => !error)) {
            const formData = new FormData();

            formData.append('name', registerData.userName);
            formData.append('email', registerData.email);
            formData.append('phone', registerData.phone);
            formData.append('password', registerData.password);

            // console.log(formData);
            try {
                const response = await apiCall('api/register', formData, '');
                if (response) {
                    // console.log(response, 'API hit successfully');
                    navigation.navigate('OtpVerify');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        }
    };

    return (
        <View style={styles.signupMainCon}>

            <KeyboardAvoidingView style={{ flex: 1 }}>

                <ScrollView showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps="handled"
                    contentContainerStyle={{ flexGrow: 1 }}>

                    <FormHead
                        heading={'Create an account'}
                        text={'Connect with your friends today!'} />

                    {apiError && <View style={{ marginTop: 15 }}><Text style={{ textAlign: 'center', color: 'red' }}>{apiError}</Text></View>}

                    <View style={styles.signupinput}>

                        <ImagePick />

                        <InputCom label={'User Name'} placeholder={'Enter UserName - Max 6 Characters'}
                            value={registerData.userName}
                            onChangeText={(value) => handleOnChange(value, 'userName')}
                            maxLength={6} error={error.userName} />

                        <InputCom label={'Email'} placeholder={'Enter Email Address'}
                            value={registerData.email}
                            onChangeText={(value) => handleOnChange(value, 'email')}
                            error={error.email} onBlur={() => handleOnBlur('email')} />

                        <InputCom label={'Phone number'} placeholder={'Enter Phone Number'}
                            phone={true} value={registerData.phone}
                            onChangeText={(value) => handleOnChange(value, 'phone')}
                            error={error.phone}
                            onBlur={() => handleOnBlur('phone')}
                            maxLength={10}
                        />

                        <InputCom label={'Location'}
                            placeholder={'Enter Location'} />

                        <InputCom label={'Password'} placeholder={'Enter New Password'}
                            icon={true} value={registerData.password}
                            onChangeText={(value) => { handleOnChange(value, 'password') }}
                            error={error.password} />

                        <RememberMe />
                    </View>

                    <View style={styles.signUpBtn}>

                        <CustomButton externalFunction={buttonExtraFun}
                            background={colors.primary}>Sign Up</CustomButton>

                        <AlredyAccount direction={'Login'}
                            clickText={' Log in'}>Already have an account? </AlredyAccount>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </View>
    )
}

export default SignUpScreen


const styles = StyleSheet.create({
    signupMainCon: {
        flex: 1,
        marginHorizontal: '5%',
        marginTop: '15%',
        // gap: 20
    },
    signupinput: {
        flex: 1,
        marginTop: '5%',
        gap: 10
    },
    signUpBtn: {
        marginVertical: '5%',
        flex: 9,
        gap: 20
    }
})
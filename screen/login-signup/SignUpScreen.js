import { KeyboardAvoidingView, ScrollView, StyleSheet, View } from "react-native";
import FormHead from "../../components/login-signup/FormHead";
import InputCom from "../../components/login-signup/InputCom";
import RememberMe from "../../components/login-signup/RememberMe";
import CustomButton from "../../components/onboard/CustomButton";
import { colors } from "../../components/utills/colors";
import AlredyAccount from "../../components/login-signup/AlredyAccount";

function SignUpScreen() {
    return (
        <View style={styles.signupMainCon}>

            <KeyboardAvoidingView style={{flex:1}}>

                <ScrollView contentContainerStyle={{flexGrow:1}}>

            <FormHead
                heading={'Create an account'}
                text={'Connect with your friends today!'} />
            <View style={styles.signupinput}>
                <InputCom label={'User Name'} placeholder={'Enter UserName'} />
                <InputCom label={'Email'} placeholder={'Enter Email Address'} />
                <InputCom label={'Phone number'} placeholder={'Enter Phone Number'}
                    phone={true} />
                <InputCom label={'Password'} placeholder={'Enter New Password'}
                    icon={true} />
                <RememberMe />
            </View>

            <View style={styles.signUpBtn}>

                <CustomButton direction={'OtpVerify'}
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
    signupinput:{
        flex:1,
        marginTop:'8%',
        gap:10
    },
    signUpBtn:{
        marginTop:'5%',
        flex:9,
        gap:20
    }
})
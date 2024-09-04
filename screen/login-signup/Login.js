import { Keyboard, KeyboardAvoidingView, ScrollView, StyleSheet, TouchableWithoutFeedback, View } from "react-native";
import FormHead from "../../components/login-signup/FormHead";
import RememberMe from "../../components/login-signup/RememberMe";
import CustomButton from "../../components/onboard/CustomButton";
import { colors } from "../../components/utills/colors";
import AlredyAccount from "../../components/login-signup/AlredyAccount";
import InputCom from "../../components/login-signup/InputCom";

function Login() {
    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.loginMainCon}>

                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={styles.welcomeData}>
                        <FormHead
                            heading={'Hi, Welcome Back!  👋'}
                            text={'Hello again, you’ve been missed!'}
                        />
                    </View>

                    <View style={styles.loginInputCon}>
                        <InputCom
                            label={'Phone Number'}
                            placeholder={'Enter Phone Number'}
                            maxLength={10}
                            phone={true}
                            keyboardType={"number-pad"}
                            autoComplete={'tel'}
                        />
                        <InputCom 
                            icon={true}
                            placeholder={'Please Enter Your Password'}
                            label={'Password'} 
                        />
                        <RememberMe forgot={true}/>
                    </View>

                    <View style={styles.loginButton}>
                        <CustomButton background={colors.primary} direction={'HomeScreen'}
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
        marginTop:'15%'
    },
    loginInputCon:{gap:20,marginTop:'8%'},
    loginButton:{gap:30,marginTop:'8%'},
})
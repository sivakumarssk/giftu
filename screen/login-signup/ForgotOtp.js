import { Keyboard, ScrollView, StyleSheet, TouchableWithoutFeedback, View } from "react-native";
import FormHead from "../../components/login-signup/FormHead";
import OtpInput from "../../components/login-signup/OtpInput";

function ForgotOtp() {
    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.mainCon}>
            <ScrollView showsVerticalScrollIndicator={false}>
                    <FormHead heading={'Enter Verification code'} externalStyles={styles.con}
                        text={'We have sent the verification code to your Phone number'} />

                    <OtpInput />
                </ScrollView>
            </View>
        </TouchableWithoutFeedback>
    )
}

export default ForgotOtp

const styles = StyleSheet.create({
    mainCon: {
        flex: 1,
        marginTop: '15%',
    },
    con: {
        marginHorizontal: '5%'
    }
})
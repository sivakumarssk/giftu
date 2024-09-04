import { Keyboard, StyleSheet, TouchableWithoutFeedback, View } from "react-native";
import OtpInput from "../../components/login-signup/OtpInput";
import FormHead from "../../components/login-signup/FormHead";

function OtpVerify() {
    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.mainCon}>
            <FormHead heading={'Enter Verification code'} externalStyles={styles.con}
            text={'We have sent the verification code to your Phone number'}/>

            <OtpInput/>
        </View>
        </TouchableWithoutFeedback>
    )
}

export default OtpVerify

const styles=StyleSheet.create({
    mainCon:{
        flex:1,
        marginTop:'15%',
    },
    con:{
        marginHorizontal:'5%'
    }
})
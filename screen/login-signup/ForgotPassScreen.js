import { Keyboard, ScrollView, StyleSheet, TouchableWithoutFeedback, View } from "react-native";
import FormHead from "../../components/login-signup/FormHead";
import InputCom from "../../components/login-signup/InputCom";
import CustomButton from "../../components/onboard/CustomButton";
import { colors } from "../../components/utills/colors";

function ForgotPassScreen() {
    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.forgotMainCon}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <FormHead heading={'Secure Your Account'}
                        text={'Enter your Registed Phone Number'}
                    />

                    <View style={styles.forgotInput}>
                        <InputCom phone={true}  label={'Phone Number'}
                        placeholder={'Enter Phone Number'}
                            maxLength={10}
                            autoComplete={'tel'}
                            keyboardType={'number-pad'}
                        />

                        <CustomButton background={colors.primary} direction={'ForgotOtp'}
                        >Next</CustomButton>
                    </View>
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
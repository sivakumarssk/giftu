import { KeyboardAvoidingView, ScrollView, StyleSheet, View } from "react-native";
import InputCom from "../../components/login-signup/InputCom";
import NavBack from "../../components/utills/NavBack";
import CustomButton from "../../components/onboard/CustomButton";

function ChangePassword() {
    return (

        <View style={styles.changePasswordCon}>

            <NavBack>Change Password</NavBack>

            <KeyboardAvoidingView style={{ flex: 1 }}>

                <ScrollView showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps="handled"
                    contentContainerStyle={{ flexGrow: 1 }}>

                    <View style={styles.formCon}>
                        <InputCom
                            icon={true}
                            placeholder={'Enter Old Password'}
                            label={'Old Password'}
                        // value={loginForm.password}
                        // onChangeText={(value)=>handleOnChange(value,'password')}
                        // error={errors.password}
                        />
                        <InputCom
                            icon={true}
                            placeholder={'Enter New Password'}
                            label={'New Password'}
                        // value={loginForm.password}
                        // onChangeText={(value)=>handleOnChange(value,'password')}
                        // error={errors.password}
                        />
                        <InputCom
                            icon={true}
                            placeholder={'Re-Enter Your Password'}
                            label={'Re-Enter New Password'}
                        // value={loginForm.password}
                        // onChangeText={(value)=>handleOnChange(value,'password')}
                        // error={errors.password}
                        />

                        <CustomButton>Save Changes</CustomButton>
                    </View>

                </ScrollView>
            </KeyboardAvoidingView>
        </View>
    )
}

export default ChangePassword

const styles = StyleSheet.create({
    changePasswordCon: {
        flex:1,
        marginTop: '15%',
        marginHorizontal: '5%',
    },
    formCon: {
        marginTop: '10%',
        gap: 25
    },
})
import { KeyboardAvoidingView, ScrollView, StyleSheet, View } from "react-native";
import NavBack from "../../components/utills/NavBack";
import InputCom from "../../components/login-signup/InputCom";
import CustomButton from "../../components/onboard/CustomButton";


function EditProfile() {
    return (
        <View style={styles.editCon}>
            <NavBack>Edit Profile</NavBack>

            <KeyboardAvoidingView style={{ flex: 1 }}>

                <ScrollView showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps="handled"
                    contentContainerStyle={{ flexGrow: 1 }}>

                    <View style={styles.signupinput}>


                        <InputCom label={'User Name'} placeholder={'Enter UserName - Max 6 Characters'}
                            maxLength={6} />

                        <InputCom label={'Email'} placeholder={'Enter Email Address'} />

                        <InputCom label={'Phone number'} placeholder={'Enter Phone Number'}
                            phone={true}
                            keyboardType={'number-pad'}
                            maxLength={10}
                        />

                        <InputCom label={'Location'} 
                        placeholder={'Enter Location'} />

                        <CustomButton externalStyles={styles.btnsty}>Save Changes</CustomButton>

                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </View>
    )
}

export default EditProfile

const styles = StyleSheet.create({
    editCon: {
        flex: 1,
        marginTop: '15%',
        marginHorizontal: '5%',
    },
    signupinput: {
        marginTop: '5%',
        gap: 15
    },
    btnsty:{
        marginVertical:'5%'
    },
})
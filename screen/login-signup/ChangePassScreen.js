import { Keyboard, ScrollView, StyleSheet, TouchableWithoutFeedback, View } from "react-native"
import FormHead from "../../components/login-signup/FormHead"
import InputCom from "../../components/login-signup/InputCom"
import CustomButton from "../../components/onboard/CustomButton"
import { colors } from "../../components/utills/colors"

function ChangePassScreen(){
    return(
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.changeMainCon}>
        <ScrollView showsVerticalScrollIndicator={false}>
            <FormHead heading={'Change Password'} 
            text={'Password must contain at least one uppercase letter, one number, one special character, and be at least 8 characters long.'}/>

          <View style={styles.changeinputCon}>
            <InputCom icon={true} 
            placeholder={'Enter New Password'} label={'New Password'}/>
            <InputCom icon={true} placeholder={'Re-Enter Password'} label={'Re-Password'}/>

            <CustomButton background={colors.primary} externalStyles={styles.changebtn}
            >Change</CustomButton>
            </View>
            </ScrollView>
        </View>
        </TouchableWithoutFeedback>
    )
}

export default ChangePassScreen


const styles=StyleSheet.create({
    changeMainCon:{
        flex:1,
        marginHorizontal:'5%',
        marginTop:'15%',
        gap:25
    },
    changeinputCon:{
        marginTop:'8%',
        gap:20
    },
    changebtn:{
        marginTop:'10%'
    }
})
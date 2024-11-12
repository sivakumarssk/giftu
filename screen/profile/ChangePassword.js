import { Alert, KeyboardAvoidingView, ScrollView, StyleSheet, Text, View } from "react-native";
import InputCom from "../../components/login-signup/InputCom";
import NavBack from "../../components/utills/NavBack";
import CustomButton from "../../components/onboard/CustomButton";
import { useState } from "react";
import useApiCalls from "../../api/useApiCalls";

function ChangePassword({navigation}) {

    const { apiCall,loading,apiError,setApiError } =useApiCalls()

    const [changePassForm,setChangePassForm] = useState({
        oldPassword:null,
        newPassword:null,
        reNewPassword:null
    })

    const [error,setError] = useState({
        oldPassword:null,
        newPassword:null,
        reNewPassword:null
    })


    const validate =()=>{
        let valid = true;
        let newErrors = {};

        Object.keys(changePassForm).forEach((key)=>{
            if(!changePassForm[key]){
                newErrors[key] ='This Field is Required';
                valid = false;
            }
        })

        // console.log(newErrors);
        

        setError(newErrors);
        return valid;
    }


    const handleOnChange =(value,key)=>{
        setApiError('')
        setError((prev)=>({...prev,[key]:''}))

        setChangePassForm((prev)=>({...prev,[key]:value}))

        if((key === 'newPassword')||(key === 'reNewPassword')){
            if (!/^(?=.*[A-Z])(?=.*\d)(?=.*[@$#!%*?&])[A-Za-z\d@$#!%*?&]{8,}$/.test(value)) {
                setError((prev) => ({ ...prev, [key]: 'Password is not strong' }));
            } else if (!value) {
                setError((prev) => ({ ...prev, [key]: 'Enter a Valid Password' }));
            }
        }
    }

    const handleSubmit =async()=>{
        if(validate() && Object.values(error).every(error => !error)){

            const formData =new FormData()

            formData.append('password',changePassForm.oldPassword);
            formData.append('newPassword',changePassForm.newPassword);
            formData.append('confirmNewPassword',changePassForm.reNewPassword);

            const response =await apiCall('post','updatePassword',formData);

            if(response){
                // console.log(response);
                
                Alert.alert('Success',response.message,[
                    {
                        text:'Okay',
                        onPress:()=>navigation.goBack()
                    }
                ])
            }

        }
    }


    return (

        <View style={styles.changePasswordCon}>

            <NavBack>Change Password</NavBack>

            <KeyboardAvoidingView style={{ flex: 1 }}>

                <ScrollView showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps="handled"
                    contentContainerStyle={{ flexGrow: 1 }}>

                    <View style={styles.formCon}>

                    {apiError && <View style={{ marginTop: 15 }}><Text style={{ textAlign: 'center', color: 'red' }}>{apiError}</Text></View>}

                        <InputCom
                            icon={true}
                            placeholder={'Enter Old Password'}
                            label={'Old Password'}
                            value={changePassForm.oldPassword}
                            onChangeText={(value)=>handleOnChange(value,'oldPassword')}
                            error={error.oldPassword}
                        />
                        <InputCom
                            icon={true}
                            placeholder={'Enter New Password'}
                            label={'New Password'}
                            value={changePassForm.newPassword}
                            onChangeText={(value)=>handleOnChange(value,'newPassword')}
                            error={error.newPassword}
                        />
                        <InputCom
                            icon={true}
                            placeholder={'Re-Enter Your Password'}
                            label={'Re-Enter New Password'}
                            value={changePassForm.reNewPassword}
                            onChangeText={(value)=>handleOnChange(value,'reNewPassword')}
                            error={error.reNewPassword}
                        />

                        <CustomButton externalFunction={handleSubmit}
                        >Save Changes</CustomButton>
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
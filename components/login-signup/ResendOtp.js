import { Pressable, StyleSheet, Text, View } from "react-native"
import { colors } from "../utills/colors"
import React, { useEffect, useRef, useState } from "react"
import useApiCalls from "../../api/useApiCalls"

function ResendOtp({phoneNo,endPoint,formKey,setApiError}){

    const [isresend,setReSend]=useState(false)
    const[sendmsg,setSendMsg]=useState('')
    const [count, setCount] = useState(60);  // Use state for count

    const {apiError,apiCall}=useApiCalls()

    const handlePhoneSubmit=async()=>{
            const formdata ={[formKey]:phoneNo}
            const response =await apiCall('post',endPoint, formdata)

            if(response){
                setSendMsg('OTP! send')
                  setCount(60);  // Reset the timer
    
                  // Start the countdown again
                  const timer = setInterval(() => {
                      setCount(prev => {
                          if (prev === 1) {
                              clearInterval(timer);  // Stop the timer at 0
                              setReSend(true);
                          }
                          return prev - 1;
                      });
                  }, 1000);
            }
    }

    const handleReSend=()=>{

        handlePhoneSubmit();
        setTimeout(()=>{
            setSendMsg('')
            setReSend(true)
        },60000)
        setReSend(false)
    }

    useEffect(()=>{
        setSendMsg('OTP! send')
        const timer = setInterval(() => {
            setCount(prev => {
                if (prev === 1) {
                    clearInterval(timer);  // Stop the timer at 0
                    setReSend(true);
                }
                return prev - 1;
            });
        }, 1000);

        const initialTime=setTimeout(()=>{
            setSendMsg('')
            setReSend(true)
        },60000)
        
        return()=>clearTimeout(initialTime)
    },[])

    // useEffect(()=>{
    //     setIsLoading(loading)
    // },[loading])

    return(
        <View>
            {sendmsg && <Text style={styles.time}>Time: {count}s</Text>}
            <Pressable onPress={isresend ? handleReSend : null} style={styles.resendCon}>
                <Text style={[!isresend?styles.resend:styles.waitResend,styles.resendText]}>Resend code</Text>
            </Pressable>
              {sendmsg && <Text style={styles.sendmsgText}>{sendmsg}</Text>}
              {apiError && <Text style={styles.errorApi}>{apiError}</Text>}
        </View>
    )
}

export default React.memo(ResendOtp)

const styles =StyleSheet.create({
    resendCon:{
        marginVertical:20
    },
    resendText:{
        textAlign:'center'
    },
    resend:{
        color:colors.phoneLine,
        fontWeight:'500',
        fontFamily:'Manrope-semiBold'  
    },
    waitResend:{
        color:colors.primary,
         fontWeight:'500',
        fontFamily:'Manrope-semiBold'
    },
    sendmsgText:{
        textAlign:'center',
        color:colors.primary,
         fontWeight:'500',
        fontFamily:'Manrope-semiBold'
    },
    time:{
        textAlign:'center',
        color:'#B6B6B6',
        marginTop:20,
        fontWeight:'500',
        fontFamily:'Manrope-semiBold'
    },
    errorApi:{
        textAlign:'center',
        color:'red',
        fontSize:12,
       
    }
})
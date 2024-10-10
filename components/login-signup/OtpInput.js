import { StyleSheet, Text, TextInput, View } from "react-native"
import { useEffect, useRef, useState } from "react"
import { useNavigation } from "@react-navigation/native";
import { colors } from "../utills/colors";
import ResendOtp from "./ResendOtp";
import useApiCalls from "../../api/useApiCalls";

function OtpInput({ phoneNo, setIsLoading, endPoint, direction }) {

    // console.log(userPhoneNumber);
    
    const navigation = useNavigation()
    const { loading, apiError, setApiError, apiCall, responseData } = useApiCalls()

    const [error,setError]=useState(false)
    const input1ref = useRef(null);
    const input2ref = useRef(null);
    const input3ref = useRef(null)
    const input4ref = useRef(null);


    // const [editableState, setEditableState] = useState({
    //     input1: true,
    //     input2: false,
    //     input3: false,
    //     input4: false,
    // });

    const [inputValue, setInputValue] = useState({
        input1: '',
        input2: '',
        input3: '',
        input4: '',
    })


    const [inputColor, setInputColor] = useState({
        input1: colors.phoneLine,
        input2: colors.phoneLine,
        input3: colors.phoneLine,
        input4: colors.phoneLine,
    })

    const refs = [input1ref, input2ref, input3ref, input4ref];

    const handleChange = (value, ref, ref2, inputname) => {
        setError(false)
        setApiError(null)

        // Regular expression to allow only numbers
        const numberOnlyRegex = /^[0-9]*$/;

        // Check if the value is a number
        if (numberOnlyRegex.test(value)) {
            setInputValue((prev) => ({ ...prev, [inputname]: value }));
            setInputColor((prev) => ({ ...prev, [inputname]: colors.phoneLine }));

            if (value.length === 1 && ref.current) {
                ref.current.focus();
                // ref.current.value('')
                // setEditableState((prev) => ({ ...prev, [inputname]: false }));
                const nextRef = getNextEmptyRef(ref2);
                if (nextRef) {
                    nextRef.current.focus();
                }
            }
            if (value.length === 0 && ref2.current) {
                // ref2.current.focus();
                setInputColor((prev) => ({ ...prev, [inputname]: 'green' }));
            }
        } else {
            // If the value is not a number, set the color to red and reset the value
            setInputColor((prev) => ({ ...prev, [inputname]: 'red' }));
            setInputValue((prev) => ({ ...prev, [inputname]: '' }));
        }
    };

    const handleKeyPress = (e, ref, ref2, inputname, prevInput) => {
        if (e.nativeEvent.key === 'Backspace') {
            if (ref2.current && inputValue[inputname] === '') {
                ref2.current.focus()
                setInputValue((prev) => ({ ...prev, [prevInput]: '' }));
                setInputColor((prev) => ({ ...prev, [inputname]: colors.phoneLine }));
            }
        }
    }

    const getNextEmptyRef = (currentRef = null) => {
        for (const [index, ref] of refs.entries()) {
            if (inputValue[`input${index + 1}`] === '') {
                if (currentRef === null || ref !== currentRef) {
                    return ref;
                }
            }
        }
        return null
    }
    // const handleFocus = () => {

    //     const emptyRef = getNextEmptyRef ();
    //     if (emptyRef) {
    //         emptyRef.current.focus();
    //     }

    // };

    const handleOnFocus = (ref, inputName) => {
        // console.log(value);
        // setEditableState((prev) => ({ ...prev, [inputName]: true }));
        setInputColor((prev) => ({ ...prev, [inputName]: 'green' }))
        const emptyRef = getNextEmptyRef();
        if (emptyRef && inputValue[inputName] === '' && emptyRef !== ref) {
            emptyRef.current.focus();
        }
    }


    const combinedString = `${inputValue.input1}${inputValue.input2}${inputValue.input3}${inputValue.input4}`;
    const handleSubmit = async () => {

        // if (combinedString!=='1234'){
        //     setError(true)
        // }else {
        //     navigation.reset({
        //         index: 0,
        //         routes: [{ name: direction }],
        //     });
        // }
        // console.log('entered');
        const formdata = {
            phone: phoneNo,
            otp: combinedString
        }
        // console.log(combinedString);
         apiCall(endPoint, formdata)

        // if (response) {
        //     // console.log(response.token);
        //     // welcomeAsyncstorage('token',response.token)
        //     const tokenStatus = updateToken(response.token);

        //     if (tokenStatus) {
        //         navigation.navigate(direction)
        //     }

        // }
    }

    useEffect(()=>{
        if(responseData){
            // console.log(responseData);
            
            navigation.replace(direction,{
             passwordToken:responseData.token
            })
        }
    },[responseData])


    useEffect(() => {
        if (combinedString.length === 4) {
            handleSubmit();
        }
    }, [inputValue]);

    useEffect(() => {
        setIsLoading(loading)
    }, [loading])


    useEffect(() => {
        if (apiError) {
            setInputColor({
                input1: 'red',
                input2: 'red',
                input3: 'red',
                input4: 'red',
            });
        }else {
            setInputColor({
                input1: colors.phoneLine,
                input2: colors.phoneLine,
                input3: colors.phoneLine,
                input4: colors.phoneLine,
            })
        }
    }, [apiError]);

    useEffect(() => {
        if (error) {
            setInputColor({
                input1: 'red',
                input2: 'red',
                input3: 'red',
                input4: 'red',
            });
        }else {
            setInputColor({
                input1: colors.phoneLine,
                input2: colors.phoneLine,
                input3: colors.phoneLine,
                input4: colors.phoneLine,
            })
        }
    }, [error]);

    // console.log(inputColor.input1);
    return (
        <View style={styles.mainCon}>
            <View style={styles.apierrorCon}>
                {apiError && <Text style={styles.apierrorText}>{apiError ? apiError : ''}</Text>}
            </View>
            <View style={styles.otpInnerCon}>
                <TextInput
                    style={[inputColor.input1 ? { borderColor: inputColor.input1 } || styles.focusBorder
                        : { borderColor: inputColor.input1 }, styles.otpInputs, { opacity: 1 }]}
                    maxLength={1}
                    keyboardType={'number-pad'}
                    ref={input1ref}
                    onFocus={() => setInputColor((prev) => ({ ...prev, input1: 'green' }))}
                    onBlur={() => { setInputColor((prev) => ({ ...prev, input1: colors.phoneLine })) }}
                    onChangeText={(value) => handleChange(value, input2ref, input1ref, 'input1')}
                    value={inputValue.input1}
                    // editable={editableState.input1}
                    onKeyPress={(e) => handleKeyPress(e, input1ref, '', 'input1', '')}
                    autoComplete="sms-otp"
                />

                <TextInput
                    style={[inputColor.input2 ? { borderColor: inputColor.input2 } || styles.focusBorder : { borderColor: inputColor.input2 }, styles.otpInputs]}
                    maxLength={1} keyboardType={'number-pad'}
                    ref={input2ref}
                    onFocus={() => handleOnFocus(input2ref, 'input2')}
                    onBlur={() => { setInputColor((prev) => ({ ...prev, input2: colors.phoneLine })) }}
                    onChangeText={(value) => handleChange(value, input3ref, input2ref, 'input2')}
                    value={inputValue.input2}
                    // editable={editableState.input2}
                    onKeyPress={(e) => handleKeyPress(e, input2ref, input1ref, 'input2', 'input1')}
                    autoComplete="sms-otp"
                />

                <TextInput
                    style={[inputColor.input3 ? { borderColor: inputColor.input3 } || styles.focusBorder : { borderColor: inputColor.input3 }, styles.otpInputs]}
                    maxLength={1} keyboardType={'number-pad'}
                    ref={input3ref}
                    onFocus={() => handleOnFocus(input3ref, 'input3')}
                    onBlur={() => { inputColor.input3 !== 'red' ? setInputColor((prev) => ({ ...prev, input3: colors.phoneLine })) : '' }}
                    onChangeText={(value) => handleChange(value, input4ref, input3ref, 'input3')}
                    value={inputValue.input3}
                    // editable={editableState.input3}
                    onKeyPress={(e) => handleKeyPress(e, input3ref, input2ref, 'input3', 'input2')}
                    autoComplete="sms-otp"
                />


                <TextInput
                    style={[inputColor.input4 ? { borderColor: inputColor.input4 } || styles.focusBorder : { borderColor: inputColor.input4 }, styles.otpInputs]}
                    maxLength={1} keyboardType={'number-pad'}
                    onFocus={() => handleOnFocus(input4ref, 'input4')}
                    onBlur={() => { inputColor.input4 !== 'red' ? setInputColor((prev) => ({ ...prev, input4: colors.phoneLine })) : '' }}
                    onChangeText={(value) => handleChange(value, input4ref, input4ref, 'input4')}
                    ref={input4ref}
                    value={inputValue.input4}
                    onKeyPress={(e) => handleKeyPress(e, input4ref, input3ref, 'input4', 'input3')}
                    // editable={editableState.input4}
                    autoComplete="sms-otp"
                />
            </View>
            <ResendOtp phoneNo={phoneNo} endPoint={'api/forget-password'} setIsLoading={setIsLoading}
            formKey={'phone'}/>
        </View>
    )
}

export default OtpInput

const styles = StyleSheet.create({
    mainCon: {
        // marginTop:30,
    },
    otpInnerCon: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 20
    },
    otpInputs: {
        opacity: 1,
        borderWidth: 1.6,
        borderRadius: 8,
        fontSize: 24,
        fontWeight: '700',
        padding: 14,
        paddingHorizontal: 17,
        textAlign: 'center',
    },
    focusBorder: {
        borderColor: 'green'
    },
    noFocusBorder: {
        borderColor: colors.phoneLine,
    },
    apierrorCon: {
        marginVertical: 20,
    },
    apierrorText: {
        textAlign: 'center',
        color: 'red'
    },

})
import { StyleSheet, Text, TextInput, View } from "react-native"
import { colors } from "../utills/colors"
import PressableItem from "../utills/PressableItem"
import { Ionicons } from "@expo/vector-icons"
import { useState } from "react"


function InputCom({ label,placeholder,maxLength,phone=false,onFocus,editable,multiline=false,
    extrernalInput,
    keyboardType,autoComplete,icon,value,onChangeText,onBlur,error,labelStyles=false }) {

        const [passwordVisible,setPasswordVisible]=useState(true)

        // console.log(passwordVisible);
        

        function iconChange(){
            setPasswordVisible(!passwordVisible)
        }

    return (
        <View style={styles.phoneInputMainCon}>
            <Text style={[styles.labelText,labelStyles?styles.label:'']}>{label}</Text>
            <View style={styles.inputCon}>
                {phone && <>
                <Text>+91</Text>
                <View style={styles.line}></View>
                </>}
                <TextInput style={[styles.phoneInput,extrernalInput]}
                placeholder={placeholder}
                maxLength={maxLength}
                keyboardType={keyboardType}
                secureTextEntry={icon?passwordVisible :false}
                autoComplete={autoComplete}
                value={value}
                onChangeText={onChangeText}
                onBlur={onBlur}
                onFocus={onFocus}
                editable={editable}
                multiline={multiline}            
                />

                { icon && <PressableItem externalFunction={iconChange}>
                    <Ionicons name={!passwordVisible?"eye-off" :'eye'} size={18} color={'grey'}/>
                </PressableItem>
                }

            </View>
            {error && <Text style={{color:'red'}}>{error}</Text>}
        </View>
    )
}

export default InputCom

const styles=StyleSheet.create({
    phoneInputMainCon:{
        // marginHorizontal:'5%',
        // gap:10,
    },
    labelText:{
        marginBottom:10,
        fontSize:14,
        fontWeight:'600',
        fontFamily:'Manrope-Medium',
        color:colors.formLable
    },
    label:{
        fontSize:14,
        fontWeight:'600',
        fontFamily:'Manrope-Medium',
        color:'black'
    },
    inputCon:{
        flexDirection:'row',
        alignItems:'center',
        borderWidth:2,
        borderColor:'#C6C6C6',
        borderRadius:10,
        paddingHorizontal:15,
        overflow:'hidden'
    },
    line:{
        // borderWidth:2,
        width:2,
        height:'65%',
        backgroundColor:colors.phoneLine,
        marginHorizontal:8
    },
    phoneInput:{
        paddingVertical:8,
        // backgroundColor:'yellow',
        width:'95%',
        color: 'black',
    },
})
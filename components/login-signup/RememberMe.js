import { StyleSheet, Text, View } from "react-native";
import PressableItem from "../utills/PressableItem";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../utills/colors";
import * as SecureStore from 'expo-secure-store'

function RememberMe({forgot=false,checked,setChecked}) {

    const iconChange = () => {
        setChecked(!checked)
    }
    return (
        <View style={styles.remembermainCon}>
            <View style={styles.rememberCon}>
                <PressableItem externalFunction={iconChange}>
                    <Ionicons name={checked ? "checkbox-outline" : 'square-outline'} size={22}
                        color={colors.primary} />
                </PressableItem>
                <Text style={styles.rememberText}>Remember Me</Text>
            </View>

            {forgot && <View>
                <PressableItem
                direction={'ForgotPassScreen'}>
                <Text style={[styles.rememberText,styles.forgotText]}>Forgot Password</Text>
                </PressableItem>
            </View>}

        </View>
    )
}

export default RememberMe

const styles =StyleSheet.create({
    remembermainCon:{
        flexDirection:'row',
        justifyContent:'space-between'
    },
    rememberCon:{
        flexDirection:'row',
        alignItems:'center'
    },
    rememberText:{
        fontSize:14,
        fontWeight:'600',
        fontFamily:'Manrope-Medium'
    },
    forgotText:{
        color:'#5345E8'
    },
})
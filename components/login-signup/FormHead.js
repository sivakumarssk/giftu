import { StyleSheet, Text, View } from "react-native";
import { colors } from "../utills/colors";

function FormHead ({heading,text,externalStyles}){
    return (
        <View style={[styles.mainCon,externalStyles]}>
            <Text style={styles.headText}>{heading}</Text>
            <Text style={styles.subText}>{text}</Text>
        </View>
    )
}

export default FormHead

const styles = StyleSheet.create({
    mainCon:{
       gap:10
    },
    headText:{
        fontSize:25,
        fontWeight:'800',
        fontFamily:'Manrope-Medium'
    },
    subText:{
        fontSize:14,
        fontWeight:'600',
        fontFamily:'Manrope-semiBold',
        color:'#1D030099'
    }

})
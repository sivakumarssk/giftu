import { StyleSheet, Text, View } from "react-native";
import PressableItem from "../utills/PressableItem";
import { colors } from "../utills/colors";

function AlredyAccount({children,clickText,direction}){
    return(
        <View style={styles.alreadyCon}>
            <Text style={styles.infoText}>{children}</Text>
            <PressableItem extranalStylesText={styles.clickText} direction={direction} >
                <Text>{clickText}</Text>
            </PressableItem>
        </View>
    )
}

export default AlredyAccount


const styles=StyleSheet.create({
    alreadyCon:{
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
    },
    infoText:{
        fontSize:14,
        fontWeight:'400',
        fontFamily:'Manrope-semiBold',
        color:'#444444'
    },
    clickText:{
        fontSize:16,
        fontWeight:'600',
        color:colors.primary,
        fontFamily:'Manrope-semiBold'
    }
})
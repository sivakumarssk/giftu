import { StyleSheet, Text, View } from "react-native";
import PressableItem from "./PressableItem";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "./colors";

function NavBack({ children, icon=true,direction }) {


    return (
        <View>
            <PressableItem direction={direction}>
                <View style={styles.navCon}>
                   {icon && <Ionicons name="chevron-back-sharp" size={24} color={colors.nav} style={{marginTop:3}} />}
                    <Text style={styles.navText}>{children}</Text>
                </View>
            </PressableItem>
        </View>
    )
}

export default NavBack

const styles=StyleSheet.create({
    navCon:{
        flexDirection:'row',
        gap:10,
        alignItems:'center',
        // alignContent:''
    },
    navText:{
        color:colors.nav,
        fontSize:18,
        fontWeight:'600',
        fontFamily:'Manrope-semiBold'
    },
})
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import { colors } from "../utills/colors";


function CustomButton({color='white',background=colors.primary,externalStyles,replace,
    children,direction,icon=false,externalTextStyles, button=true,externalFunction}){

     const navigation=useNavigation()

     const handleOnpress=()=>{
        
        if(externalFunction){
            externalFunction()
        }

        if(direction){
            navigation.navigate(direction)
        }
        if (replace){
            navigation.replace(replace)
        }
     }

    return(
        <View style={[styles.butonMainCon,externalStyles]}>
            <Pressable style={[{backgroundColor:background},styles.buttonCon]}
            onPress={handleOnpress}>

            <Text style={[{color:color},externalTextStyles,button ? styles.loginButtonText :'' ]}
            >{children}</Text>
            {icon && <Ionicons name="arrow-forward-sharp" size={18} color={color} />}
            </Pressable>
        </View>
    )
}

export default CustomButton

const styles=StyleSheet.create({
    butonMainCon:{
        borderRadius:12,
        overflow:'hidden'
    },
    buttonCon:{
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        gap:8,
        paddingVertical:12,
        paddingHorizontal:18,
    },
    loginButtonText:{
        textAlign:'center',
        fontSize:18,
        fontWeight:'600',
        fontFamily:'Manrope-semiBold'
    }
})
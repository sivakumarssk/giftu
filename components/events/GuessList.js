import { Image, StyleSheet, Text, View } from "react-native";
import { colors } from "../utills/colors";


function GuessList({image,name,status}){
    return(
        <View style={styles.guestCon}>
            <View style={styles.profileCon}>
                <Image source={image} 
                style={styles.profileImg}  />
            </View>
            {/* <View style={styles.textCon}> */}
                <Text style={styles.nameText}>{name}</Text>
                <Text style={[styles.statusText,
                    status==='Attending'?{color:'#2A9C02'}:
                    status==='Not Attending'?{color:'#CB1E25'}:
                    {color:'#FFA800'}]}>{status}</Text>
            {/* </View> */}
        </View>
    )
}

export default GuessList;

const styles=StyleSheet.create({
    guestCon:{
        flexDirection:'row',
        marginVertical:10,
        gap:30,
        // justifyContent:'space-between',
        alignItems:'center',
    },
    profileCon:{
        width:40,
        height:40,
        borderRadius:500,
        overflow:'hidden'
    },
    profileImg:{
        resizeMode:'cover',
        width:'100%',
        height:'100%'
    },
    textCon:{
        flexDirection:'row',
        justifyContent:"space-between",
        alignItems:'center'
    },
    nameText:{
        fontSize:16,
        fontWeight:'600',
        fontFamily:"Manrope-semiBold",
        color:colors.nav
    },
    statusText:{
        textAlign:'right'
    }
})
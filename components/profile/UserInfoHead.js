import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { colors } from "../utills/colors";

function UserInfoHead({ image, name, phoneNumber }) {
    return (
        <View style={styles.userInfo}>
            <View style={styles.editImageMainCon}>
                <View style={styles.profileImgCon}>
                    <Image source={image} style={styles.profileImg}
                        resizeMode="cover" />
                </View>


                <View style={styles.editIconMainCon}>
                    <Pressable style={styles.editIconSubCon}>
                        <Image source={require('../../assets/profile/editIcon.png')}
                            style={styles.editIcon} />
                    </Pressable>
                </View>
            </View>

            <View style={styles.textCon}>
                <Text style={styles.nameText}>{name}</Text>
                <Text style={styles.phoneText}>+91 {phoneNumber}</Text>
            </View>
        </View>
    )
}

export default UserInfoHead

const styles = StyleSheet.create({
    userInfo: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop:'1%'
    },
    editImageMainCon:{
        position:'relative',
    },
    profileImgCon: {
        width: 140,
        height: 140,
        borderRadius: 100,
        overflow: 'hidden'
    },
    profileImg: {
        width: '100%',
        height: '100%'
    },
    editIconMainCon: {
        position:'absolute',
        bottom:-5,
        right:0,
        backgroundColor: 'white',
        borderRadius:100,
        padding:5,
        elevation:8,
        shadowColor:'black',
        shadowOpacity:0.25,
        shadowRadius:8,
        shadowOffset:{width:0,height:2}
    },
    editIconSubCon:{
        width:34,
        height:34,
        backgroundColor:colors.primary,
        borderRadius:100,
        padding:6,
        elevation:8,
        shadowColor:'black',
        shadowOpacity:0.25,
        shadowRadius:8,
        shadowOffset:{width:0,height:2}
    },
    editIcon:{
        width:'100%',
        height:'100%'
    },
    nameText:{
        fontSize:22,
        fontWeight:'600',
        fontFamily:'Manrope-semiBold',
        textAlign:'center'
    },
    phoneText:{
        fontSize:14,
        fontWeight:'400',
        fontFamily:'Manrope-Medium',
        textAlign:'center'
    },
})
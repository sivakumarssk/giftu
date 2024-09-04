import { Image, StyleSheet, Text, View } from "react-native";
import { colors } from "../utills/colors";
import PressableItem from "../utills/PressableItem";

function HomeCon({gifImg,pageImg,descreption,background,heading,direction}) {
    return (
        <View style={[{backgroundColor:background},styles.homeMainCon]}>

            <View style={styles.imgCon}>
                <View style={styles.gifImgCon}>
                    <Image source={gifImg} style={styles.gifImg} />
                </View>

                <View style={styles.pageImgCon}>
                    <PressableItem direction={direction} extranalStylesText={styles.page}>
                    <Image source={pageImg} style={styles.pageImg}/>
                    </PressableItem>
                </View>
            </View>

            <View style={styles.textCon}>
                <Text style={styles.headingText}>{heading}</Text>
                <Text style={styles.descreptionText}>{descreption}</Text>
            </View>
        </View>
    )
}

export default HomeCon


const styles=StyleSheet.create({
    homeMainCon:{
        // backgroundColor:'black'
        borderRadius:10,
        // paddingHorizontal:15,
        paddingLeft:15,
        paddingRight:17,
        paddingTop:'5%', 
        width:'45%',
        position:'relative'
    },
    imgCon:{
        backgroundColor:'white',
        // justifyContent:'center',
        // alignItems:'center',
        borderRadius:10,
        // paddingHorizontal:
    },
    gifImgCon:{
        paddingHorizontal:5,
        paddingVertical:10
    },
    gifImg:{
        width:85,
        height:85
    },
    pageImgCon:{
        backgroundColor:'white',
        elevation:4,
        padding:15,
        shadowColor:'black',
        shadowOpacity:0.25,
        shadowRadius:8,
        shadowOffset:{width:0,height:2},
        borderRadius:300,
        // marginLeft:300
        position:'absolute',
        left:'80%',
        top:'43%'
    },
    pageImg:{
        width:24,
        height:24
    },
    textCon:{
        paddingVertical:10,
        gap:5
    },
    headingText:{
        fontSize:13,
        fontWeight:'600',
        fontFamily:'Manrope-Medium'
    },
    descreptionText:{
        fontSize:10,
        fontWeight:'400',
        fontFamily:'Manrope-Medium',
        color:colors.formLable
    },
})
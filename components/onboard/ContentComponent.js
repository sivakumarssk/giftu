import { Dimensions, Image, ImageBackground, StyleSheet, Text, View } from "react-native";
import PressableItem from "../utills/PressableItem";
import CustomButton from "./CustomButton";
import { colors } from "../utills/colors";
import welcomeAsyncstorage from "../storage/welcomeAsyncstorage";


function ContentComponent({ backgroundImage, logo = false, 
    headText,descteption,navIndicator,direction,background,color,screenStatus }) {

        const skipPress=()=>{
            welcomeAsyncstorage('welcome',true)
        }

    return (
        <View style={styles.onBoardContent}>
            <ImageBackground source={backgroundImage}
                resizeMode="cover"
                style={styles.onBoardContent}>

                <View style={styles.logoImgCon}>
                    {logo &&
                        <Image source={require('../../assets/splashlogo.png')} style={styles.logoImg} />}
                </View>

                <View style={styles.desCon}>
                    <View style={styles.wishTextCon}>
                        {logo && <Text style={styles.wishText}>GiftYu Wish Me</Text>}
                    </View>

                    <View style={styles.startTextCon}>

                        <Text style={styles.startText}>{headText}</Text>
                        <Text style={styles.appinfo}>{descteption}</Text>

                        <View style={styles.navImgCon}>
                            <Image source={navIndicator}
                                style={styles.navImg} resizeMode="contain" />
                        </View>
                    </View>
                </View>

                <View style={styles.buttonCon}>
                    <PressableItem  skipNav={'Login'} externalFunction={skipPress}>
                        <Text style={styles.skip}>{logo ? 'skip' : ''}</Text></PressableItem>
                    <CustomButton background={background} color={color}
                    externalFunction={screenStatus ? screenStatus:''}
                    replace={direction} icon={true} button={false}
                    externalTextStyles={styles.buttonTextExternal}
                    >Next</CustomButton>
                </View>

            </ImageBackground>
        </View>
    )
}

export default ContentComponent

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
    onBoardContent: {
        flex: 1,
    },
    logoImgCon: {
        flex: 3,
        alignItems: 'center',
        justifyContent: 'center'
    },
    logoImg: {
        width: 244,
        height: 80
    },
    desCon: {
        flex: 5,
        marginHorizontal: '5%',
        gap: width * 0.05
    },
    wishTextCon: {
        flex: 5,
        width: '60%'
    },
    startTextCon:{
        flex: 5,
        width: '90%',
        gap: width * 0.1
    },
    wishText: {
        fontSize: 54,
        fontWeight: '700'
    },
    startText: {
        fontSize: 28,
        fontWeight: '700',
    },
    appinfo: {
        fontSize: 14,
        fontWeight: '400'
    },
    navImgCon: {
        width: 120
    },
    navImg: {
        width: '100%'
    },
    buttonCon: {
        flex: 2,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: '5%'
    },
    skip: {
        fontSize: 16,
        fontWeight: '500',
        color: '#7D94A0'
    },
    buttonTextExternal:{
        textAlign:'center',
        fontSize:14,
        fontWeight:'500',
    }
})
import { ImageBackground, StyleSheet, View } from "react-native";
import ContentComponent from "../../components/onboard/ContentComponent";
import { colors } from "../../components/utills/colors";
import welcomeAsyncstorage from "../../components/storage/welcomeAsyncstorage";


function OnBoardScreen3(){


    const screenStatus=()=>{
        welcomeAsyncstorage('welcome',true)
    }

    return(
        <View style={styles.onBoardCon3}>
            <ContentComponent
            backgroundImage={require('../../assets/onboard/screenBg3.jpeg')} 
            headText={'Personalized   Wishlists'}
            descteption={'Our goal is to ensure that you have everything you need to feel comfortable, confident, and ready to make an impact.'}
            navIndicator={require('../../assets/onboard/indicator3.png')}
            direction={'Login'}
            background={colors.primary}
            color={'white'}
            screenStatus={screenStatus}/>
        </View>
    )
}

export default OnBoardScreen3

const styles=StyleSheet.create({
    onBoardCon3:{
        flex:1
    }
})

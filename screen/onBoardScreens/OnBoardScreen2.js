import { ImageBackground, StyleSheet, View } from "react-native"
import ContentComponent from "../../components/onboard/ContentComponent"
import { colors } from "../../components/utills/colors"


function OnBoardScreen2(){
    return(
        <View style={styles.onBoardCon2}>
             <ContentComponent
            backgroundImage={require('../../assets/onboard/screenBg2.jpeg')} 
            headText={'Event Planning and Gifts'}
            descteption={'Our goal is to ensure that you have everything you need to feel comfortable, confident, and ready to make an impact.'}
            navIndicator={require('../../assets/onboard/indicator2.png')}
            direction={'OnBoardScreen3'}
            background={colors.primary}
            color={'white'}/>
        </View>
    )
}

export default OnBoardScreen2

const styles=StyleSheet.create({
    onBoardCon2:{
        flex:1
    }
})

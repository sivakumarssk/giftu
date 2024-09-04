import { Dimensions, StyleSheet, View } from "react-native"
import { colors } from "../../components/utills/colors";
import ContentComponent from "../../components/onboard/ContentComponent";


function OnBoardScreen1() {
    return (
        <View style={styles.onBoardCon1}>
            <ContentComponent
            backgroundImage={require('../../assets/onboard/screenBg1.jpeg')} 
            logo={true}
            headText={'Let`s Get Started'}
            descteption={'Our goal is to ensure that you have everything you need to feel comfortable, confident, and ready to make an impact.'}
            navIndicator={require('../../assets/onboard/indicator1.png')}
            direction={'OnBoardScreen2'}
            background={'white'}
            color={colors.primary}/>
        </View>
    )
}

export default OnBoardScreen1

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
    onBoardCon1: {
        flex: 1,
    },
})
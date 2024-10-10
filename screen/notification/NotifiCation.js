import { FlatList, Image, StyleSheet, Text, View } from "react-native";
import NavBack from "../../components/utills/NavBack";


const dummydata=[
    {}
]

function NotifiCation(){
    return(
        <View style={styles.notiMain}>
            <NavBack>Notification</NavBack>


            <View>

                <FlatList/>
                <Image source={''}/>
                <Text></Text>
                <Text></Text>
            </View>
        </View>
    )
}

export default NotifiCation


const styles=StyleSheet.create({
    notiMain:{
        flex:1,
        marginTop:'15%',
        marginHorizontal:'5%'
    },
})
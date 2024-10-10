import { FlatList, StyleSheet, Text, View } from "react-native";
import NavBack from "../../components/utills/NavBack";
import { colors } from "../../components/utills/colors";

const dummydata = [
    { time: 1, price: 200.00, discount: 40 },
    { time: 2, price: 300.00, discount: 40 },
    { time: 3, price: 400.00, discount: 40 },
    { time: 4, price: 500.00, discount: 40 },
    { time: 5, price: 600.00, discount: 40 },
]

function Subscription() {

    return (
        <View style={styles.subMainCon}>

            <NavBack>Subscription</NavBack>

            <View style={styles.listCon}>

                <FlatList data={dummydata}
                    keyExtractor={(item) => item.time.toString()}
                    renderItem={(itemData) => {

                        return(

                        <View style={styles.subsCon}>
                            <Text style={styles.time}>{itemData.item.time} Months</Text>
                            <Text style={styles.price}>₹ {itemData.item.price}.00</Text>
                            <Text style={styles.discount}>Save ₹{itemData.item.discount}.00</Text>
                        </View>

                        )
                    }}
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                    numColumns={2} />

            </View>
        </View>
    )
}

export default Subscription

const styles = StyleSheet.create({
    subMainCon: {
        flex: 1,
        marginTop: '15%',
        marginHorizontal: '5%'
    },
    listCon:{
        flex:1,
        marginTop:'10%'
    },
    subsCon:{
        // flexDirection:'row',
        width:'45%',
        marginVertical:10,
        marginHorizontal:8,
        padding:15,
        borderRadius:8,
        gap:10,
        backgroundColor:'white',
        elevation:4,
        shadowColor: 'black',
        shadowOpacity: 0.25,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 2 },
    },
    time:{
        fontSize:16,
        fontWeight:'400',
        fontFamily:'Manrope-Medium',
        color:colors.primary
    },
    price:{
        fontSize:24,
        fontWeight:'500',
        fontFamily:'Manrope-semiBold',
    },
    discount:{
        fontSize:12,
        fontWeight:'600',
        fontFamily:'Manrope-Medium',
        color:'#5345E8'
    }
})
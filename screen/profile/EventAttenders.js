import { FlatList, StyleSheet, View } from "react-native";
import GuessList from "../../components/events/GuessList";
import NavBack from "../../components/utills/NavBack";

const domyCon = [
    { photo: require('../../assets/dummyCont/1.jpeg'), name: 'Hamad Al Hafeet', status: "Attending" },
    { photo: require('../../assets/dummyCont/2.jpeg'), name: 'Hamad Al Hafeet', status: "Not Attending" },
    { photo: require('../../assets/dummyCont/3.jpeg'), name: 'Hamad Al Hafeet', status: "May Be" },
    { photo: require('../../assets/dummyCont/4.jpeg'), name: 'Hamad Al Hafeet', status: "Attending" },
    { photo: require('../../assets/dummyCont/5.jpeg'), name: 'Hamad Al Hafeet', status: "Not Attending" },
    { photo: require('../../assets/dummyCont/6.jpeg'), name: 'Hamad Al Hafeet', status: "May Be" },
    { photo: require('../../assets/dummyCont/6.jpeg'), name: 'Hamad Al Hafeet', status: "May Be" },
    { photo: require('../../assets/dummyCont/6.jpeg'), name: 'Hamad Al Hafeet', status: "May Be" },
    { photo: require('../../assets/dummyCont/6.jpeg'), name: 'Hamad Al Hafeet', status: "May Be" },
]


function EventAttenders() {
    return (
        <View style={styles.eventAttendersCon}>
            <NavBack>Events Attenders</NavBack>

            <View style={styles.eventListCon}>
                <FlatList data={domyCon}
                    renderItem={(itemData) =>
                        <GuessList image={itemData.item.photo} name={itemData.item.name}
                            status={itemData.item.status} />
                    }
                    keyExtractor={(item, index) => index.toString()}
                    showsVerticalScrollIndicator={false}
                    alwaysBounceVertical={false}
                />
            </View>
        </View>
    )
}

export default EventAttenders

const styles = StyleSheet.create({
    eventAttendersCon: {
        flex:1,
        marginTop: '15%',
        marginHorizontal: '5%'
    },
    eventListCon: {
        marginTop:20,
        flex: 1,
    },
})
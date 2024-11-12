import { useNavigation } from "@react-navigation/native";
import { FlatList, Image, ImageBackground, Linking, Platform, Pressable, StyleSheet, Text, TouchableOpacity, View } from "react-native";

function EventsFlatlist({ data, externalImgStyles, direction, indtext = false, baseUrl, route }) {


    const navigation = useNavigation()

    const handleImageClick = (url = '', value) => {
        // console.log(value,'value');
        if (url) {
            Linking.openURL(url)
        }
        if (direction) {
            navigation.navigate(direction)
        }
        if (route) {

            navigation.navigate(route.direction, {
                [route.paraName]: value,
                // [route.paraName2]:image,
            })
        }
    }


    return (
        <View>
            <FlatList data={data} keyExtractor={(item) => item._id.toString()}
                renderItem={(itemData) => (
                    <View style={styles.eventListCon}>
                        <Pressable onPress={() => handleImageClick(itemData.item.link, itemData.item)}>
                            <View style={[styles.eventListSubCon]}>
                                {/* {console.log(`${baseUrl}${itemData.item.image}`)} */}
                                <ImageBackground source={{ uri: `${baseUrl}${itemData.item.image}` }}
                                  resizeMode="stretch"   style={[styles.eventImg]}
                                    >
                                    {indtext && <View style={styles.viewStyles}>
                                        <Text style={styles.text}>View Attenders  {'>>'}</Text>
                                    </View>
                                    }
                                </ImageBackground>
                            </View>

                            {(itemData.item?.category || itemData.item.name) && <View style={styles.eventNameCon}>
                                <Text style={styles.eventName}>{itemData.item?.category || itemData.item.name}</Text>
                            </View>}

                        </Pressable>
                    </View>
                )
                }
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                alwaysBounceVertical={false}
                overScrollMode={Platform.OS === 'android' ? 'never' : 'auto'}
            />
        </View>
    )
}

export default EventsFlatlist


const styles = StyleSheet.create({
    eventListCon: {
        marginBottom: 15,
        // borderRadius: 10,
        borderRadius:8,
        elevation: 4,
        backgroundColor: 'white',
        shadowColor: 'black',
        shadowOpacity: 0.25,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 2 },
        overflow: 'hidden'
    },
    eventListSubCon: {
        position: 'relative',
        // marginBottom: 15,
        width: '100%',
        height: 160,
        // elevation: 4,
        // backgroundColor: 'white',
        // borderRadius: 10,
        // shadowColor: 'black',
        // shadowOpacity: 0.25,
        // shadowRadius: 8,
        // shadowOffset: { width: 0, height: 2 },
        // overflow: 'hidden'
        // height: '80%',
        // backgroundColor: '#f0f0f0', 
    },
    eventImg: {
        width: '100%',
        height: '100%',
        // height: 120,
    },
    viewStyles: {
        marginHorizontal: '10%',
        marginVertical: '15%',
        // justifyContent:'center',
        // alignItems:'center'
    },
    eventNameCon: {
        paddingHorizontal: 10,
        paddingVertical: 10,
        paddingBottom:15,
    },
    eventName:{
        fontSize:14,
        fontWeight:'700',
        color:'#424242',
        fontFamily: 'Manrope-semiBold'
    },
    text: {
        fontSize: 14,
        fontWeight: '700',
        fontFamily: 'Manrope-semiBold'
    },
})
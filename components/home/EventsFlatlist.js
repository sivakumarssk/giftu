import { useNavigation } from "@react-navigation/native";
import { FlatList, Image, ImageBackground, Linking, Platform, Pressable, StyleSheet, Text, TouchableOpacity, View } from "react-native";

function EventsFlatlist({ data, externalImgStyles, direction, indtext=false }) {


    const navigation = useNavigation()



    const handleImageClick = (url = '') => {
        if (url) {
            Linking.openURL(url)
        }
        if (direction) {
            navigation.navigate(direction)
        }
    }


    return (
        <View>
            <FlatList data={data} keyExtractor={(item) => item.id.toString()}
                renderItem={(itemData) => (
                    // <View style={styles.eventListCon}>
                    <Pressable onPress={() => handleImageClick(itemData.item.link)}>
                        <View style={[styles.eventListSubCon]}>
                            <ImageBackground source={itemData.item.Image}
                                style={[styles.eventImg, externalImgStyles]}
                                resizeMode="stretch" >
                                {indtext && <View style={styles.viewStyles}>
                                    <Text style={styles.text}>View Attenders  {'>>'}</Text>
                                </View>
                                }
                            </ImageBackground>
                        </View>

                    </Pressable>
                    // </View>
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
    eventListSubCon: {
        marginBottom: 15,
        height: 160,
        elevation: 4,
        backgroundColor: 'white',
        borderRadius: 10,
        shadowColor: 'black',
        shadowOpacity: 0.25,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 2 },
        overflow: 'hidden'
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
    text: {
        fontSize: 14,
        fontWeight: '700',
        fontFamily: 'Manrope-semiBold'
    },
})
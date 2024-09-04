import { FlatList, Image, Linking, Pressable, StyleSheet, TouchableOpacity, View } from "react-native";

function EventsFlatlist({data,externalImgStyles}) {

   


    const handleImageClick=(url)=>{
        if(url){
            Linking.openURL(url)
        }
    }


    return (
        <View>
            <FlatList data={data} keyExtractor={(item) => item.id.toString()}
                renderItem={(itemData) => (
                        // <View style={styles.eventListCon}>
                        <Pressable onPress={()=>handleImageClick(itemData.item.link)}>
                            <View style={styles.eventListSubCon}>
                                <Image source={itemData.item.Image} 
                                style={[styles.eventImg,externalImgStyles]}
                                    resizeMode="stretch" />
                            </View>
                            </Pressable>    
                        // </View>
                    )
                }
                showsHorizontalScrollIndicator={false} 
                showsVerticalScrollIndicator={false} />
        </View>
    )
}

export default EventsFlatlist


const styles = StyleSheet.create({
    eventListSubCon: {
        marginBottom: 15,
        height: 160,
        // height: '80%',
        // backgroundColor: '#f0f0f0', 
    },
    eventImg: {
        width: '100%',
        height: '100%',
        // height: 120,

    },
})
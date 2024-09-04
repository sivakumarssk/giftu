import { FlatList, Image, Platform, StyleSheet, Text, View } from "react-native";
import { colors } from "./colors";

function ColFaltlist({ renderData }) {

    if (renderData.length % 2 !== 0) {
        renderData.push({ id: 'placeholder', empty: true });
    }

    return (
        <>
            <FlatList
                data={renderData}
                keyExtractor={(item) => item.id.toString()}
                renderItem={(itemData) => {
                    if (itemData.item.empty) {
                        return <View style={[styles.item, styles.placeholder]} />;
                    }
                    return (
                        <View style={styles.flatMainCon}>
                        <View
                            style={[
                                styles.item,
                                itemData.item.isStatic ? styles.staticImage : styles.dynamicImage,
                            ]}
                        >
                            {/* <View style={{width:'95%',height:'95%'}}> */}
                                {itemData.item.isStatic ?
                               <Image
                                    source={itemData.item.Image}
                                    resizeMode="center"
                                    style={styles.flatImage}
                                />
                                :
                                    <Image
                                    source={itemData.item.Image}
                                    resizeMode="stretch"
                                    style={styles.flatImage}
                                />}

                            {/* </View> */}
                        </View>
                        {itemData.item.tag && <Text style={styles.tagText}>{itemData.item.tag}</Text>}
                        </View>
                    );
                }}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                numColumns={2}
                columnWrapperStyle={styles.columnWrapper}
            />
        </>
    )
}

export default ColFaltlist

const styles = StyleSheet.create({
    flatMainCon:{
        flex: 1,
        marginVertical: 10,
        marginHorizontal: '5%',
    },
    item: {
        flex: 1,
        display: 'flex',
        marginBottom: 10,
        // marginHorizontal:10,
        height: 150,
        justifyContent:'center',
        alignItems:'center'

    },
    staticImage: {
        borderWidth:3,
        borderColor:colors.blue,
        borderRadius: 20,
        elevation: 1,
        backgroundColor:'white',
        shadowColor: 'black',
        shadowOpacity: 0.25,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 2 },
        // padding:10,
        // width:120,
        // height:120
    },
    plusText:{
        fontSize:64,
        color:colors.blue,
    },
    dynamicImage: {
        // borderWidth: 1,
        // borderColor: 'red', 
        borderRadius: 20,
        elevation: 4,
        shadowColor: 'black',
        shadowOpacity: 0.25,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 2 },
        backgroundColor: 'white',
        overflow: Platform.OS === 'android' ? 'hidden' : 'visible',
        padding: 8
    },
    flatImage: {
        borderRadius: 10,
        width: '100%',
        height: '100%',
    },
    placeholder: {
        backgroundColor: 'transparent',
    },
    columnWrapper: {
        justifyContent: 'space-between',
    },
    tagText:{
        fontSize:14,
        fontWeight:'800',
        textAlign:'center'
    },
});
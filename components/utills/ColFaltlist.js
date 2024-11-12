import { FlatList, Image, Platform, StyleSheet, Text, View } from "react-native";
import { colors } from "./colors";
import PressableItem from "./PressableItem";
import useApiCalls from "../../api/useApiCalls";

function ColFaltlist({ renderData, edit = false, setPopUp, imageClickDir,
    externalFunction, exwishlist, paraName, isroute = false, setInvitationId }) {

    const { baseUrl } = useApiCalls()

    // console.log(renderData,'render');


    if (renderData?.length % 2 !== 0) {
        renderData?.push({ id: 'placeholder', empty: true });
    }

    return (
        <View>
            <FlatList
                data={renderData}
                keyExtractor={(item, index) => item._id}
                renderItem={(itemData) => {
                    if (itemData.item.empty) {
                        return <View style={[styles.item, styles.placeholder]} />;
                    }
                    return (
                        <View style={styles.flatMainCon}>
                            {/* {  console.log(itemData.item,'render')}  */}

                            {itemData.item.purchased ?
                                (<View style={styles.gifCon}>

                                    <Image source={require('../../assets/wishlist/purchased.gif')}
                                        resizeMode="stretch"
                                        style={styles.gifImg}
                                    />



                                </View>)
                                :
                                (<View
                                    style={[
                                        styles.item,
                                        itemData.item.isStatic ? styles.staticImage : styles.dynamicImage,
                                    ]}
                                >
                                    {/* <View style={{width:'95%',height:'95%'}}> */}
                                    {itemData.item.isStatic ?
                                        (<PressableItem
                                            externalFunction={() => setPopUp(true)}
                                            extraStyles={styles.createCon}>

                                            <Image
                                                source={itemData.item.Image}
                                                resizeMode="center"
                                                style={styles.flatImage}
                                            />
                                        </PressableItem>
                                        )
                                        :

                                        (<View style={styles.flatImageCon}>

                                            {edit && <View style={styles.itemEditCon}>
                                                <PressableItem
                                                    route={{ dir: 'AddItemScreen', paraName: paraName, value: exwishlist }}
                                                    route2={{ paraName: 'itemId', value: itemData.item._id }}>

                                                    <Image
                                                        source={require('../../assets/wishlist/edititem.png')}
                                                        // resizeMode="cover"
                                                        style={styles.editImage}
                                                    />
                                                </PressableItem>
                                            </View>}

                                            <PressableItem direction={isroute ? imageClickDir : ''}
                                                route={(edit || isroute) ? '' : { dir: imageClickDir, paraName: 'wishlist', value: itemData.item }}
                                                externalFunction={() => {
                                                    if (externalFunction) externalFunction();
                                                    if (setInvitationId) setInvitationId(itemData.item._id)
                                                }} >

                                                <Image
                                                    source={{ uri: `${baseUrl}${itemData.item.image || itemData.item.itemImage}` }}
                                                    resizeMode="stretch"
                                                    style={styles.flatImage}
                                                />
                                            </PressableItem>
                                        </View>)
                                    }

                                    {/* </View> */}
                                </View>)
                            }
                            {itemData.item.name && <Text style={styles.tagText}>{itemData.item.name}</Text>}
                        </View>
                    );
                }}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                numColumns={2}
                columnWrapperStyle={styles.columnWrapper}
                ListFooterComponent={<View style={styles.footerSpace} />}
            />
        </View>
    )
}

export default ColFaltlist

const styles = StyleSheet.create({
    flatMainCon: {
        flex: 1,
        marginVertical: 8,
        marginHorizontal: '5%',
    },
    item: {
        flex: 1,
        display: 'flex',
        marginBottom: 10,
        // marginHorizontal:10,
        height: 150,
        justifyContent: 'center',
        alignItems: 'center'

    },
    staticImage: {
        borderWidth: 3,
        borderColor: colors.blue,
        borderRadius: 20,
        elevation: 2,
        backgroundColor: 'white',
        shadowColor: 'black',
        shadowOpacity: 0.25,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 2 },
        // padding:10,
        // width:120,
        // height:120
    },
    createCon: {
        width: '100%',
        height: '100%'
    },
    plusText: {
        fontSize: 64,
        color: colors.blue,
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
    flatImageCon: {
        position: 'relative',
        borderRadius: 10,
        width: '100%',
        height: '100%',
    },
    itemEditCon: {
        position: 'absolute',
        right: 0,
        width: 30,
        height: 30,
        zIndex: 30,
        overflow: 'hidden'
    },
    editImage: {
        width: '100%',
        height: '100%'
    },
    flatImage: {
        borderRadius: 10,
        width: '100%',
        height: '100%',
    },
    placeholder: {
        backgroundColor: 'transparent',
        marginRight: 35
    },
    columnWrapper: {
        justifyContent: 'space-between',
    },
    tagText: {
        fontSize: 14,
        fontWeight: '800',
        textAlign: 'center'
    },
    footerSpace: {
        marginBottom: 20
    },
    gifCon: {
        width: 145,
        height: 145,
    },
    gifImg: {
        width: '100%',
        height: '100%'
    },
});
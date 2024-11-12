import { Image, Modal, Pressable, StyleSheet, Text, View } from "react-native";
import PressableItem from "./PressableItem";


const chooseArr = [{ id: 1, url: require('../../assets/access/camera.png'), label:'Click Picture',fromCamera:true },
{ id: 2, url: require('../../assets/access/gallery.png'), label:'Browse Gallery',fromCamera:false }]

function ChooseImage({setPopUp,imagePick,setPopCall}) {

    return (
        <Modal
            transparent={true}
            visible={true}
        >
            <View style={styles.modalStyle}>
            

                <View style={styles.chooseCon}>

                <PressableItem externalFunction={() =>{setPopUp(false);
                    setPopCall?setPopCall(false):''}} extraStyles={styles.extra}>
                                <Text style={styles.cross}>✕</Text>
                            </PressableItem>

                <View style={styles.chooseImgCon}>
                            
                    {chooseArr.map((each) => {
                        return (
                            <View key={each.id} style={styles.imgCon}>
                            <Pressable onPress={()=>imagePick(each.fromCamera)} style={styles.imgCon}>
                                <Image source={each.url} style={styles.chimg}  />
                                <Text>{each.label}</Text>
                                </Pressable>
                            </View>
                        )
                    })

                    }
                    </View>
                </View>
            </View>
        </Modal>
    )
}

export default ChooseImage

const styles = StyleSheet.create({
    modalStyle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
    },
    chooseCon: {
        justifyContent:'center',
        alignItems:'center',
        padding:10,
        paddingBottom:30,
        width:'90%',
        backgroundColor: 'white'
    },
    chimg: {
        width: 66,
        height: 66
    },
    chooseImgCon:{
        flexDirection: 'row',
        gap: 50,
    },
    imgCon:{
        alignItems:'center',
        gap:10
    },
    extra: {
        width: 35,
        padding: 5,
        alignSelf: 'flex-end',
        // backgroundColor:'yellow',
    },
    cross: {
        // backgroundColor:'yellow',
        paddingBottom:5,
        fontSize: 18,
        fontWeight: '800',
        fontFamily: 'Manrope-semiBold',
        textAlign: 'right',
    },
})
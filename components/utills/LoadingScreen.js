import { Image, Modal, StyleSheet, View } from "react-native"


function LoadingScreen(){
    return(
        <Modal
        transparent={true}
        animationType="none"
        // visible={visible}
        >
            <View style={styles.loadmain}>
                <View style={styles.loadImage}>
                    <Image
                    source={require('../../assets/loader.gif')}/>
                </View>
            </View>
        </Modal>
    )
}

export default LoadingScreen


const styles=StyleSheet.create({
    loadmain:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    loadImage:{
        width: 100,
        height: 100,
        // borderRadius: 80,
        // overflow: 'hidden',
    },
    gif:{
        width:'100%',
        height:'100%'
    }
})
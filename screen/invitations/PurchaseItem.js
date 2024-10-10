import { Image, Linking, Modal, ScrollView, StyleSheet, Text, View } from "react-native";
import PressableItem from "../../components/utills/PressableItem";
import InputCom from "../../components/login-signup/InputCom";
import InputPressable from "../../components/events/InputPressable";
import CustomButton from "../../components/onboard/CustomButton";

function PurchaseItem({ setPopUp }) {

    const handlelink=(url)=>{
        if(url){
            Linking.openURL(url)
        }
    }

    return (
        <View style={styles.container}>
        <Modal transparent={true} visible={true}>
          <View style={styles.modalStyle}>
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
              <View style={styles.chooseCon}>
                <PressableItem
                  externalFunction={() => setPopUp(false)}
                  extraStyles={styles.extra}
                >
                  <Text style={styles.cross}>✕</Text>
                </PressableItem>
  
                <View style={styles.formCon}>
                  <Text style={styles.itemTitle}>Item image</Text>
  
                  <View style={styles.itemImgCon}>
                    <View style={styles.downloadImgCon}>
                      <Image
                        source={require("../../assets/invitation/download.png")}
                        style={styles.itemImg}
                      />
                    </View>
  
                    <Image
                      source={require("../../assets/dummt/w1.jpeg")}
                      style={styles.itemImg}
                    />
                  </View>
  
                  <View style={styles.inputDataCon}>
                    <InputPressable
                      label={"Item URL"}
                      extraFunction={() => handlelink("https://www.google.com")}
                    />
                    <InputCom label={"Description"} editable={false} />
                    <CustomButton>Update as Purchased</CustomButton>
                  </View>
                </View>
              </View>
            </ScrollView>
          </View>
        </Modal>
      </View>
    )
}

export default PurchaseItem


const styles = StyleSheet.create({
    container: {
        flex: 1,
      },
      modalStyle: {
        flex: 1,
        justifyContent: "center",
        // alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
      },
      scrollViewContent: {
        flexGrow: 1, // Ensures content takes up available space
        justifyContent: "center",
        alignItems: "center",
      },
    chooseCon: {
        marginVertical:50,
        // justifyContent: 'center',
        // alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal:20,
        paddingBottom: 30,
        width: '90%',
        backgroundColor: 'white'
    },

    extra: {
        width: 35,
        padding: 5,
        alignSelf: 'flex-end',
        // backgroundColor:'yellow',
    },
    cross: {
        // backgroundColor:'yellow',
        paddingBottom: 5,
        fontSize: 18,
        fontWeight: '800',
        fontFamily: 'Manrope-semiBold',
        textAlign: 'right',
    },
    itemTitle:{
        fontSize:14,
        fontWeight:'600',
        fontFamily:'Manrope-Medium',
        color:'#787878',
    },
    itemImgCon:{
        position:'relative',
        width:'100%',
        height:180,
        marginVertical:10,
        borderRadius:8,
        overflow:'hidden',

    },
    downloadImgCon:{
        position:'absolute',
        top:10,
        right:10,
        width:24,
        height:24,
        zIndex:100,
    },
    itemImg:{
        width:'100%',
        height:'100%',
        objectFit:'fill',
        // resizeMode:'stretch'
    },
    inputDataCon:{
        gap:15
    },
})
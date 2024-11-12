import { Alert, Image, Linking, Modal, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import PressableItem from "../../components/utills/PressableItem";
import InputCom from "../../components/login-signup/InputCom";
import InputPressable from "../../components/events/InputPressable";
import CustomButton from "../../components/onboard/CustomButton";
import useApiCalls from "../../api/useApiCalls";
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';

function PurchaseItem({ navigation, setPopUp, singleInvitation, invitaion, setInvitaion }) {

  const { baseUrl, apiCall, loading } = useApiCalls()

  const handlelink = (url) => {
    if (url) {
      Linking.openURL(url)
    }
  }

  const handlePurched = async () => {
    const response = await apiCall('patch', `updatePurchased/${invitaion._id}/${singleInvitation._id}`)

    if (response) {
      // console.log(response);
      setInvitaion(response)
      setPopUp(false)
    }
  }



const handleDownloadImage = async () => {
    try {
      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission Denied', 'You need to grant media library permissions to save images.');
        return;
      }

      const imageUrl = `${baseUrl}${invitaion?.invitationImage}`;
      const fileName = imageUrl.substring(imageUrl.lastIndexOf('/') + 1);
      const downloadDest = `${FileSystem.documentDirectory}${fileName}`;

      // Download the image
      const { uri } = await FileSystem.downloadAsync(imageUrl, downloadDest);

      // Save the image to the gallery
      const asset = await MediaLibrary.createAssetAsync(uri);
      await MediaLibrary.createAlbumAsync('Download', asset, false);

      Alert.alert('Success', 'Image saved to gallery!');
    } catch (error) {
      console.error('Download error:', error);
      Alert.alert('Error', 'An error occurred while saving the image.');
    }
  };

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

                {invitaion?.invitationImage &&
                  <>
                    <Text style={styles.itemTitle}>Item image</Text>
                    <View style={styles.itemImgCon}>

                      <View style={styles.downloadImgCon}>
                        <Pressable onPress={handleDownloadImage}>
                          <Image
                            source={require("../../assets/invitation/download.png")}
                            style={styles.itemImg}
                          />
                        </Pressable>
                      </View>

                      <Image
                        source={{ uri: `${baseUrl}${invitaion?.invitationImage}` }}
                        style={styles.itemImg}
                      />

                    </View>
                  </>

                }

                <View style={styles.inputDataCon}>
                  <InputPressable
                    label={"Item URL"}
                    value={singleInvitation?.link}
                    extraFunction={() => handlelink(singleInvitation?.link)}
                  />
                  <InputCom label={"Description"} editable={false}
                    value={singleInvitation?.description} />

                  <CustomButton externalFunction={loading ? '' : handlePurched}
                  >Update as Purchased</CustomButton>
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
    marginVertical: 50,
    // justifyContent: 'center',
    // alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
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
  itemTitle: {
    fontSize: 14,
    fontWeight: '600',
    fontFamily: 'Manrope-Medium',
    color: '#787878',
  },
  itemImgCon: {
    position: 'relative',
    width: '100%',
    height: 180,
    marginVertical: 10,
    borderRadius: 8,
    overflow: 'hidden',

  },
  downloadImgCon: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 24,
    height: 24,
    zIndex: 100,
  },
  itemImg: {
    width: '100%',
    height: '100%',
    objectFit: 'fill',
    // resizeMode:'stretch'
  },
  inputDataCon: {
    gap: 15
  },
})
import { Platform, Pressable, StyleSheet, Text, View } from "react-native";
import * as ImagePicker from 'expo-image-picker';
import { useEffect, useState } from "react";
import { colors } from "./colors";
import FormHead from "../login-signup/FormHead";
import { Ionicons } from "@expo/vector-icons";
import ChooseImage from "./ChooseImage";

function ImagePick({extraStyles,error}){
    const[popUp,setPopUp]=useState(false)
    const [image, setImage] = useState(null);
    const [permissionsGranted, setPermissionsGranted] = useState(false);

 

    const imagePick = async (fromCamera = false) => {

        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        const { status: cameraStatus } = await ImagePicker.requestCameraPermissionsAsync();
        
        setPopUp(false)

        if (status !== 'granted' || cameraStatus !=='granted') {
            alert('Media and Camera permission is required to upload image');
            return;
        }

        let result;
        if (fromCamera) {
            // Launch the camera
            result = await ImagePicker.launchCameraAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                quality: 1,
            });
        } else {
            // Launch the image library
            result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                quality: 1,
            });
        }


        if (!result.canceled) {
            const localUri = result.assets[0];
            const filename = localUri.uri.split('/').pop();

            // Infer the type of the image
            const match = /\.(\w+)$/.exec(filename);
            const type = match ? `image/${match[1]}` : `image`;

            setImage(localUri);
            // setFormData((prev) => ({ ...prev, photo: { uri: localUri, name: filename, type } }));
            // setErrors((prev) => ({ ...prev, photo: '' }));
        }
    };

    // console.log(image);
    
    return(
        <View>
        <View style={styles.imageOutterCon}>
            <View style={[extraStyles, styles.imagePickCon]}>
                <Pressable onPress={()=>setPopUp(true)} style={styles.pressImage}>
                    <Text style={styles.upload}>Upload</Text>
                </Pressable>
                <View>
                    <FormHead text={'Only jpg & png format'}/>
                </View>
                {/* {image && <Image source={{ uri: image }} style={styles.image} />} */}
            </View>
{image &&
            <View style={styles.fileNameCon}>
                        <View style={styles.fileNameSubcon}>
                        <Text style={styles.fileName}>
                            {image.fileName || `Image 1`}</Text>
                        </View>

                        <Pressable onPress={()=>setImage('')}>
                        <Ionicons name="close" size={20}/>
                        </Pressable>
                    </View>
                    }
            {error && <Text style={{ color: 'red' }}>{error}</Text>}
            {popUp && <ChooseImage setPopUp={setPopUp} imagePick={imagePick} />}
            </View>
        </View>
    )
}


export default ImagePick

const styles=StyleSheet.create({
    imageOutterCon: {
        // marginHorizontal: 20,
    },
    imagePickCon: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap:10,
        borderColor: colors.inputline,
        borderWidth: 2,
        borderRadius: 8,
        paddingHorizontal: 10,
        paddingVertical: 15,
    },
    pressImage: {},
    upload: {
        textDecorationLine: 'underline',
        fontSize: Platform.OS === 'android' ? 14 : 20,
        fontFamily: 'Manrope-semiBold',
        fontWeight: '600',
    },
    image: {
        width: 100,
        height: 100,
    },
    fileNameMainCon:{
        flexDirection:'row',
        flexWrap:'wrap',
        gap:20,
        marginHorizontal:20,
        marginTop:20,
    },
    fileNameCon:{
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        // marginHorizontal:20,
        marginTop:10,
        maxWidth:120,
        paddingVertical:5,
        flexDirection:'row',
        gap:5,
        backgroundColor:'#C7F1FF',
        padding:5,
        borderRadius:5,
    },
    fileNameSubcon:{
        maxWidth:90,
        height:15,
        overflow:'hidden'
    },
    fileName:{
        fontSize:12,
        fontWeight:'600'
    },
})
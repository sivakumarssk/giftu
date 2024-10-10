import { StyleSheet, View } from "react-native"
import NavBack from "../../components/utills/NavBack"
import InputCom from "../../components/login-signup/InputCom"
import CustomButton from "../../components/onboard/CustomButton"
import { colors } from "../../components/utills/colors"
import ImagePick from "../../components/utills/ImagePick"

function AddItemScreen({route}) {

    const edit=route.params?.edit
    return (
        <View style={styles.addItemmain}>
            <View style={styles.navCon}>
                <NavBack direction={'WishlistItemsScreen'}>Add Item</NavBack>
            </View>

            <View style={styles.formCon}>
                <ImagePick />
                <InputCom placeholder={'Enter Url'}
                    label={'Item URL'} />
                <InputCom placeholder={'Enter Discription'}
                    label={'Discription'} />

                <CustomButton externalStyles={styles.extrabtn}>{edit ? 'Update':'Add Item'}</CustomButton>
                
            </View>
            {edit && <CustomButton background="transparent" color="blue"
               >Delete Item</CustomButton>}
        </View>
    )
}

export default AddItemScreen

const styles = StyleSheet.create({
    addItemmain: {
        flex:1,
        marginHorizontal: '5%',
        marginTop: '15%'
    },
    navCon: {
        marginBottom: '10%'
    },
    formCon:{
        gap:20
    },
    extrabtn:{
        marginTop:20
    }
})
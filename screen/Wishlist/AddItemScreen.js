import { StyleSheet, Text, View } from "react-native"
import NavBack from "../../components/utills/NavBack"
import InputCom from "../../components/login-signup/InputCom"
import CustomButton from "../../components/onboard/CustomButton"
import { colors } from "../../components/utills/colors"
import ImagePick from "../../components/utills/ImagePick"
import { useEffect, useState } from "react"
import useApiCalls from "../../api/useApiCalls"

const initialData = {
    image: '',
    link: '',
    description: ''
}

function AddItemScreen({ route, navigation }) {

    const wishlist = route.params?.wishlist
    const userevent = route.params?.userevent
    const itemId = route.params?.itemId

    // console.log(wishlist,'wish');
    // console.log(itemId,'id');

    const { loading, apiError, setApiError, apiCall } = useApiCalls()

    // console.log(wishlist);

    const [formData, setFormData] = useState(initialData)
    const [error, setError] = useState(initialData)

    const customWislist = wishlist?.items || userevent?.wishlist

    // console.log(customWislist);
    

    useEffect(() => {
        if (itemId) {
            const itemData = customWislist.find((each) => each._id === itemId);
            if (itemData) {
                setFormData({
                    image: itemData.image || itemData.itemImage,
                    link: itemData.link,
                    description: itemData.description ,
                });
            }
        }
    }, [itemId, customWislist])


    const validate = () => {
        if (!formData.image) {
            setError((prev) => ({ ...prev, image: 'Image is Required' }))
            return false
        } else {
            return true
        }
    }

    const changeText = (value, field) => {
        setApiError('')
        setError((prev) => ({ ...prev, link: null }))
        setFormData((prev) => ({ ...prev, link: value }))

        if (!/^(https?:\/\/)?(www\.)?([a-zA-Z0-9-_]+(\.[a-zA-Z]{2,})+)(\/[a-zA-Z0-9-_#?&%=\.]*)?$/.test(value)) {
            setError((prev) => ({ ...prev, link: 'Please Enter a Valid Link' }))
        }
    }

    const handleOnBlur = () => {
        if (!formData.link) {
            setError((prev) => ({ ...prev, link: null }))
        }
    }


    const handleSubmit = async () => {


        if (validate() && Object.values(error).every(error => !error)) {

            // console.log(apiFormdata,'api');
            // Log each form entry to ensure correctness
            if ((wishlist || userevent) && !itemId) {
                const apiFormdata = new FormData()

                wishlist?.items ? apiFormdata.append('image', formData.image) : 
                apiFormdata.append('itemImage', formData.image)

                apiFormdata.append('link', formData.link)
                apiFormdata.append('description', formData.description)
                

                const response = await apiCall('post',
                    wishlist?.items? `addItem/${wishlist._id}` : `addEventItem/${userevent._id}` , apiFormdata)

                if (response) {
                    const updatedWishlist = wishlist?.items ?
                    ({ ...wishlist, items: [...response.newItems] }) :({ ...userevent, wishlist: [...response.newItems] })
                    navigation.goBack();
                    wishlist?.items ?
                    (navigation.navigate('WishlistItemsScreen', { wishlist: updatedWishlist }))
                    : (navigation.navigate('EventWishlistItemsScreen', { event: updatedWishlist }))
                }
            } else if ((wishlist || userevent) && itemId) {

                const apiFormdata = new FormData()

                wishlist?.items ? apiFormdata.append('image', formData.image) : 
                apiFormdata.append('itemImage', formData.image);
                apiFormdata.append('link', formData.link)
                apiFormdata.append('description', formData.description)

                const response = await apiCall('patch',
                    wishlist?.items ? (`updateItem/${wishlist._id}/${itemId}`) :
                     (`updateEventItem/${userevent._id}/${itemId}`) , apiFormdata)

                if (response) {
                    // const filteredItems = wishlist.items.filter((each)=>each._id!==itemId)
                    const updatedWishlist = wishlist?.items ?
                    ({ ...wishlist, items: [...response.updatedItems] }) :({ ...userevent, wishlist: [...response.updatedItems] })
                    navigation.goBack();
                    wishlist.items ?
                    (navigation.navigate('WishlistItemsScreen', { wishlist: updatedWishlist }))
                    : (navigation.navigate('EventWishlistItemsScreen', { event: updatedWishlist }))
                }
            }

        }
    }


    const handleDlete=async()=>{

        const response = await apiCall('delete',  wishlist?.items ? (`deleteItem/${wishlist._id}/${itemId}`) :
                     (`deleteEventItem/${userevent._id}/${itemId}`))

        if (response) {
            // const filteredItems = wishlist.items.filter((each)=>each._id!==itemId)
            const updatedWishlist = wishlist?.items ?
            ({ ...wishlist, items: [...response.updatedItems] }) :({ ...userevent, wishlist: [...response.updatedItems] })
            navigation.goBack();
            wishlist?.items ?
            (navigation.navigate('WishlistItemsScreen', { wishlist: updatedWishlist }))
            : (navigation.navigate('EventWishlistItemsScreen', { event: updatedWishlist }))
        }
    }


    return (
        <View style={styles.addItemmain}>
            <View style={styles.navCon}>
                <NavBack direction={'WishlistItemsScreen'}>Add Item</NavBack>
            </View>


            <View style={styles.formCon}>
                {apiError &&
                    <Text style={{ textAlign: 'center', color: 'red' }}>{apiError}</Text>}

                <ImagePick image={formData.image}
                    setImage={(data) => setFormData((prev) => ({ ...prev, image: data }))}
                    error={error.image}
                    setError={(err) => setError((prev) => ({ ...prev, image: err }))}
                    setApiError={setApiError}
                />

                <InputCom placeholder={'Enter Url'}
                    label={'Item URL'}
                    value={formData.link}
                    onChangeText={(value) => changeText(value, 'link')}
                    onBlur={handleOnBlur}
                    error={error.link}
                />

                <InputCom placeholder={'Enter Discription'}
                    label={'Discription'}
                    value={formData.description}
                    onChangeText={(value) => setFormData((prev) => ({ ...prev, description: value }))}
                    error={error.description} />

                <CustomButton externalStyles={styles.extrabtn}
                    externalFunction={loading ? '' : handleSubmit}
                >{itemId ? 'Update' : 'Add Item'}</CustomButton>

            </View>
            {itemId && <CustomButton background="transparent" color="blue"
            externalFunction={loading ? '' : handleDlete}
            >Delete Item</CustomButton>}
        </View>
    )
}

export default AddItemScreen

const styles = StyleSheet.create({
    addItemmain: {
        flex: 1,
        marginHorizontal: '5%',
        marginTop: '15%'
    },
    navCon: {
        marginBottom: '10%'
    },
    formCon: {
        gap: 20
    },
    extrabtn: {
        marginTop: 20
    }
})
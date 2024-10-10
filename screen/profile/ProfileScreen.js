import { Alert, ScrollView, StyleSheet, View } from "react-native"
import NavBack from "../../components/utills/NavBack"
import UserInfoHead from "../../components/profile/UserInfoHead"
import ProfileMenu from "../../components/profile/ProfileMenu"
import { useState } from "react"
import PressableItem from "../../components/utills/PressableItem"

function ProfileScreen({ navigation }) {

    const [group, setGroup] = useState(false)


    const profileChange = [
        { id: 0, img: require('../../assets/profile/editProfile.png'), title: 'Edit profile information', direction:'EditProfile' },
        { id: 1, img: require('../../assets/profile/eye.png'), title: 'Change Password',direction:'ChangePassword' },
    ]

    const profileMenu = [
        { id: 0, img: require('../../assets/profile/subscription.png'), title: 'Subscription', direction: 'Subscription' },
        { id: 1, img: require('../../assets/profile/history.png'), title: 'History of event', direction:'History' },
        { id: 2, img: require('../../assets/profile/contact.png'), title: 'Contact Us',direction:'ContactUs' },
        // { id: 3, img: require('../../assets/profile/faq.png'), title: 'FAQ' },
        { id: 4, img: require('../../assets/profile/privacy.png'), title: 'Privacy policy' },
        { id: 5, img: require('../../assets/profile/terms.png'), title: 'Terms and condition' },
        { id: 6, img: require('../../assets/profile/logout.png'), title: 'Logout',externalFunction:() => Alert.alert('Log out!', 'Are You sure you want to logout',
            [{ text: 'cancel', style: 'cancel' },
            {
                text: 'okay',
                onPress: (() => { navigation.replace('Login') })
            }
            ]) },
    ]

    return (
        <View style={styles.profileMainCon}>
            <ScrollView showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
                <NavBack icon={false}>Profile</NavBack>
                <UserInfoHead image={require('../../assets/dummt/profile.png')}
                    name={'Siva Priya'} phoneNumber={'8877799988'}
                />

                {
                    profileChange.map((each) => {
                        return (
                            <View key={each.id}
                                style={[styles.profileMenuCon]}>
                                <ProfileMenu image={each.img} externalStyles={styles.menuExtraStyles}
                                direction={each.direction}>
                                    {each.title}</ProfileMenu>
                            </View>
                        )
                    })
                }

                <View style={[styles.profileMenuCon, styles.groupprofileMenuCon]}>
                    {
                        profileMenu.map((each) => {
                            return (
                                <View key={each.id}>
                                        <ProfileMenu image={each.img} externalStyles={styles.groupmenuExtraStyles}
                                        direction={each.direction}
                                        externalFunction={each.externalFunction}>
                                            {each.title}
                                        </ProfileMenu>
                                </View>
                            )
                        })
                    }
                </View>
            </ScrollView>

        </View>
    )
}

export default ProfileScreen

const styles = StyleSheet.create({
    profileMainCon: {
        flex: 1,
        marginTop: '15%',
        marginHorizontal: '5%',
    },
    profileMenuCon: {
        // borderWidth:1,
        // borderColor:'blue',   
        shadowColor: 'black',
        shadowOpacity: 0.25,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 2 },
        backgroundColor: 'white',
        borderRadius: 10,
        elevation: 4,
        marginVertical: 10,
    },
    groupprofileMenuCon: {
        paddingVertical: 12
    },
    menuExtraStyles: {
        paddingVertical: 12,
        // marginVertical:20
    },
    groupmenuExtraStyles: {
        paddingVertical: 8,
    },
})
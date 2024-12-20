import { useNavigation } from "@react-navigation/native";
import { Pressable, Text, View } from "react-native";

function PressableItem({ children, direction, skipNav, externalFunction, extraStyles,route,route2 }) {

    const navigation = useNavigation()
    const handleonPress = () => {
        
        if (direction) {
            navigation.navigate(direction)
        }
        if (externalFunction) {
            externalFunction()
        }
        if(route){
            navigation.navigate(route.dir,{
                [route.paraName]:route.value,
                [route2?.paraName]:route2?.value
            })
        }
        if (skipNav) {
            navigation.replace(skipNav)
        }
        
    }

    return (
        <View style={extraStyles}>
            <Pressable onPress={handleonPress}>{children}</Pressable>
        </View>
    )
}

export default PressableItem
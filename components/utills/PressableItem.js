import { useNavigation } from "@react-navigation/native";
import { Pressable, Text, View } from "react-native";

function PressableItem({children,direction,skipNav,externalFunction,extraStyles}){

    const navigation=useNavigation()
    const handleonPress=()=>{
        
        if(direction){
            navigation.navigate(direction)
        }
        if(skipNav){
            navigation.replace(skipNav)
        }
        if(externalFunction){
            externalFunction()
        }
    }

    return (
        <View style={extraStyles}>
            <Pressable onPress={handleonPress}>{children}</Pressable>
        </View>
    )
}

export default PressableItem
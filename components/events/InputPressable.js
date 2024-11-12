import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text, TextInput, Touchable, TouchableOpacity, View } from "react-native";


function InputPressable({ extraFunction,label,icon,value,error }) {
    return (
        <View>
            <Text style={styles.label}>{label}</Text>
            <View style={styles.mainInCon}>
            <Pressable onPress={() => extraFunction()} style={styles.pressable}>
                    <View pointerEvents="none">
                        <TextInput
                            style={styles.input}
                            editable={false} // Disable editing
                            value={value}
                        />
                    </View>

                    <Ionicons name={icon} size={24}/>
                </Pressable>
            </View>
            {error && <Text style={{color:'red'}}>{error}</Text>}
        </View>
    )
}

export default InputPressable


const styles = StyleSheet.create({
    mainInCon: {
        marginTop:10,
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#C6C6C6',
        borderRadius: 10,
        paddingHorizontal: 15,
        overflow: 'hidden'
    },
    label:{
        fontSize:14,
        fontWeight:'600',
        fontFamily:'Manrope-Medium',
        color:'black'
    },
    pressable:{
        flexDirection:'row',
        alignItems:'center',
        marginRight:5,
    },
    input:{
        paddingVertical:8,
        // backgroundColor:'yellow',
        minWidth:'93%'
    }
})
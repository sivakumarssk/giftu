import { Ionicons } from "@expo/vector-icons";
import { Platform, StyleSheet, TextInput, View } from "react-native";
import { colors } from "../utills/colors";
import PressableItem from "../utills/PressableItem";

function Search({ direction,autoFocus=false }) {
    return (
        <View style={styles.searchCon}>
            <PressableItem direction={direction} extraStyles={styles.searchInput}>
            <TextInput placeholder="Search here..."
                    // style={styles.searchInput}
                    editable={!direction}
                    autoFocus={autoFocus}
                />
            </PressableItem>

            <Ionicons name="search" size={24} color={colors.primary} />
        </View>
    )
}

export default Search


const styles = StyleSheet.create({
    searchCon: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 15,
        borderRadius: 20,
        elevation: 4,
        shadowColor: 'black',
        shadowOpacity: 0.25,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 2 },
        backgroundColor: 'white',
        overflow: Platform.OS === 'android' ? 'hidden' : 'visible',
    },
    searchInput: {
        paddingVertical: 8,
        // backgroundColor:'yellow',
        width:'90%'
    }
})
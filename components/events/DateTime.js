import { Modal, Platform, Text, TouchableOpacity, View } from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker';

function DateTime({mode,value,setShow}){

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        console.log(currentDate);
        setShow(false)
      };

    return(
        <View>
             {/* Modal for iOS to replicate the Android-like popup behavior */}
      {Platform.OS === 'ios' && (
        <Modal
          transparent={true}
          visible={true}
          animationType="slide"
          onRequestClose={() => setShow(false)}
        >
          <View style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0,0,0,0.5)'
          }}>
            <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10 }}>
              <DateTimePicker
                value={value}
                mode={mode}
                display="spinner"
                onChange={onChange}
                textColor="black" 
                style={{ backgroundColor: 'white' }}
              />

              {/* Button to close the modal */}
              <TouchableOpacity onPress={() => setShow(false)}>
                <Text style={{ textAlign: 'center', marginTop: 10, color: 'blue' }}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}

      {/* For Android, show DateTimePicker directly */}
      {Platform.OS === 'android' && (
        <DateTimePicker
          value={value}
          mode={mode}
          display="default"
          onChange={onChange}
        />
      )}

        </View>
    )
}

export default DateTime
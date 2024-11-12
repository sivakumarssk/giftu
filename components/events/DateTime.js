import { Modal, Platform, Text, TouchableOpacity, View } from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker';

function DateTime({ mode, value, setShow, setDate, onChange }) {

  const handleChange = (event, selectedDate) => {
    if (event.type === "dismissed") {
      setShow(false); 
      // onChange(null, mode);
    } else {
      const currentDate = selectedDate;
      setShow(false);
      onChange(currentDate, mode);
    } 

    // if (Platform.OS === 'android') {
    // setShow(false); 
    // }
  };

  const getISTDate = () => {
    const now = new Date();
    const utcOffset = now.getTimezoneOffset() * 60000;
    const istOffset = 19800000; // IST is UTC+5:30
    return new Date(now.getTime() + utcOffset + istOffset);
  };

  return (
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
                value={value || getISTDate()}
                mode={mode}
                display="spinner"
                onChange={handleChange}
                minimumDate={getISTDate()}
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
          value={value || getISTDate()}
          mode={mode}
          display="default"
          minimumDate={getISTDate()}
          onChange={handleChange}
        />
      )}

    </View>
  )
}

export default DateTime
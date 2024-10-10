import React, { useState } from 'react';
import { View, Button, Platform, Text } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const Datrdummy = () => {
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date'); // 'date' or 'time'
  const [show, setShow] = useState(false);

  // Function to handle date or time change
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios'); // Close the picker on Android after selection
    setDate(currentDate);
  };

  // Function to show Date or Time Picker
  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  // Function to show Date Picker
  const showDatePicker = () => {
    showMode('date');
  };

  // Function to show Time Picker
  const showTimePicker = () => {
    showMode('time');
  };

  return (
    <View style={{ padding: 20 }}>
      <View style={{ marginBottom: 20 }}>
        <Button onPress={showDatePicker} title="Pick a Date" />
      </View>
      <View style={{ marginBottom: 20 }}>
        <Button onPress={showTimePicker} title="Pick a Time" />
      </View>

      {show && (
        <DateTimePicker
          value={date}
          mode={mode}
          display="spinner" // This works as a modal for both Android and iOS
          onChange={onChange}
          onTouchCancel={() => setShow(false)} // Close picker on iOS when cancel is pressed
        />
      )}

      {/* Display the selected date and time */}
      <Text style={{ marginTop: 20 }}>Selected Date: {date.toLocaleDateString()}</Text>
      <Text>Selected Time: {date.toLocaleTimeString()}</Text>
    </View>
  );
};

export default Datrdummy;

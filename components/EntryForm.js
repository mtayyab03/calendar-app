import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
  StyleSheet,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import DateTimePicker from "@react-native-community/datetimepicker";

const EntryForm = ({ onSave, selectedEntry }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dateType, setDateType] = useState("Birthday");
  const [selectedDate, setSelectedDate] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);

  useEffect(() => {
    if (selectedEntry) {
      setFirstName(selectedEntry.firstName);
      setLastName(selectedEntry.lastName);
      setDateType(selectedEntry.dateType);
      setSelectedDate(selectedEntry.selectedDate);
    } else {
      setFirstName("");
      setLastName("");
      setDateType("Birthday");
      setSelectedDate(null);
    }
  }, [selectedEntry]);

  const showDatepicker = () => {
    setShowDatePicker(true);
  };

  const handleDateChange = (event, date) => {
    setShowDatePicker(Platform.OS === "ios");
    if (date) {
      setSelectedDate(date);
    }
  };

  const handleSave = () => {
    if (
      firstName.trim() === "" ||
      lastName.trim() === "" ||
      selectedDate === null
    ) {
      // Display an error message or perform validation as per your requirements
      return;
    }

    onSave({
      firstName,
      lastName,
      dateType,
      selectedDate,
    });

    // Clear the form fields
    setFirstName("");
    setLastName("");
    setDateType("Birthday");
    setSelectedDate(null);
  };

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  const renderDateSelector = () => {
    if (showDatePicker) {
      return (
        <View style={styles.datePickerContainer}>
          <DateTimePicker
            value={selectedDate || new Date()}
            mode="date"
            is24Hour={true}
            display="spinner"
            onChange={handleDateChange}
            style={styles.datePicker}
            maximumDate={new Date()}
            textColor="#FFFFFF" // Set the text color to white
          />
        </View>
      );
    } else {
      return (
        <TouchableOpacity onPress={showDatepicker} style={styles.button}>
          <Text style={styles.buttonText}>Select Date</Text>
        </TouchableOpacity>
      );
    }
  };

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <View style={styles.container}>
        <Text style={styles.label}>First Name:</Text>
        <TextInput
          value={firstName}
          onChangeText={setFirstName}
          placeholder="Enter first name"
          style={styles.input}
          returnKeyType="next"
          onSubmitEditing={() => lastNameInput.focus()}
        />

        <Text style={styles.label}>Last Name:</Text>
        <TextInput
          value={lastName}
          onChangeText={setLastName}
          placeholder="Enter last name"
          style={styles.input}
          returnKeyType="next"
          ref={(input) => (lastNameInput = input)}
          onSubmitEditing={() => dateTypeInput.focus()}
        />

        <Text style={styles.label}>Date Type:</Text>
        <Picker
          selectedValue={dateType}
          onValueChange={setDateType}
          style={styles.picker}
          ref={(input) => (dateTypeInput = input)}
        >
          <Picker.Item label="Birthday" value="Birthday" />
          <Picker.Item label="Anniversary" value="Anniversary" />
          <Picker.Item label="Holiday" value="Holiday" />
          <Picker.Item label="Reminder" value="Reminder" />
        </Picker>

        {renderDateSelector()}

        <Button
          onPress={handleSave}
          title={selectedEntry ? "Update" : "Save"}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    padding: 8,
    marginBottom: 12,
  },
  picker: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    marginBottom: 12,
  },
  datePickerContainer: {
    backgroundColor: "#333333", // Set the background color to a darker shade
    borderRadius: 4,
    marginBottom: 12,
  },
  datePicker: {
    marginBottom: 12,
    color: "#FFFFFF", // Set the text color to white
  },
  button: {
    backgroundColor: "#007AFF",
    borderRadius: 4,
    paddingVertical: 10,
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
  },
});

export default EntryForm;

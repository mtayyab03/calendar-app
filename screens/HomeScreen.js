import React, { useEffect } from "react";
import {
  View,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Text,
} from "react-native";
import EntryForm from "../components/EntryForm";

const HomeScreen = ({ navigation, route }) => {
  const { params } = route;
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate("Entries")}
        >
          <Text style={styles.addButtonLabel}>Entries</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  const handleSaveEntry = (entry) => {
    // Handle saving the entry logic here
    // ...

    // Update the entries state
    const { entries, setEntries } = params;
    setEntries([...entries, entry]);
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <TouchableOpacity></TouchableOpacity>
        <View style={styles.pickerContainer}>
          <EntryForm onSave={handleSaveEntry} />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  pickerContainer: {
    marginBottom: 16,
  },
  addButton: {
    marginRight: 16,
  },
  addButtonLabel: {
    fontSize: 16,
    color: "#fff",
  },
});

export default HomeScreen;

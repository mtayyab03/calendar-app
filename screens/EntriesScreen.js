import React from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

const EntriesScreen = ({ entries }) => {
  const handleEditItem = (item) => {
    // Handle editing item logic here
    // ...
  };

  const handleDeleteItem = (id) => {
    // Confirm deletion
    // ...
    // Handle deleting item logic here
    // ...
  };

  const renderItem = ({ item }) => {
    const { id, firstName, lastName, dateType, selectedDate } = item;

    let dateText = "";
    if (selectedDate) {
      dateText = selectedDate.toDateString();
    }

    return (
      <TouchableOpacity
        style={styles.itemContainer}
        onPress={() => handleEditItem(item)}
      >
        <Text style={styles.itemText}>{id}</Text>
        <Text style={styles.itemText}>{`${firstName} ${lastName}`}</Text>
        <Text style={styles.itemText}>{dateType}</Text>
        <Text style={styles.itemText}>{dateText}</Text>
        <TouchableOpacity
          style={styles.iconContainer}
          onPress={() => handleDeleteItem(id)}
        >
          <Icon name="trash" size={20} color="#FF0000" />
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };
  const keyExtractor = (item) => {
    if (item && item.id) {
      return item.id.toString();
    }
    return null;
  };
  return (
    <View style={styles.container}>
      <FlatList
        data={entries}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  itemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#F0F0F0",
    borderRadius: 4,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 8,
  },
  itemText: {
    fontSize: 16,
  },
  iconContainer: {
    marginLeft: 8,
  },
});

export default EntriesScreen;

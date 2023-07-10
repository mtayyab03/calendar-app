import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import HomeScreen from "./screens/HomeScreen";
import EntriesScreen from "./screens/EntriesScreen";

const Drawer = createDrawerNavigator();

const App = () => {
  const [entries, setEntries] = useState([]);

  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen
          name="Home"
          component={HomeScreen}
          initialParams={{ entries, setEntries }}
        />

        <Drawer.Screen
          name="Entries"
          component={() => <EntriesScreen entries={entries} />}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default App;

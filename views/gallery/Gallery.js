import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Image,
  ImageBackground,
  Animated,
  PanResponder,
  FlatList,
} from "react-native";
import { createStackNavigator } from "@react-navigation/stack";

import useTheme from "../../theme/theme";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

const Stack = createStackNavigator();

function GalleryList() {
  const theme = useTheme();
  const styles = {
    container: {
      flex: 1,
      flexGrow: 1,
      justifyContent: "flex-start",
      alignItems: "center",
      backgroundColor: theme.colors.lightBackground,
    },
    galleryContainer: {
      width: "100%",
      height: "100%",
    },
    imageContainer: {
      width: "33%",
      aspectRatio: 1,
      justifyContent: "center",
      alignItems: "center",
      overflow: "hidden",

      padding: 1,
    },
    image: {
      width: "100%",
      height: "100%",
    },
  };
  const [images, setImages] = useState([
    { id: 1, source: require("../../assets/kissa10.jpg") },
    { id: 2, source: require("../../assets/kissa9.jpg") },
    { id: 3, source: require("../../assets/kissa8.jpg") },
    { id: 4, source: require("../../assets/kissa7.jpg") },
    { id: 5, source: require("../../assets/kissa6.jpg") },
    { id: 6, source: require("../../assets/kissa5.jpg") },
    { id: 7, source: require("../../assets/kissa4.jpg") },
    { id: 8, source: require("../../assets/kissa3.jpg") },
    { id: 9, source: require("../../assets/kissa2.jpg") },
    { id: 10, source: require("../../assets/kissa1.jpg") },
    { id: 11, source: require("../../assets/kissa10.jpg") },
    { id: 12, source: require("../../assets/kissa9.jpg") },
    { id: 13, source: require("../../assets/kissa8.jpg") },
    { id: 14, source: require("../../assets/kissa7.jpg") },
    { id: 15, source: require("../../assets/kissa6.jpg") },
    { id: 16, source: require("../../assets/kissa5.jpg") },
    { id: 17, source: require("../../assets/kissa4.jpg") },
    { id: 18, source: require("../../assets/kissa3.jpg") },
    { id: 19, source: require("../../assets/kissa2.jpg") },
    { id: 20, source: require("../../assets/kissa1.jpg") },
  ]);

  const Item = ({ item }) => {
    return (
      <TouchableOpacity style={styles.imageContainer}>
        <Image source={item.source} style={styles.image} />
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.galleryContainer}>
        <FlatList
          data={images}
          numColumns={3}
          renderItem={Item}
          keyExtractor={(item) => item.id}
        />
      </View>
    </SafeAreaView>
  );
}

export default function Gallery() {
  const theme = useTheme();
  const [searchText, setSearchText] = useState("");

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="CallList"
        options={({ navigation, route }) => ({
          headerLargeTitle: true,
          headerLargeTitleStyle: {
            fontFamily: theme.font,
            color: theme.colors.text,
          },
          headerTitleStyle: {
            fontFamily: theme.font,
            fontSize: theme.text.headerText,
            color: theme.colors.text,
          },
          headerStyle: {
            backgroundColor: theme.colors.background,
          },
          headerTitle: "Gallery",

          headerRight: () => (
            <TouchableOpacity
              style={{
                marginRight: 10,
              }}
            >
              <MaterialCommunityIcons
                name="cog-outline"
                size={30}
                color={theme.colors.text}
              />
            </TouchableOpacity>
          ),
        })}
      >
        {(props) => <GalleryList {...props} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
}

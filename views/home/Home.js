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
} from "react-native";
import useTheme from "../../theme/theme";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

import AnimatedCard from "./components/AnimatedCard";

export default function Home() {
  const theme = useTheme();
  const styles = {
    container: {
      flex: 1,
      flexGrow: 1,
      justifyContent: "flex-start",
      alignItems: "center",
      backgroundColor: theme.colors.lightBackground,
    },
    logoContainer: {
      width: "100%",
      height: "10%",
      justifyContent: "center",
      alignItems: "center",
    },
    logo: {
      width: "50%",
      height: "100%",
      resizeMode: "contain",
    },
    cardContainer: {
      width: "90%",
      height: "85%",
    },
    card: {
      width: "100%",
      height: "100%",
      justifyContent: "flex-end",
      alignItems: "center",
      overflow: "hidden",
      borderRadius: theme.size.borderRadius,
    },
    image: {
      width: "100%",
      height: "100%",
      borderRadius: theme.size.borderRadius,
    },

    buttonsContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      width: "90%",
    },
    buttonContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    dislikeButton: {
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 50,

      borderWidth: 2,
      borderColor: theme.colors.danger,
      margin: theme.size.margin,
      padding: theme.size.paddingBig,
    },
    likeButton: {
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 50,

      borderWidth: 2,
      borderColor: theme.colors.success,
      margin: theme.size.margin,
      padding: theme.size.paddingBig,
    },
    skipButton: {
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 50,

      borderWidth: 2,
      borderColor: theme.colors.text,
      margin: theme.size.margin,
      padding: theme.size.paddingBig,
    },
  };
  const [activeId, setActiveId] = useState(1);
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
  ]);

  const [lastFiveImages, setLastFiveImages] = useState([]);

  // const nextCardBlur = pan.x.interpolate({
  //   inputRange: [-200, 0, 200],
  //   outputRange: [10, 0, 10],
  //   extrapolate: "clamp",
  // });

  // const nextCardScale = pan.x.interpolate({
  //   inputRange: [-200, 0, 200],
  //   outputRange: [1, 0.8, 1],
  //   extrapolate: "clamp",
  // });

  const removeImageFromList = (image) => {
    addToLastFiveImages(image);
    setImages((prevImages) => prevImages.slice(1));
  };

  const addToLastFiveImages = (image) => {
    setLastFiveImages((prevImages) => {
      if (prevImages.length >= 5) {
        prevImages.shift();
      }

      return [...prevImages, image];
    });
  };

  const rewindLastFiveImages = () => {
    setImages((prevImages) => {
      if (lastFiveImages.length > 0) {
        console.log("rewind", [...lastFiveImages, ...prevImages]);
        return [...lastFiveImages, ...prevImages];
      }
      return prevImages;
    });
    setActiveId(lastFiveImages[0].id);
    setLastFiveImages([]);
  };

  useEffect(() => {
    console.log("activeId", activeId);
  }, [activeId]);

  useEffect(() => {
    const ids = images.map((image) => image.id);
    console.log("ids", ids);
  }, [images]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          source={require("../../assets/DandelionTransparent.png")}
          style={styles.logo}
        />
      </View>
      <View style={styles.cardContainer}>
        {images
          .map((image, index) => {
            return (
              <AnimatedCard
                image={image}
                key={image.id}
                activeId={activeId}
                setActiveId={setActiveId}
                removeImageFromList={removeImageFromList}
                rewindLastFiveImages={rewindLastFiveImages}
              />
            );
          })
          .reverse()}
      </View>
    </SafeAreaView>
  );
}

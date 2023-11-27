import React, { useRef, useState, useMemo, useEffect } from "react";
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
import useTheme from "../../../theme/theme";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

export default function AnimatedCard({
  image,
  activeId,
  setActiveId,
  removeImageFromList,
  rewindLastFiveImages,
}) {
  const theme = useTheme();
  const styles = {
    cardContainer: {
      width: "100%",
      height: "100%",
      position: "absolute",
      backgroundColor: "white",
      borderRadius: theme.size.borderRadius,
      shadowColor: theme.colors.shadow,
      shadowOffset: { width: -2, height: 4 },
      shadowOpacity: 0.4,
      shadowRadius: 3,
      overflow: "hidden",
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

  const pan = useRef(new Animated.ValueXY()).current;

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event([null, { dx: pan.x, dy: pan.y }], {
        useNativeDriver: false,
      }),
      onPanResponderRelease: async (evt, gestureState) => {
        if (gestureState.dx > 120) {
          swipeRight(gestureState);
        } else if (gestureState.dx < -120) {
          swipeLeft(gestureState);
        } else {
          await Animated.spring(pan, {
            toValue: { x: 0, y: 0 },
            useNativeDriver: false,
            friction: 5,
          }).start(() => {});
        }
      },
    })
  ).current;

  const rotate = pan.x.interpolate({
    inputRange: [-400, 0, 400],
    outputRange: ["-30deg", "0deg", "30deg"],
    extrapolate: "clamp",
  });

  const likeOpacity = pan.x.interpolate({
    inputRange: [-200, 0, 200],
    outputRange: [0, 1, 1],
    extrapolate: "clamp",
  });

  const dislikeOpacity = pan.x.interpolate({
    inputRange: [-200, 0, 200],
    outputRange: [1, 1, 0],
    extrapolate: "clamp",
  });

  const skipOpacity = pan.x.interpolate({
    inputRange: [-200, 0, 200],
    outputRange: [0, 1, 0],
    extrapolate: "clamp",
  });

  const swipeLeft = (gestureState) => {
    Animated.spring(pan, {
      toValue: { x: -500, y: 0 },
      useNativeDriver: false,
    }).start(() => {
      removeImageFromList(image);
      pan.setValue({ x: 0, y: 0 });
    });
    setActiveId((prevId) => prevId + 1);
  };

  const swipeRight = (gestureState) => {
    Animated.spring(pan, {
      toValue: { x: 500, y: 0 },
      useNativeDriver: false,
    }).start(() => {
      removeImageFromList(image);
      pan.setValue({ x: 0, y: 0 });
    });
    setActiveId((prevId) => prevId + 1);
  };

  return (
    <Animated.View
      style={{
        width: "100%",
        height: "100%",
        position: "absolute",
        backgroundColor: "white",
        borderRadius: theme.size.borderRadius,
        shadowColor: theme.colors.shadow,
        shadowOffset: { width: -2, height: 4 },
        shadowOpacity: 0.4,
        shadowRadius: 3,
        overflow: "hidden",

        transform: [
          { translateX: pan.x },
          { translateY: pan.y },
          { rotate: rotate },
        ],
      }}
      {...(activeId === image.id ? panResponder.panHandlers : {})}
    >
      <ImageBackground source={image.source} style={styles.image}>
        <LinearGradient
          colors={["transparent", "rgba(0,0,0,0.9)"]}
          style={styles.card}
        >
          <View style={styles.buttonsContainer}>
            <Animated.View style={{ opacity: dislikeOpacity }}>
              <TouchableOpacity
                style={styles.dislikeButton}
                onPress={swipeLeft}
              >
                <MaterialCommunityIcons
                  style={styles.icon}
                  name={"close"}
                  size={48}
                  color={theme.colors.danger}
                />
              </TouchableOpacity>
            </Animated.View>
            <Animated.View style={{ opacity: skipOpacity }}>
              <TouchableOpacity
                style={styles.skipButton}
                //onPress={rewindLastFiveImages}
              >
                <MaterialCommunityIcons
                  style={styles.icon}
                  name={"rewind-5"}
                  size={24}
                  color={theme.colors.text}
                />
              </TouchableOpacity>
            </Animated.View>
            <Animated.View style={{ opacity: likeOpacity }}>
              <TouchableOpacity style={styles.likeButton} onPress={swipeRight}>
                <MaterialCommunityIcons
                  style={styles.icon}
                  name={"check"}
                  size={48}
                  color={theme.colors.success}
                />
              </TouchableOpacity>
            </Animated.View>
          </View>
        </LinearGradient>
      </ImageBackground>
    </Animated.View>
  );
}

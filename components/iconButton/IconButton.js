import { signInWithEmailAndPassword } from "firebase/auth";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import useTheme from "../../theme/theme";
import React, { useState, useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
  ImageBackground,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from "react-native";
import { ThemeContext } from "../../App";

import { LinearGradient } from "expo-linear-gradient";

import { auth } from "../../config/firebase";

export function IconButton({ onClick, icon, disabled, title, type }) {
  const theme = useTheme();
  const styles = {
    button: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      borderRadius: 50,
      backgroundColor: theme.colors[type],
      margin: theme.size.margin,
      padding: theme.size.paddingSmall,

      shadowColor: theme.colors[type],
      shadowOffset: { width: -2, height: 4 },
      shadowOpacity: 0.4,
      shadowRadius: 3,
    },
    buttonDisabled: {
      opacity: theme.opacity.disabled,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      borderRadius: 50,
      backgroundColor: theme.colors.textBackground,
      margin: theme.size.margin,
      padding: theme.size.paddingSmall,
      shadowColor: theme.colors.textBackground,
      shadowOffset: { width: -2, height: 4 },
      shadowOpacity: 0.4,
      shadowRadius: 3,
    },
    buttonText: {
      color: theme.colors.textDark,
      fontFamily: theme.font,
      fontSize: theme.text.headerText,
      padding: theme.size.padding,
    },
    buttonTextDisabled: {
      color: theme.colors.text,
      fontFamily: theme.font,
      fontSize: theme.text.headerText,
      padding: theme.size.padding,
    },
    textInputIcon: {},
    iconContainer: {
      borderRadius: 50,
      padding: theme.size.padding,
    },
  };

  return (
    <TouchableOpacity
      style={disabled ? styles.buttonDisabled : styles.button}
      disabled={disabled}
      onPress={onClick}
    >
      <Text style={disabled ? styles.buttonTextDisabled : styles.buttonText}>
        {title}
      </Text>

      <View style={styles.iconContainer}>
        <MaterialCommunityIcons
          style={styles.textInputIcon}
          name={icon}
          size={24}
          color={disabled ? theme.colors.textSecondary : theme.colors.textDark}
        />
      </View>
    </TouchableOpacity>
  );
}

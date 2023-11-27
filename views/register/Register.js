import { MaterialCommunityIcons } from "@expo/vector-icons";
import { createUserWithEmailAndPassword } from "firebase/auth";
import useTheme from "../../theme/theme";
import {
  collection,
  doc,
  where,
  query,
  getDocs,
  getDoc,
  setDoc,
} from "firebase/firestore";
import React, { useState, useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  ScrollView,
  SafeAreaView,
  ImageBackground,
  Platform,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
  TouchableOpacity,
} from "react-native";
import { IconButton } from "../../components/iconButton/IconButton";

import { ThemeContext } from "../../App";
import { auth, firestore } from "../../config/firebase";

export default function Register({ navigation }) {
  const theme = useTheme();

  const styles = {
    container: {
      justifyContent: "center",
    },
    headerContainer: {
      justifyContent: "center",
      alignItems: "center",
      margin: theme.size.margin,
    },
    headerText: {
      color: theme.colors.text,
      fontFamily: theme.font,
      fontSize: theme.text.hugeText,
      margin: theme.size.margin,
    },
    background: {
      flexGrow: 1,
      justifyContent: "center",
      backgroundColor: theme.colors.lightBackground,
    },
    loginContainer: {
      width: "90%",
      backgroundColor: theme.colors.background,
      padding: theme.size.padding,
      borderRadius: theme.size.borderRadius,
      shadowColor: theme.colors.shadow,
      shadowOffset: { width: -2, height: 4 },
      shadowOpacity: 0.4,
      shadowRadius: 3,
    },
    loginHeader: {
      color: theme.colors.text,
      fontFamily: theme.font,
      fontSize: theme.text.callText,

      margin: theme.size.margin,
    },
    input: {
      margin: theme.size.margin,
      color: theme.colors.text,
      fontSize: theme.text.headerText,
      padding: theme.size.padding,
      borderRadius: 50,
      backgroundColor: theme.colors.textBackground,
      fontFamily: theme.font,
    },
    textInputContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      borderRadius: 50,
      backgroundColor: theme.colors.textBackground,
      shadowColor: theme.colors.shadow,
      shadowOffset: { width: -2, height: 4 },
      shadowOpacity: 0.4,
      shadowRadius: 3,
      padding: theme.size.paddingSmall,
      margin: theme.size.margin,
    },
    textInput: {
      flex: 1,
      color: theme.colors.text,
      fontFamily: theme.font,
      fontSize: theme.text.headerText,
      padding: theme.size.padding,
    },
    loginButtonContainer: {
      flexDirection: "row",
      justifyContent: "flex-end",
    },
    button: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      borderRadius: 50,
      backgroundColor: theme.colors.secondary,
      margin: theme.size.margin,
      padding: theme.size.paddingSmall,

      shadowColor: theme.colors.secondary,
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
    registerButtonContainer: {
      justifyContent: "center",
      alignItems: "center",
      margin: theme.size.margin,
    },
    registerText: {
      color: theme.colors.text,
      fontFamily: theme.font,
      fontSize: theme.text.bodyText,
    },
    registerButton: {
      marginLeft: theme.size.marginSmall,
    },
    registerButtonText: {
      color: theme.colors.text,
      fontFamily: theme.font,
      fontSize: theme.text.bodyText,
      textDecorationLine: "underline",
    },
    errorContainer: {
      justifyContent: "center",
      alignItems: "center",
      height: 20,
    },
    errorText: {
      color: theme.colors.danger,
      fontFamily: theme.font,
      fontSize: theme.text.bodyText,
    },
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordAgain, setPasswordAgain] = useState("");
  const [error, setError] = useState(false);

  const onHandleSignup = async () => {
    if (email !== "" && password !== "" && passwordAgain === password) {
      createUserWithEmailAndPassword(auth, email, password).catch((err) =>
        handleSignupError(err)
      );
    } else {
      console.log("Please give email and password");
    }
  };

  const handleSignupError = (err) => {
    setError(true);
    setEmail("");
    setPassword("");
    setPasswordAgain("");
    console.log(err);
  };

  const buttonDisabled = !(
    password.length >= 6 &&
    email.length &&
    password === passwordAgain
  );

  return (
    <>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.background}>
          <View
            style={{
              position: "absolute",
              top: -50,
              left: -150,
              width: "100%",
              aspectRatio: 1,
              borderRadius: theme.size.borderRadius,
              backgroundColor: theme.colors.secondaryLighter,
              transform: [{ rotate: "45deg" }],
            }}
          />
          <View
            style={{
              position: "absolute",
              top: -100,
              left: -170,
              width: "100%",
              aspectRatio: 1,
              borderRadius: theme.size.borderRadius,
              backgroundColor: theme.colors.secondaryLight,
              transform: [{ rotate: "45deg" }],
            }}
          />
          <View
            style={{
              position: "absolute",
              top: -150,
              left: -200,
              width: "100%",
              aspectRatio: 1,
              borderRadius: theme.size.borderRadius,
              backgroundColor: theme.colors.secondary,
              transform: [{ rotate: "45deg" }],
            }}
          />

          <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView
              style={{
                alignItems: "center",
              }}
              behavior={Platform.OS === "ios" ? "padding" : "height"}
            >
              <View style={styles.headerContainer}>
                <Text style={styles.headerText}>{"Let's get started!"}</Text>
              </View>
              <View style={styles.loginContainer}>
                <View>
                  <Text style={styles.loginHeader}>SIGN UP</Text>
                </View>
                <View style={styles.errorContainer}>
                  {error && (
                    <Text style={styles.errorText}>
                      This email is already associated with an account
                    </Text>
                  )}
                </View>

                <View style={styles.textInputContainer}>
                  <TextInput
                    placeholder="Let's get your email"
                    autoCapitalize="none"
                    keyboardType="email-address"
                    textContentType="emailAddress"
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                    style={styles.textInput}
                  />
                  <View style={styles.iconContainer}>
                    <MaterialCommunityIcons
                      style={styles.textInputIcon}
                      name="email"
                      size={24}
                      color={
                        email.length
                          ? theme.colors.secondary
                          : theme.colors.textSecondary
                      }
                    />
                  </View>
                </View>

                <View style={styles.textInputContainer}>
                  <TextInput
                    placeholder="Enter password"
                    autoCapitalize="none"
                    autoCorrect={false}
                    secureTextEntry
                    textContentType="password"
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                    style={styles.textInput}
                  />
                  <View style={styles.iconContainer}>
                    <MaterialCommunityIcons
                      style={styles.textInputIcon}
                      name={password.length >= 6 ? "lock-check" : "lock"}
                      size={24}
                      color={
                        password.length >= 6
                          ? theme.colors.secondary
                          : theme.colors.textSecondary
                      }
                    />
                  </View>
                </View>
                <View style={styles.textInputContainer}>
                  <TextInput
                    placeholder="Enter password again"
                    autoCapitalize="none"
                    autoCorrect={false}
                    secureTextEntry
                    textContentType="password"
                    value={passwordAgain}
                    onChangeText={(text) => setPasswordAgain(text)}
                    style={styles.textInput}
                  />
                  <View style={styles.iconContainer}>
                    <MaterialCommunityIcons
                      style={styles.textInputIcon}
                      name={
                        passwordAgain.length >= 6 && password === passwordAgain
                          ? "lock-check"
                          : "lock"
                      }
                      size={24}
                      color={
                        passwordAgain.length >= 6 && password === passwordAgain
                          ? theme.colors.secondary
                          : theme.colors.textSecondary
                      }
                    />
                  </View>
                </View>
                <View style={styles.loginButtonContainer}>
                  <IconButton
                    title="Sign up"
                    icon="arrow-right"
                    onClick={onHandleSignup}
                    disabled={buttonDisabled}
                    type="secondary"
                  />
                </View>
              </View>

              <View>
                <View style={styles.registerButtonContainer}>
                  <Text style={styles.registerText}>
                    {"Already have an account?"}
                  </Text>
                  <TouchableOpacity
                    onPress={() => navigation.navigate("Login")}
                    style={styles.registerButton}
                  >
                    <Text style={styles.registerButtonText}>Sign in!</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </KeyboardAvoidingView>
          </SafeAreaView>
        </View>
      </TouchableWithoutFeedback>
    </>
  );
}

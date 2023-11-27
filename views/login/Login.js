import { signInWithEmailAndPassword } from "firebase/auth";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import useTheme from "../../theme/theme";
import React, { useState } from "react";
import {
  Text,
  View,
  TextInput,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from "react-native";
import { IconButton } from "../../components/iconButton/IconButton";
import { auth } from "../../config/firebase";

export default function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const theme = useTheme();
  const styles = {
    container: {
      justifyContent: "center",
    },
    headerContainer: {
      justifyContent: "center",
      alignItems: "center",
      margin: theme.size.margin,

      maxHeight: "20%",
      width: "100%",
    },
    logoContainer: {
      justifyContent: "center",
      alignItems: "center",
    },
    logo: {
      resizeMode: "center",
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

  const onHandleLogin = () => {
    if (email !== "" && password !== "") {
      signInWithEmailAndPassword(auth, email, password)
        .then(() => console.log("Login success"))
        .catch((err) => handleLoginError(err));
    } else {
      console.log("Please give email and password");
    }
  };

  const handleLoginError = (err) => {
    setError(true);
    setEmail("");
    setPassword("");
    console.log(err);
  };

  const buttonDisabled = !(email.length && password.length);

  return (
    <>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.background}>
          <View
            style={{
              position: "absolute",
              bottom: -50,
              right: -150,
              width: "100%",
              aspectRatio: 1,
              borderRadius: theme.size.borderRadius,
              backgroundColor: theme.colors.primaryLighter,
              transform: [{ rotate: "45deg" }],
            }}
          />
          <View
            style={{
              position: "absolute",
              bottom: -100,
              right: -170,
              width: "100%",
              aspectRatio: 1,
              borderRadius: theme.size.borderRadius,
              backgroundColor: theme.colors.primaryLight,
              transform: [{ rotate: "45deg" }],
            }}
          />
          <View
            style={{
              position: "absolute",
              bottom: -150,
              right: -200,
              width: "100%",
              aspectRatio: 1,
              borderRadius: theme.size.borderRadius,
              backgroundColor: theme.colors.primary,
              transform: [{ rotate: "45deg" }],
            }}
          />

          <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView
              style={{
                alignItems: "center",
              }}
              behavior={Platform.OS === "ios" ? "padding" : "height"}
              keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
            >
              <View style={styles.headerContainer}>
                <View style={styles.logoContainer}>
                  <Image
                    style={styles.logo}
                    source={require("../../assets/DandelionTransparent.png")}
                  />
                </View>
              </View>
              <View style={styles.loginContainer}>
                <View>
                  <Text style={styles.loginHeader}>SIGN IN</Text>
                </View>

                <View style={styles.errorContainer}>
                  {error && (
                    <Text style={styles.errorText}>
                      Invalid username or password
                    </Text>
                  )}
                </View>

                <View style={styles.textInputContainer}>
                  <TextInput
                    style={styles.textInput}
                    placeholder="Enter email"
                    autoCapitalize="none"
                    keyboardType="email-address"
                    textContentType="emailAddress"
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                  />
                  <View style={styles.iconContainer}>
                    <MaterialCommunityIcons
                      style={styles.textInputIcon}
                      name="email"
                      size={24}
                      color={
                        email.length
                          ? theme.colors.primary
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
                      name={password.length ? "lock-open" : "lock"}
                      size={24}
                      color={
                        password.length
                          ? theme.colors.primary
                          : theme.colors.textSecondary
                      }
                    />
                  </View>
                </View>
                <View style={styles.loginButtonContainer}>
                  <IconButton
                    title="Sign in"
                    icon="arrow-right"
                    onClick={onHandleLogin}
                    disabled={buttonDisabled}
                    type="primary"
                  />
                </View>
              </View>

              <View>
                <View style={styles.registerButtonContainer}>
                  <Text style={styles.registerText}>
                    {"Don't have an account?"}
                  </Text>
                  <TouchableOpacity
                    onPress={() => navigation.navigate("Register")}
                    style={styles.registerButton}
                  >
                    <Text style={styles.registerButtonText}>Sign up!</Text>
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

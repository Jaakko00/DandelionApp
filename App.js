import { MaterialCommunityIcons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Audio } from "expo-av";
import { onAuthStateChanged } from "firebase/auth";
import {
  collection,
  onSnapshot,
  doc,
  where,
  query,
  getDocs,
  getDoc,
  updateDoc,
  orderBy,
  limit,
  setDoc,
} from "firebase/firestore";
import * as React from "react";
import { useEffect, useState, createContext, useContext } from "react";
import {
  Text,
  View,
  ActivityIndicator,
  LogBox,
  Appearance,
  useColorScheme,
} from "react-native";

import { auth, firestore } from "./config/firebase";
import HomeView from "./views/home/Home";
import GalleryView from "./views/gallery/Gallery";
import LoginView from "./views/login/Login";
import RegisterView from "./views/register/Register";
import useTheme from "./theme/theme";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

export const AuthenticatedUserContext = createContext({});


LogBox.ignoreLogs([
  "AsyncStorage has been extracted from react-native core",
  "Require cycle: App.js",
  "->",
  "EventEmitter.removeListener",
]);

function NavigationTabs() {
  const theme = useTheme()
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.text,
        tabBarActiveBackgroundColor: "transparent",
        tabBarInactiveBackgroundColor: "transparent",
        headerShown: false,
        tabBarStyle: {
          borderTopWidth: 0,
          labelStyle: {
            fontFamily: "Futura",
          },
          backgroundColor: theme.colors.background,
        },
        tabBarLabelStyle: {
          fontFamily: "Futura",
        },

        contentStyle: {
          backgroundColor: theme.colors.background,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeView}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color, size, focused }) => (
            <MaterialCommunityIcons
              name={!focused ? "home-outline" : "home"}
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Gallery"
        component={GalleryView}
        options={{
          tabBarLabel: "Gallery",
          tabBarIcon: ({ color, size, focused }) => (
            <MaterialCommunityIcons
              name={!focused ? "image-multiple-outline" : "image-multiple"}
              color={color}
              size={size}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

function AuthenticationStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginView} />
      <Stack.Screen name="Register" component={RegisterView} />
    </Stack.Navigator>
  );
}

const AuthenticatedUserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userInfo, setUserInfo] = useState();
  return (
    <AuthenticatedUserContext.Provider
      value={{
        user,
        setUser,
        userInfo,
        setUserInfo,
      }}
    >
      {children}
    </AuthenticatedUserContext.Provider>
  );
};

function RootNavigator() {
  const { user, setUser } = useContext(AuthenticatedUserContext);
  const theme = useTheme()
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // onAuthStateChanged returns an unsubscriber
    const unsubscribeAuth = onAuthStateChanged(
      auth,
      async (authenticatedUser) => {
        authenticatedUser ? setUser(authenticatedUser) : setUser(null);
        setIsLoading(false);
      }
    );

    // unsubscribe auth listener on unmount
    return unsubscribeAuth;
  }, [user]);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
  return (
    <NavigationContainer>
      {user ? <NavigationTabs theme={theme} /> : <AuthenticationStack />}
    </NavigationContainer>
  );
}

export default function App() {
  const navTheme = {
    colors: {
      background: "#fff",
    },
  };

  return (
    <AuthenticatedUserProvider>
      <RootNavigator />
    </AuthenticatedUserProvider>
  );
}

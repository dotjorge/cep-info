import React from "react"
import { NativeBaseProvider, useColorModeValue, extendTheme } from "native-base"

import { NavigationContainer } from "@react-navigation/native"
import { View } from "react-native"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import Ionicons from "react-native-vector-icons/Ionicons"

// Screens
import AddItem from "./src/screens/AddItem"

const Tab = createBottomTabNavigator()

// Define the config
const config = {
  useSystemColorMode: false,
  initialColorMode: "light",
}

// Extend the theme
const customTheme = extendTheme({ config })

export default function App() {
  return (
    <NativeBaseProvider theme={customTheme}>
      <Screens />
    </NativeBaseProvider>
  )
}

function Screens() {
  const { colors } = customTheme
  const activeColor = useColorModeValue(colors.amber[500], colors.amber[900])
  const inactiveColor = useColorModeValue(colors.light[600], colors.amber[400])

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarIcon: ({ color, size }) => {
            return (
              <View style={{ position: "relative" }}>
                <Ionicons
                  name={"navigate-circle"}
                  size={80}
                  color={color}
                  style={{ marginTop: -40 }}
                />
              </View>
            )
          },
          tabBarActiveTintColor: activeColor,
          tabBarInactiveTintColor: inactiveColor,
          tabBarShowLabel: false,
        })}>
        <Tab.Screen name="Check cep" component={AddItem} />
      </Tab.Navigator>
    </NavigationContainer>
  )
}

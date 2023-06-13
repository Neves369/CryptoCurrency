/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { FontAwesome, AntDesign, Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import { ColorSchemeName, Text, View, Image } from "react-native";

import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import Creditos from "../screens/Transacoes";
import NotFound from "../screens/NotFound";
import Precos from "../screens/Precos";
import Dashboard from "../screens/Dashboard";
import Configuracoes from "../screens/Configuracoes";
import {
  RootStackParamList,
  RootTabParamList,
  RootTabScreenProps,
} from "../types";
import Detalhes from "../screens/Detalhes";
import LinkingConfiguration from "./LinkingConfiguration";
import { COLORS, FONTS, icons, SIZES } from "../constants";
import Transacoes from "../screens/Transacoes";

export default function Navigation({
  colorScheme,
}: {
  colorScheme: ColorSchemeName;
}) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
    >
      <RootNavigator />
    </NavigationContainer>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Root"
        component={BottomTabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="NotFound"
        component={NotFound}
        options={{ title: "Oops!" }}
      />
      <Stack.Screen
        name="Detalhes"
        component={Detalhes}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="Transações"
        component={Transacoes}
        options={{ headerShown: false }}
      />

      <Stack.Group screenOptions={{ presentation: "modal" }}>
        <Stack.Screen name="Créditos" component={Creditos} />
      </Stack.Group>
    </Stack.Navigator>
  );
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="Dashboard"
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Colors[colorScheme].tint,
      }}
    >
      <BottomTab.Screen
        name="Dashboard"
        component={Dashboard}
        options={({ navigation }: RootTabScreenProps<"Dashboard">) => ({
          title: "Home",
          tabBarIcon: ({ color }) => (
            <Image
              source={icons.home}
              style={{
                width: 30,
                height: 30,
                tintColor: color,
              }}
            />
          ),
        })}
      />
      <BottomTab.Screen
        name="Portifolio"
        component={Configuracoes}
        options={{
          title: "Portifólio",
          tabBarIcon: ({ color }) => (
            <Image
              source={icons.pie_chart}
              style={{
                width: 30,
                height: 30,
                tintColor: color,
              }}
            />
          ),
        }}
      />
      <BottomTab.Screen
        name="Transacoes"
        component={Transacoes}
        options={{
          tabBarLabel: ({ focused }) => {
            let label;
            return (label = focused ? (
              <Text style={{ fontSize: 10, color: "gray" }}></Text>
            ) : null);
          },
          tabBarIcon: ({ color }) => (
            <View
              style={{
                width: 60,
                height: 60,
                borderRadius: 40,
                backgroundColor: COLORS.secondary,
                marginTop: -30,
                elevation: 10,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Image
                source={icons.transaction}
                style={{
                  width: 30,
                  height: 30,
                  tintColor: COLORS.white,
                }}
              />
            </View>
          ),
        }}
      />
      <BottomTab.Screen
        name="Precos"
        component={Configuracoes}
        options={{
          title: "Prices",
          tabBarIcon: ({ color }) => (
            <Image
              source={icons.line_graph}
              style={{
                width: 30,
                height: 30,
                tintColor: color,
              }}
            />
          ),
        }}
      />
      <BottomTab.Screen
        name="Configuracoes"
        component={Configuracoes}
        options={{
          title: "Settings",
          tabBarIcon: ({ color }) => (
            <Image
              source={icons.settings}
              style={{
                width: 30,
                height: 30,
                tintColor: color,
              }}
            />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />;
}

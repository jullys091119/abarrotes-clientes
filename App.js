import { useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";
import { NativeBaseProvider } from "native-base";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as Font from "expo-font";
import { AppProvider } from "./context/context";
import * as eva from "@eva-design/eva";
import { ApplicationProvider, Layout, Text } from "@ui-kitten/components";
import { PaperProvider } from "react-native-paper";

//screen
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import BarcodeScanner from "./helpers/BarcodeScanner";
import MenuDashboard from "./components/MenuDashboard";
import RegistroProducto from "./components/RegistroProducto";
import Inventario from "./components/Inventario";
import Venta from "./components/Venta";

//helpers
const Stack = createNativeStackNavigator();

export default function App() {
  useEffect(() => {
    const loadFonts = async () => {
      await Font.loadAsync({
        "inter-medium": require("./assets/fonts/Inter/static/Inter-Medium.ttf"),
        "inter-thin": require("./assets/fonts/Inter/static/Inter-Thin.ttf"),
        "inter-regular": require("./assets/fonts/Inter/static/Inter-Regular.ttf"),
      });
    };

    loadFonts();
  }, []);

  return (
    <>
      <AppProvider>
        <PaperProvider>
          <ApplicationProvider {...eva} theme={eva.light}>
            <NativeBaseProvider>
              <NavigationContainer>
                <Stack.Navigator>
                  <Stack.Screen
                    name="Login"
                    component={Login}
                    options={{
                      headerTitle: "",
                      title: "My home",
                      headerStyle: {
                        backgroundColor: "#f4511e",
                      },
                      headerTintColor: "#fff",
                      headerTitleStyle: {
                        fontWeight: "bold",
                      },
                    }}
                  />

                  <Stack.Screen
                    name="MenuDashboard"
                    component={MenuDashboard}
                    options={{
                      headerTitle: "",
                      headerStyle: {
                        backgroundColor: "#f4511e",
                      },
                      headerTintColor: "#fff",
                      headerTitleStyle: {
                        fontWeight: "bold",
                      },
                      headerBackVisible: false, // Esto debería ocultar la flecha de retroceso
                    }}
                  ></Stack.Screen>

                  <Stack.Screen
                    name="Dashboard"
                    component={Dashboard}
                    options={{
                      headerTitle: "",
                      headerStyle: {
                        backgroundColor: "#f4511e",
                      },
                      headerTintColor: "#fff",
                      headerTitleStyle: {
                        fontWeight: "bold",
                      },
                      headerBackVisible: false, // Esto debería ocultar la flecha de retroceso
                    }}
                  ></Stack.Screen>

                  <Stack.Screen
                    name="BarcodeScanner"
                    component={BarcodeScanner}
                    options={{
                      headerTitle: "",
                      headerStyle: {
                        backgroundColor: "#f4511e",
                      },
                      headerTintColor: "#fff",
                      headerTitleStyle: {
                        fontWeight: "bold",
                      },
                      headerBackVisible: false, // Esto debería ocultar la flecha de retroceso
                    }}
                  ></Stack.Screen>

                  <Stack.Screen
                    name="RegistroProducto"
                    component={RegistroProducto}
                    options={{
                      headerTitle: "",
                      headerStyle: {
                        backgroundColor: "#f4511e",
                      },
                      headerTintColor: "#fff",
                      headerTitleStyle: {
                        fontWeight: "bold",
                      },
                      headerBackVisible: false, // Esto debería ocultar la flecha de retroceso
                    }}
                  ></Stack.Screen>
                  <Stack.Screen
                    name="Inventario"
                    component={Inventario}
                    options={{
                      headerTitle: "",
                      headerStyle: {
                        backgroundColor: "#f4511e",
                      },
                      headerTintColor: "#fff",
                      headerTitleStyle: {
                        fontWeight: "bold",
                      },
                      headerBackVisible: false, // Esto debería ocultar la flecha de retroceso
                    }}
                  ></Stack.Screen>
                  <Stack.Screen
                    name="Venta"
                    component={Venta}
                    options={{
                      headerTitle: "",
                      headerStyle: {
                        backgroundColor: "#f4511e",
                      },
                      headerTintColor: "#fff",
                      headerTitleStyle: {
                        fontWeight: "bold",
                      },
                      headerBackVisible: false, // Esto debería ocultar la flecha de retroceso
                    }}
                  ></Stack.Screen>
                </Stack.Navigator>
              </NavigationContainer>
            </NativeBaseProvider>
          </ApplicationProvider>
        </PaperProvider>
      </AppProvider>

      <StatusBar style="auto" />
    </>
  );
}

const styles = StyleSheet.create({});

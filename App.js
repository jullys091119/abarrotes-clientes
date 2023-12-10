import { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { NativeBaseProvider } from 'native-base';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as Font from 'expo-font';


//screen
import Login from './components/Login';
import Dashboard from './components/Dashboard';

//helpers
import { fetchData } from './helpers/configFirebase';



const Stack = createNativeStackNavigator();




export default function App() {
  useEffect(() => {
    const loadFonts = async () => {
      await Font.loadAsync({
        'inter-medium': require('./assets/fonts/Inter/static/Inter-Medium.ttf'),
        'inter-thin': require('./assets/fonts/Inter/static/Inter-Thin.ttf'),
        'inter-regular': require('./assets/fonts/Inter/static/Inter-Regular.ttf')
      });
    };

    loadFonts();
  }, []);

  return (
    <>
      <NativeBaseProvider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="Login"
              component={Login}
              options={{
                headerTitle: "",
                title: 'My home',
                headerStyle: {
                  backgroundColor: '#f4511e',
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                  fontWeight: 'bold',
                },
              }}
            />
            <Stack.Screen
             name='Dashboard'
             component={Dashboard}
             options={{
              headerTitle: "",
              headerStyle: {
                backgroundColor: '#f4511e',
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
              headerBackVisible: false, // Esto debería ocultar la flecha de retroceso
             }}
            >

            </Stack.Screen>
          </Stack.Navigator>
        </NavigationContainer>
      </NativeBaseProvider>
      <StatusBar style="auto" />
    </>
  );
}

const styles = StyleSheet.create({});
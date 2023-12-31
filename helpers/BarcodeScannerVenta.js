
import React, { useState, useEffect, useContext } from 'react';
import { Text, View, StyleSheet, Button, TouchableOpacity } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { Audio } from 'expo-av';
import { AppContext } from '../context/context';


const  BarcodeScannerVenta = ({navigation, onBarCodeScanned}) => {
  const {setCodeScanner, setScanned, scanned} = useContext(AppContext)


  const [hasPermission, setHasPermission] = useState(null);

  const [sound, setSound] = useState();

  useEffect(() => {
    const loadSound = async () => {
      const { sound } = await Audio.Sound.createAsync(
        require('../assets/sounds/beep.mp3')
      );
      setSound(sound);
    };

    loadSound();

    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, []);
  
  const playSound = async () => {
    try {
      if (sound) {
        await sound.replayAsync();
      }
    } catch (error) {
      console.error('Error al reproducir el sonido', error);
    }
  };

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    };

    getBarCodeScannerPermissions();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    setCodeScanner(data)
    onBarCodeScanned(data)
    playSound()
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      {
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
        />
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    margin: -19,
  },
  buttonContainer: {
    backgroundColor: '#f4511e',
    paddingHorizontal: 40,
    paddingVertical: 10,
    marginBottom: 20,
    height: 90
  },
  buttonText: {
    color: 'white',
    alignSelf: "center",
    fontSize: 25,
   
  },
});

export default BarcodeScannerVenta



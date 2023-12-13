import { Icon} from "native-base"
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import insertarProducto from "../sendSQL";
import { useContext } from "react";
import { AppContext } from "../../context/context";

export const IconThemeLigth = ({toggleColorScheme, color}) => (

    <Icon as={MaterialCommunityIcons} name="weather-sunny" color={color} _dark={{
        color: "warmGray.50",
      }}
     onPress={toggleColorScheme}
     size={30}  
    />
    
)

export const IconThemeBlack = ({toggleColorScheme,color}) => (
    <Icon as={MaterialCommunityIcons} name="weather-sunny-off" color={color} _dark={{
    color: "warmGray.50",
   }}
    onPress={toggleColorScheme}
    size={30}
    />
)

export const IconBarcodeScanner = ({openScanner}) => (
   <Icon as={MaterialCommunityIcons} name="barcode-scan"  _dark={{
    color: "warmGray.50",
   }}
    size={50}
    onPress={openScanner}
    />
)

export const IconSave = () => {
    const {codeScanner,nombre, costo,precio,clasificacion,proveedor,inventario} = useContext(AppContext);

   return <Icon
      as={MaterialCommunityIcons}
      name="content-save-outline"
      _dark={{
        color: "warmGray.50",
      }}
      size={50}
      
      onPress={() => {
        try {
            insertarProducto(codeScanner, nombre, costo, precio, clasificacion, proveedor,inventario);
          } catch (error) {
            console.error('Error al ejecutar insertarProducto:', error);
          }
      }}
    />
}
  
  
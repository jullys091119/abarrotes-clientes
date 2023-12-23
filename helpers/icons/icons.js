import { Icon, Center, Box, Fab} from "native-base"
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import insertarProducto from "../sendSQL";
import { useContext, useEffect, useState } from "react";
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

export const IconBarcodeScanner = ({openScanner}) => { // Puedes establecerlo inicialmente en true si deseas que esté visible al principio
  const {
    codeScanner,
    setCodeScanner,
    nombre,
    setNombre,
    costo,
    setCosto,
    setPrecio,
    precio,
    clasificacion,
    setClasificacion,
    proveedor,
    setProveedor,
    setInventario,
  inventario} = useContext(AppContext);
    
  const visible = !(nombre && costo && precio && clasificacion && proveedor && inventario);

  return (
    visible && (
      <Icon
       style={{color: "#f4511e"}}
        as={MaterialCommunityIcons}
        name="barcode-scan"
        _dark={{
          color: "warning.600",
        }}
        size={50}
        onPress={openScanner}
      />
    )
  );
}

export const IconSave = () => {
    const {
      codeScanner,
      setCodeScanner,
      nombre,
      setNombre,
      costo,
      setCosto,
      setPrecio,
      precio,
      clasificacion,
      setClasificacion,
      proveedor,
      setProveedor,
      setInventario,
      visible,
      setVisible,
      setFechaCaducidad,
    inventario} = useContext(AppContext);


    const mostrarIconoGuardar = () => {
      setVisible(!(!nombre || !costo || !precio || !clasificacion || !proveedor || !inventario));
    };
    
    useEffect(() => {
      mostrarIconoGuardar();
      console.log('visible:', visible);
    }, [nombre, costo, precio, clasificacion, proveedor, inventario, visible]);
    
    const limpiandoDatos = () => {
      setCodeScanner('')
      setNombre('')
      setCosto('')
      setPrecio('')
      setClasificacion('')
      setProveedor('')
      setInventario('')
      setFechaCaducidad("")
    }
    return (
      visible && (
        <Icon
          style={{color: "#f4511e"}}
          as={MaterialCommunityIcons}
          name="content-save-outline"
          _dark={{
            color: "warning.600",
          }}
          size={50}
          onPress={() => {
            try {
              insertarProducto(codeScanner, nombre, costo, precio, clasificacion, proveedor, inventario);
              limpiandoDatos();
            } catch (error) {
              console.error('Error al ejecutar insertarProducto:', error);
            }
          }}
        />
      )
    );
}
  

 export const FabIconAgregarNuevoProducto = () => {
  const  {setScanned,setCodeScanner} = useContext(AppContext)
   return (
     <Center>
       <Fab
         onPress={()=> {setScanned(false), setCodeScanner(" ")}}
         renderInPortal={false}
         shadow={2}
         size="sm"
         style={{backgroundColor: "#f4511e"}}
         icon={
           <Icon
             as={MaterialCommunityIcons}
             color="white"
             name="plus"
             size="sm"
           />
         }
       />
     </Center>
   );
 };
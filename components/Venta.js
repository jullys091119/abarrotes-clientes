import { View, Text, ScrollView } from "native-base";
import React, { useState, useEffect, useContext } from "react";
import moment from "moment";
import "moment/locale/es";
import {StyleSheet} from "react-native";
import BarcodeScannerVenta from "../helpers/BarcodeScannerVenta";
import { FabIconAgregarNuevoProducto,FabIconAgregarNuevaVenta, FabIconAgregarNuevoVenta } from "../helpers/icons/icons";
import { AppContext } from "../context/context";
import { DataTable } from 'react-native-paper';
import { agregarProductoVenta} from "../helpers/sendSQL";

const Venta = () => {
  const [fechaActual, setFechaActual] = useState("");
  const [productosEscaneados, setProductosEscaneados] = useState([]);
  const { scanned } = useContext(AppContext);

  const mostrandoFechaActual = () => {
    setFechaActual(moment().format("LLL"));
  };

  const handleBarCodeScanned = async (data) => {
    try {
      // Aquí puedes manejar la lógica relacionada con el código de barras escaneado
      const datosproducto = await agregarProductoVenta(data);
      const productos = {
        nombre: datosproducto[0].nombre,
        precio: datosproducto[0].precio
      }
      
      try {
        setProductosEscaneados((prevProductos) => {
          return [...prevProductos, productos];
        });
      } catch (error) {
        console.log("Error al ingresar la venta de", productos, error);
      }
    } catch (error) {
      console.error("Error al manejar el código de barras escaneado:", error);
    }
  };

  const concretarVenta = () => {
    alert("concretando venta")
  }

  useEffect(() => {
    console.log("Productos escaneados actualizados:", productosEscaneados.length == 0? "":productosEscaneados.length);
  }, [productosEscaneados])


  useEffect(() => {
  
  }, [mostrandoFechaActual]);

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1, padding: 15 }}>
        {/* Escáner de códigos de barras */}
        <View style={{ overflow: "hidden", height: 390 }}>
          <BarcodeScannerVenta onBarCodeScanned={handleBarCodeScanned} />
        </View>
        {/* Productos escaneados */}
        {scanned && (
          <View style={{display: "flex", justifyContent: "center", alignItems:"center"}}>
            <View style={{ display: "flex", height: "auto", backgroundColor: "#198754", width:241, alignItems: "center", paddingVertical: 10 }}>
              <Text style={{color: "white", fontSize: 20, fontFamily: "inter-thin"}}>Agregado....</Text>
            </View>
          </View>
        )}
            
        <ScrollView>
          <View>
            <Text
              style={{
                fontSize: 18,
                marginTop: 20,
                fontFamily: "inter-regular",
                marginLeft: 15,
                textAlign: "center"
              }}
            >
             <Text style={{fontSize: 14, textAlign: "center"}}>
              {fechaActual}
              </Text>
            </Text>
            <DataTable>
              <DataTable.Header>
                <DataTable.Title style={{display:"flex", justifyContent:"center"}} >
                  Nombre
                </DataTable.Title >
                <DataTable.Title numeric style={{display:"flex", justifyContent:"center"}}>Precio</DataTable.Title>              
            </DataTable.Header>
            </DataTable>
            {productosEscaneados.map((producto, index) => (
             <DataTable.Row
              key={index}
              
             >
              <DataTable.Cell style={{ justifyContent:"center"}}>{index + 1}{"   "}{producto.nombre}</DataTable.Cell>
              <DataTable.Cell style={{ justifyContent:"center"}}>{producto.precio}</DataTable.Cell>  
             </DataTable.Row>
              
            ))}
          </View>
        </ScrollView>
      </View>
      
       
        <FabIconAgregarNuevoVenta concretarVenta={concretarVenta} />
        <FabIconAgregarNuevoProducto/> 

      
    </View>
  );
};

export default Venta;

const styles = StyleSheet.create({});

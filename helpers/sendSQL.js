import {addDoc, setDoc, doc,getDocs, collection, updateDoc, query, where, getDoc} from "firebase/firestore";
import { Alert } from "react-native";
import { db } from "./configFirebase";
import moment from 'moment';
import { useContext } from "react";
import { AppContext } from "../context/context";

const validarProductoExiste = async ( ) => {
  const productosIds = []
  const querySnapshot = await getDocs(collection(db, "productos"));
  
  querySnapshot.forEach((doc) => {
      productosIds.push(doc.id)
  });
  
  return productosIds
} 

const insertarProducto = async (codigoBarras,nombre, costo, precio, clasificacion, proveedor, inventario) => {
    const cb =  await validarProductoExiste()
    try {
      const productoId = codigoBarras;
      const productoRef = doc(db, "productos", productoId);
     if(!cb.includes(productoId)){
       await setDoc(productoRef, {
         nombre: nombre,
         costo: costo,
         precio: precio,
         clasificacion: clasificacion,
         proveedor: proveedor,
         inventario: inventario,
       });
       alert("Producto agregado")
      } else {

        Alert.alert('Error', 'Producto en la base de datos', [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancelar'),
            style: 'cancel',
          },
          {text: 'OK', onPress: () => console.log('OK')},
        ]);
      }
  
      console.log("Documento escrito con ID personalizado: ", productoId);
    } catch (error) {
      console.error("Error al agregar el documento: ", error);
      throw error;
    }
  };

export default insertarProducto

export const consultarProducto = async (codigoBarras) => {
  console.log(codigoBarras, "este es el codigo de barras")
  const data = []
  const querySnapshot = await getDocs(collection(db, "productos"));
    querySnapshot.forEach((doc) => {
      data.push({
        id: doc.id,
        productos: doc.data(),
      })
  });
  return data
}


export const actualizarProductos = async (idProducto, nombre, inventario, caducidad) => {
  console.log(idProducto, nombre, inventario, caducidad)
  console.log("EL id del prodcucto puede ser actualizado");
  const productoRef = doc(db, "productos", idProducto);
   try {
    await updateDoc(productoRef, {
      nombre:nombre,
      inventario:inventario,
      caducidad: caducidad
    })
   } catch (error) {
    console.log("no se pueden actualizar los datos")
   }
}


export const agregarProductoVenta = async (codigoBarras ) => {
  let productos = []
  const querySnapshot = await getDocs(collection(db, "productos"));
  querySnapshot.forEach((doc) => {
  // doc.data() is never undefined for query doc snapshots
  if(doc.id === codigoBarras) {
    productos.push({
      nombre: doc.data().nombre,
      precio: doc.data().precio
    });
  }
  });

 return productos
}



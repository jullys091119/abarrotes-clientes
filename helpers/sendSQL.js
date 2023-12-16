import {addDoc, setDoc, doc,getDocs, collection} from "firebase/firestore";
import { Alert } from "react-native";
import { db } from "./configFirebase";

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

export const consultarProducto = async () => {
  const data = []
  const querySnapshot = await getDocs(collection(db, "productos"));
    querySnapshot.forEach((doc) => {
      // console.log(`${doc.id} => ${JSON.stringify(doc.data())}`);
      //  console.log(`${doc.id} => ${doc.data()}`);
      data.push({
        id: doc.id,
        productos: doc.data(),
      })
  });
  return data
}
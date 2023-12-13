import {addDoc, setDoc, doc, collection} from "firebase/firestore";
import { db } from "./configFirebase";


const insertarProducto = async (codigoBarras,nombre, costo, precio, clasificacion, proveedor, inventario) => {
    try {
      const productoId = codigoBarras;
  
      const productoRef = doc(db, "productos", productoId);
  
      await setDoc(productoRef, {
        nombre: nombre,
        costo: costo,
        precio: precio,
        clasificacion: clasificacion,
        proveedor: proveedor,
        inventario: inventario
      });
  
      console.log("Documento escrito con ID personalizado: ", productoId);
    } catch (error) {
      console.error("Error al agregar el documento: ", error);
      throw error;
    }
  };

export default insertarProducto


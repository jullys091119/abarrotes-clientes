// AppContext.js
import React, { createContext, useState } from 'react';

const AppContext = createContext();

const AppProvider = ({ children }) => {
 const [codeScanner, setCodeScanner] = useState("")
 const [code, setCode] = useState("");
 const [nombre, setNombre] = useState("");
 const [costo, setCosto] = useState("");
 const [precio, setPrecio] = useState("");
 const [clasificacion, setClasificacion] = useState("");
 const [proveedor, setProveedor] = useState("");
 const [inventario, setInventario] = useState("")

  return (
    <AppContext.Provider value={{ 
     setCodeScanner,
     codeScanner,
     setCode,
     setNombre,
     setCosto,
     setPrecio,
     setClasificacion,
     setInventario,
     inventario,
     setProveedor,
     nombre,
     costo,
     precio,
     clasificacion,
     proveedor,


    }}>
      {children}
    </AppContext.Provider>
  );
};

export { AppProvider, AppContext };

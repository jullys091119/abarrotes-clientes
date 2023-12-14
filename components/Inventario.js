
import { ScrollView } from "native-base";
import { consultarProducto } from "../helpers/sendSQL";
import React, {useEffect, useState} from 'react'
import { DataTable } from 'react-native-paper';


const Inventario = () => {

  const [page, setPage] = useState(0 );
  const [producto, setProducto] = useState([])
 
 

  const recibirDatosProductos = async () => {
     const data  = await  consultarProducto()
     console.log(data, "data")
     setProducto(data)
  }


  

  useEffect(() => {
    recibirDatosProductos();
  },[]);

  return (
    <ScrollView>
       <DataTable>
        <DataTable.Header>
          <DataTable.Title>Productos</DataTable.Title>
          <DataTable.Title numeric style={{marginRight: 12}}>Inventario</DataTable.Title>
          <DataTable.Title numeric>Caducidad</DataTable.Title>
        </DataTable.Header>

        {producto.map((item, index) => (
          <DataTable.Row key={item.index} >
            <DataTable.Cell>{item.nombre}</DataTable.Cell>
            <DataTable.Cell numeric style={{display: "flex", justifyContent: "center", marginLeft: 30}}>{item.inventario}</DataTable.Cell>
            <DataTable.Cell numeric>{item.proveedor}</DataTable.Cell>
          </DataTable.Row>
        ))}
      </DataTable>

    </ScrollView>
  
  );
};
export default Inventario
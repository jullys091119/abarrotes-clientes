import { ScrollView } from "native-base";
import { consultarProducto } from "../helpers/sendSQL";
import React, { useEffect, useState } from 'react';
import { DataTable } from 'react-native-paper';
import moment from 'moment';

const Inventario = () => {

  const [producto, setProducto] = useState([]);
  const [fechaActual, setFechaActual] = useState(moment());

  const recibirDatosProductos = async () => {
    const data = await consultarProducto();
    const productosMostrar = [];

    data.forEach((el) => {
      const productoMostrar = {
        ...el,
        fechaCaducidad: undefined,
        diasParaCaducar: undefined,
      };
      
      if (el.productos.caducidad && el.productos.caducidad.seconds) {
       
        //formate la fecha 
        const fechaCaducidad = moment.unix(el.productos.caducidad.seconds)
          .milliseconds(el.productos.caducidad.nanoseconds / 1e6).toDate();
           
        //toma la diferencia entre las dos fechas, se tiene que especificar que la quieres 
        //la diferencia en dias
        const diferenciaDias = moment(fechaCaducidad).diff(moment(fechaActual), 'days');


         //La fecha se formatea 2023/10/15
        productoMostrar.fechaCaducidad = moment(fechaCaducidad).format('DD/MM/YYYY');
        
        //te da el numero de dias  de diferencia
        productoMostrar.diasParaCaducar = diferenciaDias
      }
      
      //por ultimo hacemos un push para ingresar los datos al objeto
      productosMostrar.push(productoMostrar);
    });
    
    //tambie metemos todo el objeto al hook para recorrerlo
    setProducto(productosMostrar);
  };

  useEffect(() => {
    recibirDatosProductos();
    console.log(producto)
  }, []);

  return (
    <ScrollView>
      <DataTable>
        <DataTable.Header>
          <DataTable.Title>Productos</DataTable.Title>
          <DataTable.Title numeric style={{ marginRight: 12 }}>Inventario</DataTable.Title>
          <DataTable.Title numeric>Caducidad</DataTable.Title>
        </DataTable.Header>

        {producto.map((item, index) => (
          <DataTable.Row
            key={item.id}
            style={{
              backgroundColor:
              // si hay dias de diferencia y  estos son menores a 7 entonces hacer algo
                item.diasParaCaducar !== undefined && item.diasParaCaducar <= 7
                  ? '#ffeb3b' // Cambiar a tu color de warning
                  : 'white',
            }}
          >
            <DataTable.Cell>{item.productos.nombre}</DataTable.Cell>
            <DataTable.Cell
              numeric
              style={{
                display: "flex",
                justifyContent: "center",
                marginLeft: 30,
                backgroundColor: item.productos.inventario == 0 ? "red" : "#4CAF50",
                color: item.productos.inventario === 0 ? "white" : "black",
              }}
            >
              {item.productos.inventario}
            </DataTable.Cell>
            <DataTable.Cell numeric>
              {item.diasParaCaducar !== undefined
                ? item.diasParaCaducar <= 7
                  ? `${item.fechaCaducidad} (En ${item.diasParaCaducar} días)`
                  : item.fechaCaducidad
                : '-'}
            </DataTable.Cell>
          </DataTable.Row>
        ))}
      </DataTable>
    </ScrollView>
  );
};

export default Inventario;

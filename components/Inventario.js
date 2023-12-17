import React, { useEffect, useState } from 'react';
import { ScrollView, Text } from 'native-base';
import { consultarProducto } from '../helpers/sendSQL';
import { View, StyleSheet } from 'react-native';
import { DataTable, Provider, Portal, Dialog, Button, TextInput } from 'react-native-paper';
import moment from 'moment';

const Inventario = () => {
  const [producto, setProducto] = useState([]);
  const [fechaActual] = useState(moment());
  const [visible, setVisible] = useState(false);

  // Estados locales del modal
  const [nombreProducto, setNombreProducto] = useState('');
  const [inventarioProducto, setInventarioProducto] = useState('');
  const [caducidadProducto, setCaducidadProducto] = useState('');
  const [idProducto, setIdProducto] = useState('');

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
        const fechaCaducidad = moment.unix(el.productos.caducidad.seconds)
          .milliseconds(el.productos.caducidad.nanoseconds / 1e6).toDate();

        const diferenciaDias = moment(fechaCaducidad).diff(moment(fechaActual), 'days');

        if (!isNaN(fechaCaducidad.getTime())) {
          productoMostrar.fechaCaducidad = moment(fechaCaducidad).format('DD/MM/YYYY');
          productoMostrar.diasParaCaducar = diferenciaDias;
        }
      }

      productosMostrar.push(productoMostrar);
    });

    setProducto(productosMostrar);
  };

  const tomandoIdDelProducto = (id, nombre, inventario, caducidad) => {
    setIdProducto(id);
    setNombreProducto(nombre);
    setInventarioProducto(inventario);
    setCaducidadProducto(caducidad);
  };

  useEffect(() => {
    recibirDatosProductos();
  }, []);

  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);

  return (
    <Provider>
      <ScrollView>
        <DataTable>
          <DataTable.Header>
            <DataTable.Title>Productos</DataTable.Title>
            <DataTable.Title numeric style={{ marginRight: 12 }}>
              Inventario
            </DataTable.Title>
            <DataTable.Title numeric>Caducidad</DataTable.Title>
          </DataTable.Header>

          {producto.map((item, index) => (
            <DataTable.Row
              key={item.id}
              style={{
                backgroundColor:
                  item.diasParaCaducar !== undefined && item.diasParaCaducar <= 7
                    ? '#ffeb3b'
                    : 'white',
              }}
              onPress={() => {
                tomandoIdDelProducto(
                  item.id,
                  item.productos.nombre,
                  item.productos.inventario,
                  item.fechaCaducidad
                );
                showDialog();
              }}
            >
              <DataTable.Cell>{item.productos.nombre}</DataTable.Cell>
              <DataTable.Cell
                numeric
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  marginLeft: 30,
                  backgroundColor: item.productos.inventario == 0 ? 'red' : '#01c23770',
                }}
              >
                <Text style={{ color: item.productos.inventario == 0 ? 'white' : 'black' }}>
                  {item.productos.inventario}
                </Text>
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

      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog}>
          <Dialog.Title>Actualizar campos</Dialog.Title>
          <Dialog.Content style={{display: "flex", gap:20}}>
            <TextInput
             outlined="disable"
             label="Producto"
             onChangeText={(text) => setNombreProducto(text)}
             value={nombreProducto}
            />
            <TextInput 
              label="Inventario"
              onChangeText={(text) => setInventarioProducto(text)}
              value={inventarioProducto}
            />
           
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={hideDialog}>Done</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </Provider>
  );
};

export default Inventario;

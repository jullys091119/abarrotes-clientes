import { Stack, Text, Input, ScrollView, Icon } from "native-base";
import { IconBarcodeScanner, IconSave } from "../helpers/icons/icons";
import { useContext, useState } from "react";
import { View, KeyboardAvoidingView, Platform } from "react-native";
import { AppContext } from "../context/context";


const RegistroProducto = ({ navigation }) => {
  const {
    codeScanner,
    setCode,
    setNombre,
    setCosto,
    setPrecio,
    setClasificacion,
    setProveedor,
    setInventario,
    inventario,
    nombre,
    costo,
    precio,
    clasificacion,
    proveedor,
  } = useContext(AppContext);

  const [isOpenBarcode, setIsOpenBarcode] = useState(false);

  console.log(codeScanner, "CODE");

  const openScanner = () => {
    setIsOpenBarcode(true);
    if (isOpenBarcode) {
      navigation.push("BarcodeScanner");
    }
  };



  return (
    <ScrollView>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={{ flex: 1 }}
      >
        <View style={{paddingTop:30}}>
          <Text style={{fontSize: 20, marginLeft:40, fontFamily: "inter-regular", fontWeight: "900"}}>Registro de productos</Text>
        </View>
        <View  style={{minHeight: "100%", marginHorizontal: 40, marginVertical: 40, gap: 30}}>
          <Input
            className="my-2"
            variant="underlined"
            placeholder="Código de barras"
            onChangeText={(text) => setCode(text)} // Agregar esta línea para actualizar el estado
            value={codeScanner}
          />
          <Input
            className="my-2"
            variant="underlined"
            placeholder="Nombre"
            onChangeText={(text) => setNombre(text)}
            value={nombre}
          />
          <Input
            className="my-2"
            variant="underlined"
            placeholder="Costo"
            onChangeText={(text) => setCosto(text)}
            value={costo}
          />
          <Input
            className="my-2"
            variant="underlined"
            placeholder="Precio"
            onChangeText={(text) => setPrecio(text)}
            value={precio}
          />

          <Input
            className="my-2"
            variant="underlined"
            placeholder="Clasificación"
            onChangeText={(text) => setClasificacion(text)}
            value={clasificacion}
          />
          <Input
            className="my-2"
            variant="underlined"
            placeholder="Proveedor"
            onChangeText={(text) => setProveedor(text)}
            value={proveedor}
          />
          <Input
            className="my-2"
            variant="underlined"
            placeholder="Inventario"
            onChangeText={(text) => setInventario(text)}
            value={inventario}
          />
          <View style={{display: "flex", alignItems: "center", paddingTop:10,  justifyContent:"center"}}>
            <IconBarcodeScanner openScanner={openScanner} />
            <IconSave/>
          </View>
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

export default RegistroProducto;

import { HStack, Avatar, View, Image } from "native-base";
import {Card, Text} from "@ui-kitten/components";
import { useNavigation } from '@react-navigation/native';

const MenuDashboard = () => {
    const navigation = useNavigation();

    const handleNavigate = () => {
        navigation.navigate('BarcodeScanner');
    };

    const registroProducto = () => {
      navigation.navigate("RegistroProducto");
    }

    const abrirInventario = () => {
      navigation.navigate("Inventario");
    } 

    const abrirVenta  = () => {
      navigation.navigate("Venta")
      alert("Abirendo la venta");
    }


  return (

    <HStack style={{display:"flex",  flexWrap: "wrap",padding: 10, justifyContent: "space-between", gap: 3}}>
      <Card style={{width: 150, height: 190, display:"flex", justifyContent: "center", alignItems: "center", borderRadius: 20}} onPress={()=>registroProducto()}>
        <Avatar bg="white" size="lg">
            <Image
              source={require("../assets/icons/db.png")}
              style={{ flex: 1, width: 90, height: 90 }}
              alt="Imagen"
            />
        </Avatar>
        <Text style={{ paddingTop: 10}}> Registro Productos</Text>
      </Card>

      <Card style={{width: 150, height: 190, display:"flex", justifyContent: "center", alignItems: "center", borderRadius:20}} onPress={()=>abrirInventario()}>
        <Avatar bg="white" size="lg">
          <Image
            source={require("../assets/icons/inventario.png")}
            style={{ flex: 1, width: 90, height: 90 }}
            alt="Imagen"
          />
        </Avatar>
        <Text style={{paddingTop: 10}}>Inventario</Text>
      </Card>

      <Card style={{width: 150, height: 190, display:"flex", justifyContent: "center", alignItems: "center", borderRadius:20}} onPress={()=>abrirVenta()}>
        <Avatar bg="white" size="lg">
          <Image
            source={require("../assets/icons/venta.png")}
            style={{ flex: 1, width: 90, height: 90 }}
            alt="Imagen"
          />
        </Avatar>
        <Text style={{paddingTop: 10, textAlign: "center"}}>Venta</Text>
      </Card>
      
    </HStack>
  );
};



export default MenuDashboard;

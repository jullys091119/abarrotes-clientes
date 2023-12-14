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


  return (

    <HStack className="min-w-full flex flex-1 justify-evenly wrap py-14 px-2">
      <Card style={{width: 150, height: 190, display:"flex", justifyContent: "center", alignItems: "center"}} onPress={()=>registroProducto()}>
        <Avatar bg="white" size="lg">
            <Image
              source={require("../assets/icons/db.png")}
              style={{ flex: 1, width: 90, height: 90 }}
              alt="Imagen"
            />
        </Avatar>
        <Text>Registro de Productos</Text>
      </Card>

      <Card style={{width: 150, height: 190, display:"flex", justifyContent: "center", alignItems: "center"}} onPress={()=>abrirInventario()}>
        <Avatar bg="white" size="lg">
          <Image
            source={require("../assets/icons/inventario.png")}
            style={{ flex: 1, width: 90, height: 90 }}
            alt="Imagen"
          />
        </Avatar>
        <Text>Productos</Text>
      </Card>
      
    </HStack>
  );
};



export default MenuDashboard;

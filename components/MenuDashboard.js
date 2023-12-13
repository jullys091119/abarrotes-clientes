import { HStack, Avatar, View, Image, Text } from "native-base";
import { useNavigation } from '@react-navigation/native';

const MenuDashboard = () => {
    const navigation = useNavigation();

    const handleNavigate = () => {
        navigation.navigate('BarcodeScanner');
    };

    const registroProducto = () => {
    
      navigation.navigate("RegistroProducto")
    }


  return (
    <HStack className="min-w-full min-h-full flex flex-1 justify-evenly wrap py-14 px-2">

      <Avatar bg="white" size="lg">
        <View
          style={{
            overflow: "hidden",
            width: 70,
            height: 70,
            padding: 10,
            backgroundColor: "white",
            borderRadius: 99,
          }}
          onTouchEnd={()=>registroProducto()}
        >
          <Image
            source={require("../assets/icons/add-to-cart.png")}
            style={{ flex: 1, width: 90, height: 90 }}
            alt="Imagen"
          />
        </View>
      </Avatar>
      
      <Avatar bg="white" size="lg">
        <View
          style={{
            overflow: "hidden",
            width: 70,
            height: 70,
            padding: 10,
            backgroundColor: "white",
            borderRadius: 99,
          }}
          onTouchEnd={()=>registroProducto()}
        >
          <Image
            source={require("../assets/icons/ventas.png")}
            style={{ flex: 1, width: 90, height: 90 }}
            alt="Imagen"
          />
        </View>
      </Avatar>
    </HStack>
  );
};



export default MenuDashboard;

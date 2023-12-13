import { HStack, Avatar, View, Image } from "native-base";
import {Card, Text} from "@ui-kitten/components";
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
    <HStack className="min-w-full flex flex-1 justify-evenly wrap py-14 px-2">
      <Card style={{width: 150, height: 190, display:"flex", justifyContent: "center", alignItems: "center"}} onPress={()=>registroProducto()}>
        <Avatar bg="white" size="lg">
            <Image
              source={require("../assets/icons/db.png")}
              style={{ flex: 1, width: 90, height: 90 }}
              alt="Imagen"
            />
        </Avatar>
      </Card>
      
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

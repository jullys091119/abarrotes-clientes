import { HStack, Avatar, View, Image, Text } from "native-base";
import { useNavigation } from '@react-navigation/native';

const MenuDashboard = () => {
    const navigation = useNavigation();
    const handleNavigate = () => {
        navigation.navigate('BarcodeScanner');
    };


  return (
    <HStack className="min-w-full min-h-full flex flex-1 flex-col wrap py-14 px-2">
     
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
          onTouchEnd={()=>handleNavigate()}
        >
          <Image
            source={require("../assets/icons/ventas.png")}
            style={{ flex: 1, width: 90, height: 90 }}
            alt="Imagen"
          />
        </View>
      </Avatar>
      <Text className="px-5">Venta</Text>
    </HStack>
  );
};



export default MenuDashboard;

import { Center,Box,Heading,FormControl,Input,Link,Text,HStack,Button,VStack } from "native-base";
import { 
  auth,
  signInWithEmailAndPassword,
  db
} from "../helpers/configFirebase";

import { useEffect, useState } from "react";


const Login = ({navigation}) => {
  const [email, setEmail] = useState("informacionlinux@gmail.com");
  const [clave, setClave] = useState("090919Nyj@1");
 
  
  const handleLogin = async () => {
    signInWithEmailAndPassword(auth, email, clave)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        navigation.push('Dashboard');
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error(`Error: ${errorCode} - ${errorMessage}`);
        // ..
      });
  };


  return <Center w="100%" className="flex justify-center items-center mt-10">
      <Box safeArea p="2" py="8" w="90%" maxW="290">
        <Heading size="lg" fontWeight="600" color="coolGray.800" _dark={{
        color: "warmGray.50"
      }}>
          Bienvenido
        </Heading>
        <Heading mt="1" _dark={{
        color: "warmGray.200"
      }} color="coolGray.600" fontWeight="medium" size="xs">
          Logueate para continuar!
        </Heading>

        <VStack space={3} mt="5">
          <FormControl>
            <FormControl.Label>Usuario</FormControl.Label>
            <Input
             value={email}
             onChangeText={(string)=> setEmail(string)}
            />
          </FormControl>
          <FormControl>
            <FormControl.Label>Password</FormControl.Label>
            <Input 
             value={clave}
             onChangeText={(string)=> setClave(string)} 
             
            />
            <Link _text={{
            fontSize: "xs",
            fontWeight: "500",
            color: "indigo.500"
          }} alignSelf="flex-end" mt="1">
              Olvidaste la contrasena?
            </Link>
          </FormControl>
          <Button mt="2" className="bg-[#f4511e]" onPress={handleLogin} >
            Sign in
          </Button>
          <HStack mt="6" justifyContent="center">
            <Text fontSize="sm" color="coolGray.600" _dark={{
            color: "warmGray.200"
          }}>
              Nuevo administrador.{" "}
            </Text>
            <Link _text={{
            color: "indigo.500",
            fontWeight: "medium",
            fontSize: "sm"
          }} href="#">
              
            </Link>
          </HStack>
        </VStack>
      </Box>
    </Center>;
};

export default Login;
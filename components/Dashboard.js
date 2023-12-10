import { 
    Text,
    Container,
    Box,
    Icon,
    HStack,

} from "native-base";
import { db, auth } from "../helpers/configFirebase";

import { collection, getDocs, addDoc, query, where } from "firebase/firestore"; 
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { IconThemeBlack, IconThemeLigth } from "../helpers/icons/icons";
import { styled, useColorScheme } from "nativewind";


const Dashboard = () => {

    const [nombre, setNombre] = useState("");
    const [apellido, setApellido] = useState("")
    const [email, setEmail] = useState("")
    const { colorScheme, toggleColorScheme } = useColorScheme();

    const optenerNombreUsuario = async (emailUser) => {
     const usuariosQuery = query(collection(db, "administrador"),where("email", "==", emailUser));
     const SnapshotUser = await getDocs(usuariosQuery);

     const dataArray = SnapshotUser.docs.map((doc) => doc.data());
     setNombre(dataArray[0].nombre);
     setApellido(dataArray[0].apellido)
    }
   

    const MostrandoIconos = ( ) => (
        <> 
            {
               colorScheme === "light"?
               <IconThemeLigth toggleColorScheme={toggleColorScheme} />:<IconThemeBlack color="white" toggleColorScheme={toggleColorScheme}/>
            }
        </>
    )
     
    console.log(colorScheme, "color")
   
    useEffect(()=> {
         // Verificar si hay un usuario autenticado
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
            // Acceder al correo electrónico si está disponible
            const email = user.email;
            optenerNombreUsuario(email)
            } else {
            setEmail(null);
            // setNombre(""); // Limpiar el nombre si no hay usuario autenticado
            }
       });
  
    }, [])
  return (
    <Container className={`flex-1 max-w-full  ${colorScheme === "dark" ? "bg-[#0f172a]" : "bg-[#ffffff]"}`}>
        <HStack className="flex w-[100%] justify-end py-5 pr-2 " >
         <MostrandoIconos/>
        </HStack>
        <HStack className="my-1">
           <Text className={`px-5 pt-5 text-[30px] ${colorScheme === "dark"?"text-[#ffffff]": "text-[#000000]"}`} style={{fontFamily: 'inter-regular'}} >Bienvenido.</Text>
        </HStack>
        <HStack>
            <Text className={`px-5 pt-4 text-[30px] ${colorScheme === "dark"?"text-[#ffffff]": "text-[#000000]"}`}style={{fontFamily: 'inter-medium'}}  >{nombre}{" "}{apellido}</Text>
        </HStack>
    </Container>
  )
}

export default Dashboard


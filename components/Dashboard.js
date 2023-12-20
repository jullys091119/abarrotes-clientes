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
import MenuDashboard from "./MenuDashboard";

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
    <Container style={{ maxWidth: "100%", minHeight: "100%"}}>
        {/* <HStack>
         <MostrandoIconos/>
        </HStack> */}
        <HStack style={{display: "flex", flexDirection: "column", paddingTop:60}}>
          <Text style={{fontFamily: 'inter-regular', fontSize: 40, paddingTop:20, marginLeft: 20}} >Bienvenido.</Text>
          <Text style={{fontFamily: 'inter-medium', marginLeft: 25, fontSize: 20}}>{nombre}{" "}{apellido}</Text>
        </HStack>
        <HStack style={{marginTop: 30,width: "100%", display:"flex", justifyContent: "center"}}>
          <MenuDashboard/>
        </HStack>
    </Container>
  )
}

export default Dashboard


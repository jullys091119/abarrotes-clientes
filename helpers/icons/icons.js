import { Icon} from "native-base"
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


export const IconThemeLigth = ({toggleColorScheme, color}) => (

    <Icon as={MaterialCommunityIcons} name="weather-sunny" color={color} _dark={{
        color: "warmGray.50",
      }}
     onPress={toggleColorScheme}
     size={30}  
    />
    
)

export const IconThemeBlack = ({toggleColorScheme,color}) => (
    <Icon as={MaterialCommunityIcons} name="weather-sunny-off" color={color} _dark={{
    color: "warmGray.50",
   }}
    onPress={toggleColorScheme}
    size={30}
    />
)
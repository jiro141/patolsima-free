// Chakra imports
import {
  Box,
  Flex,
  Grid,
  Image,
  SimpleGrid,
  useColorModeValue,
} from "@chakra-ui/react";
import { usersList } from "api/controllers/grupos";
// assets
import fondo from "assets/svg/Formato con fondo.svg";
import { React, useEffect } from "react";


export default function Dashboard() {
  const iconBoxInside = useColorModeValue("white", "white");
  
  return (
    <Flex >
      <Box margin={{ lg: '50px 0px 0px 0px', sm: '60px 0px 10% 0px' }}
        padding={{ lg: '0 10px', md: '10px', sm: '0px 0 10% 0' }}
        backgroundColor={'gray.100'}
        borderRadius={'20px'}
        backgroundSize="cover"
        backgroundPosition="center"
        height={'auto'} >
        <Image h={{ lg: '39em', md: "39em", sm: "35em" }} w='90em' src={fondo} alt='Logo palmosima' />
      </Box>
    </Flex>
  );
}

// Chakra imports
import {
  Box,
  Flex,
  Grid,
  Image,
  SimpleGrid,
  useColorModeValue,
} from "@chakra-ui/react";
// assets
import fondo from "assets/img/Textura2.png";
import React from "react";


export default function Dashboard() {
  const iconBoxInside = useColorModeValue("white", "white");

  return (
    <Flex >
    <Box m={'100px 70px 50px 70px'} >
    <Image h={'600px'} w='100%' src={fondo} alt='Logo palmosima' />
    </Box>
    </Flex>
  );
}

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
import fondo from "assets/svg/Formato con fondo.svg";
import React from "react";


export default function Dashboard() {
  const iconBoxInside = useColorModeValue("white", "white");

  return (
    <Flex >
    <Box m={{lg:'10px 20px 10px 0px',md:"20px",sm:"0px"}} >
    <Image h={{lg:'800px',md:"900px",sm:"800px"}} w='100%' src={fondo} alt='Logo palmosima' />
    </Box>
    </Flex>
  );
}

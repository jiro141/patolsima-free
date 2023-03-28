import { Badge, Box, Text } from "@chakra-ui/react";
import React from "react";

const BarraProgresiva = ({ currentStation }) => {
  return (
    <Box display="flex" justifyContent="space-around">
      <Box textAlign="center">
        {currentStation === "cliente" ? (
          <Text fontSize="2xl" fontWeight="bold">
            Cliente
          </Text>
        ) : (
          <Badge variant="outline" colorScheme="blue">
            .
          </Badge>
        )}
      </Box>
      <Box textAlign="center">
        {currentStation === "medico" ? (
          <Text fontSize="2xl" fontWeight="bold">
            Médico
          </Text>
        ) : (
          <Badge variant="outline" colorScheme="blue">
            .
          </Badge>
        )}
      </Box>
      <Box textAlign="center">
        {currentStation === "muestra" ? (
          <Text fontSize="2xl" fontWeight="bold">
            Muestra
          </Text>
        ) : (
          <Badge variant="outline" colorScheme="blue">
            .
          </Badge>
        )}
      </Box>
    </Box>
  );
};

export default BarraProgresiva;

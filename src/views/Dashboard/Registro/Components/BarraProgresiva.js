import { Badge, Progress } from "@chakra-ui/react";
import React from "react";

const BarraProgresiva = (props) => {
  const completedSteps = props.step - 1;

  return (
    <Progress value={completedSteps} max={3} borderRadius="10px">
      <Badge colorScheme="blue" fontSize="lg" px={4} py={2} mr={2}>
        Cliente
      </Badge>
      <Badge colorScheme={completedSteps >= 1 ? "green" : "gray"} fontSize="lg" px={4} py={2} mr={2}>
        Médico
      </Badge>
      <Badge colorScheme={completedSteps >= 2 ? "green" : "gray"} fontSize="lg" px={4} py={2} mr={2}>
        Muestra
      </Badge>
    </Progress>
  );
};

export default BarraProgresiva;

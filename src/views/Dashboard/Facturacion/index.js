import React, { useState, useEffect } from "react";
// import { useEffect } from "react";
import {
  Box,
  SimpleGrid,
  Text,
  useColorModeValue,
  Badge,
  Heading,
  Grid,
  GridItem,
  Link,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Flex,
} from "@chakra-ui/react";
import { BsReceipt } from "react-icons/bs";
import { Icon } from "@chakra-ui/react";
import DatosMuestra from "./DatosMuestra";
import { authApi } from "api/authApi";


const Dashboard = () => {
  const colorA = '#137797';

  const sinProcesarStudies = [
    {
      id: 1,
      nestudio: "E:010-2023",
      fecha: "15/10/2023",
      paciente: "Pedro Perez",
      ci: "2558764",
      monto: 25452
    },
    {
      id: 2,
      nestudio: "E:010-2023",
      fecha: "15/10/2023",
      paciente: "Juancito Perez",
      ci: "2558764",
      monto: 25452
    },
    {
      id: 3,
      nestudio: "E:010-2023",
      fecha: "15/10/2023",
      paciente: "Pedrito Perez",
      ci: "2558764",
      monto: 25452
    }
  ];
  const pendientesStudies = [
    {
      id: 4,
      nestudio: "E:010-2023",
      fecha: "15/10/2023",
      paciente: "miguel Perez",
      ci: "2558764",
      monto: 25452
    },
    {
      id: 5,
      nestudio: "E:010-2023",
      fecha: "15/10/2023",
      paciente: "carlos Perez",
      ci: "2558764",
      monto: 25452
    },
    {
      id: 6,
      nestudio: "E:010-2023",
      fecha: "15/10/2023",
      paciente: "Pedrito Perez",
      ci: "2558764",
      monto: 25452
    }
  ];

  const renderStudies = (studies) => {
    return studies.map((study) => (
      <Flex flexDirection={"row 7"}>
        <Link>
          <Box
            margin={"5px auto"}
            boxShadow={"0px 0px 16px 2px rgba(0, 0, 0, 0.2)"}
            borderRadius={"16px"}
            key={study.id}
            padding={"0"}
          >
            <Box
              borderTopLeftRadius={"16px"}
              borderTopRightRadius={"16px"}
              backgroundColor={colorA}
            >
              <Badge
                textAlign={"center"}
                background={"none"}
                padding={"5px 20px 0px 20px"}
                w={'180px'}
                height={'34px'}
              >
                <Icon
                  border={"solid"}
                  borderColor={colorA}
                  marginTop={"-15%"}
                  marginLeft={"78%"}
                  height={"50px"}
                  width={"50px"}
                  padding={"5px"}
                  borderRadius={"50%"}
                  as={BsReceipt}
                  backgroundColor={"#FFFF"}
                  color={colorA}
                />
              </Badge>
            </Box>
            <Box p={"20px 10px"}>
              <Heading size="sm">Fecha</Heading>
              <Text
                textAlign={"right"}
                ml={2}
                color={useColorModeValue("gray.600", "gray.400")}
              >
                {study.fecha}
              </Text>
              <Heading size="sm">Paciente</Heading>
              <Text
                textAlign={"right"}
                color={useColorModeValue("gray.600", "gray.400")}
              >
                {study.paciente}
              </Text>
              <Heading size="sm">RIF/CI</Heading>
              <Text textAlign={"right"}>{study.ci}</Text>
              <Heading size="sm">Monto Total</Heading>
              <Text textAlign={"right"}>{study.monto}</Text>
            </Box>
          </Box>
        </Link>
      </Flex>
    ));
  };

  return (
    <Box marginTop={'100px'}>
      <Heading
        size="md"
      >
        Sin confirmar
      </Heading>
      <Box
        boxShadow="0px 0px 16px 2px rgba(0, 0, 0, 0.2)"
        padding={"25px"}
        borderRadius="20px"
        m={"30px 30px 50px 30px"}
      >
        <Box>
          <Grid gap={"20px"} templateColumns={"repeat(5,1fr)"}>
            {renderStudies(sinProcesarStudies)}
          </Grid>
        </Box>
      </Box>
      <Heading
        size="md"
      >
        Pendientes de pago
      </Heading>
      <Box
        boxShadow="0px 0px 16px 2px rgba(0, 0, 0, 0.2)"
        padding={"25px"}
        borderRadius="20px"
        m={"30px 30px 100px 30px"}
      >
        <Grid gap={"15px"} templateColumns={"repeat(5,1fr)"}>
          {renderStudies(pendientesStudies)}
        </Grid>
      </Box>
      <Button
                padding={'10px 60px'}
                marginTop='20px'
                bgColor={'#137797'}
                color='#ffff'
                // onClick={toggleModal}
                >
                Ver más</Button>
    </Box>

  );
};

export default Dashboard;

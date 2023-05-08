import React, { useState, useEffect } from "react";
// import { useEffect } from "react";
import {
  Box,
  Text,
  useColorModeValue,
  Badge,
  Heading,
  Grid,
  Link,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  Flex,
  CloseButton,
  useBreakpointValue
} from "@chakra-ui/react";
import { Icon } from "@chakra-ui/react";
import { BsReceipt } from "react-icons/bs";
import { authApi } from "api/authApi";
import ModalFacturacion from "./components/ModalFacturacion";

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
  //modal 
  const [showModal, setShowModal] = useState(false);
  const toggleModal = () => {
    setShowModal(!showModal);
  };
  //tamaños de modal
  const size = useBreakpointValue({ base: "sm", lg: "5xl",md:'2xl'});

  const renderStudies = (studies) => {
    return studies.map((study) => (
      <Flex flexDirection={"row 7"}>
        <Link
          onClick={toggleModal}>
          <Box
            margin={"5px auto 5px auto"}
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
    <>
      <Box
        margin={'60px 0px 0px 0px'}
        backgroundColor={'gray.100'}
        borderRadius={'20px'}
        padding={'5px 0px 20px 0px'}>
        <Box marginTop={'30px'} >
          <Heading
            margin={'20px'}
            size="md"
          >
            Sin confirmar
          </Heading>
          <Box
            backgroundColor={'#FFFF'}
            boxShadow="0px 0px 16px 2px rgba(0, 0, 0, 0.2)"
            padding={"25px"}
            borderRadius="20px"
            m={"30px 30px 50px 30px"}
          >
            <Box padding={{ lg: "0px", md: "0px", sm: "0%" }}>
              <Grid gap={"20px"} templateColumns={{ lg: "repeat(5,1fr)", md: "repeat(3,1fr)", sm: "repeat(1,1fr)" }}>
                {renderStudies(sinProcesarStudies)}
              </Grid>
            </Box>
          </Box>
          <Heading
            margin={'20px'}
            size="md"
          >
            Pendientes de pago
          </Heading>
          <Box
            backgroundColor={'#FFFF'}
            boxShadow="0px 0px 16px 2px rgba(0, 0, 0, 0.2)"
            padding={"25px"}
            borderRadius="20px"
            m={"30px 30px 100px 30px"}
          >
            <Box margin={{ lg: "0px", md: "0", sm: "5%" }}>
              <Grid gap={"15px"} templateColumns={{ lg: "repeat(5,1fr)", md: "repeat(3,1fr)", sm: "repeat(1,1fr)" }}>
                {renderStudies(pendientesStudies)}
              </Grid>
            </Box>
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
      </Box>
      <Modal
        size={size}
        maxWidth='100%'
        isOpen={showModal}
        onClose={toggleModal}>
        <ModalOverlay />
        <ModalContent bg="#ffff">
          <ModalHeader>
            <Button
              borderRadius={'50%'}
              colorScheme="blue"
              width="40px"
              height="40px"
              marginLeft={'95%'}
              marginTop={'-60px'}
              bgColor={'#137797'}
              color='#ffff'
              onClick={toggleModal}>
              <CloseButton />
            </Button>
          </ModalHeader>
          <ModalBody>
            <ModalFacturacion />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Dashboard;

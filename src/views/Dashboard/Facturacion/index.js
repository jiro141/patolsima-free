import React, { useState, useEffect, useContext } from "react";
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
import ListaFacturas from "./components/ListaFacturas";
import ModoVisualizacionContext from "components/ModoVisualizacion/ModoVisualizacion";
import ModoLista from "./ModoLista";

const Dashboard = () => {
  const { modoVisualizacion } = useContext(ModoVisualizacionContext);
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
  const [showModalList, setShowModalList] = useState(false);
  const toggleModalList = () => {
    setShowModalList(!showModalList);
  };
  //tamaños de modal
  const size = useBreakpointValue({ base: "sm", lg: "3xl", md: '2xl' });
  const sizeView = useBreakpointValue({ base: "sm", lg: "5xl", md: '2xl' });

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
              padding={'10px'}
              paddingBottom={'0px'}
              minH={'15px'}
            >
              <Badge
                textAlign={"center"}
                background={"none"}
                padding={"5px 20px 0px 20px"}
                w={'180px'}
                height={'35px'}
              >
                <Icon
                  border={"solid"}
                  borderColor={colorA}
                  marginTop={"-15%"}
                  marginLeft={"86%"}
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
            <Box p={"10px"}>
              <Heading fontSize={'16px'}>Fecha</Heading>
              <Text
                textAlign={"right"}
                ml={2}
                fontSize={'16px'}
                color={useColorModeValue("gray.600", "gray.400")}
              >
                {study.fecha}
              </Text>
              <Heading fontSize={'16px'}>Paciente</Heading>
              <Text
                fontSize={'16px'}
                textAlign={"right"}
                color={useColorModeValue("gray.600", "gray.400")}
              >
                {study.paciente}
              </Text>
              <Heading fontSize={'16px'}>RIF/CI</Heading>
              <Text fontSize={'16px'} textAlign={"right"}>{study.ci}</Text>
              <Heading fontSize={'16px'}>Monto Total</Heading>
              <Text fontSize={'16px'} textAlign={"right"}>{study.monto} ($)</Text>
            </Box>
          </Box>
        </Link>
      </Flex>
    ));
  };

  return (
    modoVisualizacion === 'tarjeta' ? (
      <>
        <Box margin={{ lg: '50px 0px 0px 0px', sm: '60px 0px 10% 0px' }}
          padding={{ lg: '0 25px', md: '10px', sm: '0px 0 10% 0' }}
          backgroundColor={'gray.100'}
          borderTopLeftRadius={'20px'}
          backgroundSize="cover"
          backgroundPosition="center"
          overflowY="scroll"
          overflowX="hidden"
          maxH={'40em'}
        >
          <Box padding={'2%'} >
            <Heading
              size="md"
            >
              Sin confirmar
            </Heading>
            <Box
              width={'100%'}
              m={"20px 30px 30px 10px"}
              backgroundColor={'#FFFF'}
              boxShadow="0px 0px 16px 2px rgba(0, 0, 0, 0.2)"
              padding={"25px"}
              borderRadius="20px"
              minH={'300px'} maxH={'300px'}
              overflowY="scroll"
              overflowX="hidden"
            >
              <Box padding={{ lg: "0px", md: "0px", sm: "0%" }}>
                <Grid gap={"20px"} templateColumns={{ lg: "repeat(5,1fr)", md: "repeat(3,1fr)", sm: "repeat(1,1fr)" }}>
                  {renderStudies(sinProcesarStudies)}
                </Grid>
              </Box>
            </Box>
            <Heading
              margin={'20px 0 20px 0 '}
              size="md"
            >
              Pendientes de pago
            </Heading>
            <Box
              width={'100%'}
              m={"20px 30px 30px 10px"}
              backgroundColor={'#FFFF'}
              boxShadow="0px 0px 16px 2px rgba(0, 0, 0, 0.2)"
              padding={"25px"}
              borderRadius="20px"
              minH={'300px'} maxH={'300px'}
              overflowY="scroll"
              overflowX="hidden"
            >
              <Box margin={{ lg: "0px", md: "0", sm: "5%" }}>
                <Grid gap={"15px"} templateColumns={{ lg: "repeat(5,1fr)", md: "repeat(3,1fr)", sm: "repeat(1,1fr)" }}>
                  {renderStudies(pendientesStudies)}
                </Grid>
              </Box>
            </Box>
            <Button
              borderRadius={'20px'}
              padding={'10px 30px'}
              bgColor={'#137797'}
              color='#ffff'
              onClick={toggleModalList}
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
          <ModalContent borderRadius={"20px"} bg="#ffff">
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
        <Modal
          size={sizeView}
          maxWidth='100%'
          isOpen={showModalList}
          onClose={toggleModalList}>
          <ModalOverlay />
          <ModalContent minH={'500px'} borderRadius={'20px'} bg="#ffff">
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
                onClick={toggleModalList}>
                <CloseButton />
              </Button>
            </ModalHeader>
            <ModalBody marginTop={'-5%'}>
              <ListaFacturas />
            </ModalBody>
          </ModalContent>
        </Modal>
      </>) : (<ModoLista />)
  );
};

export default Dashboard;

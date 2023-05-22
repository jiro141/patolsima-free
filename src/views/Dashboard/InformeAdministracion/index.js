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
import { BsFillFileEarmarkRichtextFill } from "react-icons/bs";
import { authApi } from "api/authApi";
import ModalInforme from "./components/ModalInforma";
import ListaInformes from "./components/ListaInformes";
import ModoLista from "./ModoLista"
import ModoVisualizacionContext from "components/ModoVisualizacion/ModoVisualizacion";


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
      estudio: "Citologia"
    },
    {
      id: 2,
      nestudio: "E:010-2023",
      fecha: "15/10/2023",
      paciente: "Pedro Perez",
      ci: "2558764",
      estudio: "Citologia"
    },
    {
      id: 3,
      nestudio: "E:010-2023",
      fecha: "15/10/2023",
      paciente: "Pedro Perez",
      ci: "2558764",
      estudio: "Citologia"
    },
    {
      id: 7,
      nestudio: "E:010-2023",
      fecha: "15/10/2023",
      paciente: "Pedro Perez",
      ci: "2558764",
      estudio: "Citologia"
    },
    {
      id: 8,
      nestudio: "E:010-2023",
      fecha: "15/10/2023",
      paciente: "Pedro Perez",
      ci: "2558764",
      estudio: "Citologia"
    },
    {
      id: 9,
      nestudio: "E:010-2023",
      fecha: "15/10/2023",
      paciente: "Pedro Perez",
      ci: "2558764",
      estudio: "Citologia"
    },
    {
      id: 10,
      nestudio: "E:010-2023",
      fecha: "15/10/2023",
      paciente: "Pedro Perez",
      ci: "2558764",
      estudio: "Citologia"
    }
  ];
  const pendientesStudies = [
    {
      id: 4,
      nestudio: "E:010-2023",
      fecha: "15/10/2023",
      paciente: "Pedro Perez",
      ci: "2558764",
      estudio: "Citologia"
    },
    {
      id: 5,
      nestudio: "E:010-2023",
      fecha: "15/10/2023",
      paciente: "Pedro Perez",
      ci: "2558764",
      estudio: "Citologia"
    },
    {
      id: 6,
      nestudio: "E:010-2023",
      fecha: "15/10/2023",
      paciente: "Pedro Perez",
      ci: "2558764",
      estudio: "Citologia"
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
  const size = useBreakpointValue({ base: "sm", lg: "5xl", md: '2xl' });
  const sizeView = useBreakpointValue({ base: "sm", lg: "5xl", md: '2xl' });
  const renderStudies = (studies) => {
    return studies.map((study) => (
      <Box>
        <Link
          onClick={toggleModal}>
          <Box
            margin={"5px 0px "}
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
                color={"#FFFF"}
                padding={"10px"}
                fontSize={"17px"}
                w={'200px'}
              >
                {study.nestudio}
                <Icon
                  border={"solid"}
                  marginTop={"-25px"}
                  marginLeft={"26%"}
                  marginBottom={'-18px'}
                  height={"55px"}
                  width={"55px"}
                  padding={"5px"}
                  borderRadius={"50%"}
                  as={BsFillFileEarmarkRichtextFill}
                  backgroundColor={"#FFFF"}
                  color={colorA}
                />
              </Badge>
            </Box>
            <Box minH={'180px'} minW={'180px'} p={"10px"}>
              <Heading size="sm">Fecha de ingreso</Heading>
              <Text
                textAlign={"right"}
                ml={2}
                color={useColorModeValue("gray.600", "gray.400")}
              >
                {study.fecha}
              </Text>
              <Heading size="sm">Estudio</Heading>
              <Text
                textAlign={"right"}
                color={useColorModeValue("gray.600", "gray.400")}
              >
                {study.estudio}
              </Text>
              <Heading size="sm">Paciente</Heading>
              <Text textAlign={"right"}>{study.paciente}</Text>
              <Heading size="sm">RIF/CI</Heading>
              <Text textAlign={"right"}>{study.ci}</Text>
            </Box>
          </Box>
        </Link>
      </Box>
    ));
  };

  return (
    modoVisualizacion === 'tarjeta' ? (
      <>
        <Box margin={{ lg: '50px 0px 0px 0px', sm: '60px 0px 10% 0px' }}
          padding={{ lg: '0 25px', md: '10px', sm: '0px 0 10% 0' }}
          backgroundColor={'gray.100'}
          borderRadius={'20px'}
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
              Informes terminados
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
              size="md"
            >
              Informes en proceso
            </Heading>
            <Box
              width={'100%'}
              m={"20px 30px 30px 10px"}
              backgroundColor={'#FFFF'}
              boxShadow="0px 0px 16px 2px rgba(0, 0, 0, 0.2)"
              padding={"25px"}
              borderRadius="20px"
              minH={'300px'}
              maxH={'300px'}
              overflowY="auto"
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
          size={'4xl'}
          maxWidth='100%'
          isOpen={showModal}
          onClose={toggleModal}>
          <ModalOverlay />
          <ModalContent borderRadius={'20px'} bg="#ffff">
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
              <ModalInforme />
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
              <ListaInformes />
            </ModalBody>
          </ModalContent>
        </Modal>
      </>
    ) : (<ModoLista />)
  );
};

export default Dashboard;

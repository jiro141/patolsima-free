import { React, useState } from "react";
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
  CloseButton,
  Button,
  Flex,
  Tr,
  Table,
  Thead,
  Th
} from "@chakra-ui/react";
import { FaFlask } from "react-icons/fa";
import { Icon } from "@chakra-ui/react";
import DatosMuestra from "./DatosMuestra";
import ModalRegistro from "./components/ModalRegistro";

const Dashboard = () => {
  const highPriorityColor = "#FE686A";
  const mediumPriorityColor = "#FC9F02";
  const lowPriorityColor = "#02B464";

  const highPriorityStudies = [
    {
      nestudio: "B:010-2023",
      fecha: "15/03/2023",
      estudio: "Biopcia",
      paciente: "Javiera de castellanos",
    },
    {
      nestudio: "B:010-2023",
      fecha: "15/03/2023",
      estudio: "Biopcia",
      paciente: "Javiera de castellanos",
    },
  ];

  const mediumPriorityStudies = [
    {
      nestudio: "B:010-2023",
      fecha: "15/03/2023",
      estudio: "ematologia",
      paciente: "Javiera de castellanos",
    },
    {
      nestudio: "B:010-2023",
      fecha: "15/03/2023",
      estudio: "Biopcia",
      paciente: "Javiera de castellanos",
    },
  ];

  const lowPriorityStudies = [
    {
      nestudio: "B:010-2023",
      fecha: "15/03/2023",
      estudio: "Biopcia",
      paciente: "Javiera de castellanos",
    },
    {
      nestudio: "B:010-2023",
      fecha: "15/03/2023",
      estudio: "Biopcia",
      paciente: "Javiera de castellanos",
    },
  ];
  // modales para las vistas flotantes
  const [showModal, setShowModal] = useState(false);
  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const renderStudies = (studies, priorityColor) => {
    return studies.map((study) => (
      <Flex flexDirection={"row 7"}>
        <Link
          onClick={toggleModal}>
          <Box
            margin={"5px auto"}
            boxShadow={"0px 0px 16px 2px rgba(0, 0, 0, 0.2)"}
            borderRadius={"16px"}
            padding={"0"}
            key={study.nestudio}
            height={'250px'}
          >
            <Box
              borderTopLeftRadius={"16px"}
              borderTopRightRadius={"16px"}
              backgroundColor={priorityColor}
            >
              <Badge
                textAlign={"center"}
                background={"none"}
                color={"#FFFF"}
                padding={"10px"}
                fontSize={"18px"}
                w={'200px'}
              >
                {study.nestudio}
                <Icon
                  border={"solid"}
                  borderColor={priorityColor}
                  marginTop={"-30px"}
                  marginLeft={"22%"}
                  marginBottom={'-18px'}
                  height={"55px"}
                  width={"55px"}
                  padding={"5px"}
                  borderRadius={"50%"}
                  as={FaFlask}
                  backgroundColor={"#FFFF"}
                  color={priorityColor}
                />
              </Badge>
            </Box>
            <Box p={"20px 10px"}>
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
        <Box
          backgroundColor={"#FFFF"}
          boxShadow={"0px 0px 16px 2px rgba(0, 0, 0, 0.2)"}
          padding={"40px"}
          borderRadius="20px"
          m={"30px 30px 10px 30px"}
        >
          <SimpleGrid columns={1} spacing={4}>
            <SimpleGrid columns={1}>
              <Box>
                <Heading
                  borderBottom="solid"
                  borderColor={highPriorityColor}
                  size="md"
                  mb={4}
                >
                  Prioridad Alta
                </Heading>
                <Grid gap={"25px"} templateColumns={"repeat(5,1fr)"}>
                  {renderStudies(highPriorityStudies, highPriorityColor)}
                </Grid>
              </Box>
            </SimpleGrid>
            <SimpleGrid columns={1}>
              <Box>
                <Heading
                  borderBottom="solid"
                  borderColor={mediumPriorityColor}
                  size="md"
                  mb={4}
                >
                  Prioridad Media
                </Heading>
                <Grid gap={"25px"} templateColumns={"repeat(5,1fr)"}>
                  {renderStudies(mediumPriorityStudies, mediumPriorityColor)}
                </Grid>
              </Box>
            </SimpleGrid>
            <SimpleGrid columns={1}>
              <Box>
                <Heading
                  borderBottom="solid"
                  borderColor={lowPriorityColor}
                  size="md"
                  mb={4}
                >
                  Prioridad Baja
                </Heading>
                <Grid gap={"25px"} templateColumns={"repeat(5,1fr)"}>
                  {renderStudies(lowPriorityStudies, lowPriorityColor)}
                </Grid>
              </Box>
            </SimpleGrid>
          </SimpleGrid>
        </Box>
      </Box>
      <Modal
        size={'4xl'}
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
            <ModalRegistro />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Dashboard;

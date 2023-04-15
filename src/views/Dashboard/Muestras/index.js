import React from "react";
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
import { FaFlask } from "react-icons/fa";
import { Icon } from "@chakra-ui/react";
import DatosMuestra from "./DatosMuestra";

const Dashboard = () => {
  const highPriorityColor = "#fc8181";
  const mediumPriorityColor = "#f6e05e";
  const lowPriorityColor = "#68d391";

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

  const renderStudies = (studies, priorityColor) => {
    // const [showModal, setShowModal] = useState(false);

    // const [isOpen, setIsOpen] = useState(false);

    // const handleOpenModal = () => {
    //     setIsOpen(true);
    // };

    // const handleCloseModal = () => {
    //     setIsOpen(false);
    // };

    return studies.map((study) => (
      <Flex flexDirection={"row 7"}>
        <Link>
          <Box
            margin={"20px auto"}
            boxShadow={"0px 0px 16px 2px rgba(0, 0, 0, 0.3)"}
            borderRadius={"16px"}
            key={study.nestudio}
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
              >
                {study.nestudio}
                <Icon
                  border={"solid"}
                  borderColor={priorityColor}
                  marginTop={"-15%"}
                  marginLeft={"15%"}
                  height={"50px"}
                  width={"50px"}
                  padding={"5px"}
                  borderRadius={"50%"}
                  as={FaFlask}
                  backgroundColor={"#FFFF"}
                  color={priorityColor}
                />
              </Badge>
              {/* <Modal isOpen={isOpen} onClose={handleCloseModal}>
                                <ModalOverlay />
                                <ModalContent>
                                    <ModalCloseButton />
                                    <DatosMuestra isOpen={isOpen} onClose={handleCloseModal} />
                                </ModalContent>
                            </Modal> */}
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
    <Box
      boxShadow="0px 0px 16px 2px rgba(0, 0, 0, 0.3)"
      padding={"40px"}
      borderRadius="20px"
      m={"100px 30px 100px 30px"}
    >
      <SimpleGrid  columns={1} spacing={4}>
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
            <Grid gap={"15px"} templateColumns={"repeat(5,1fr)"}>
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
            <Grid gap={"15px"} templateColumns={"repeat(5,1fr)"}>
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
            <Grid gap={"15px"} templateColumns={"repeat(5,1fr)"}>
              {renderStudies(lowPriorityStudies, lowPriorityColor)}
            </Grid>
          </Box>
        </SimpleGrid>
      </SimpleGrid>
    </Box>
  );
};

export default Dashboard;

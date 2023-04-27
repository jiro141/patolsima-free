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
import { BsFillFileEarmarkTextFill } from "react-icons/bs";
import { Icon } from "@chakra-ui/react";
import DatosMuestra from "./DatosMuestra";

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
      patologo: "Simon Peraza"
    },
    {
      nestudio: "B:010-2023",
      fecha: "15/03/2023",
      estudio: "Biopcia",
      paciente: "Javiera de castellanos",
      patologo: "Simon Peraza"
    },
  ];

  const mediumPriorityStudies = [
    {
      nestudio: "B:010-2023",
      fecha: "15/03/2023",
      estudio: "ematologia",
      paciente: "Javiera de castellanos",
      patologo: "Simon Peraza"
    },
    {
      nestudio: "B:010-2023",
      fecha: "15/03/2023",
      estudio: "Biopcia",
      paciente: "Javiera de castellanos",
      patologo: "Simon Peraza"
    },
  ];

  const lowPriorityStudies = [
    {
      nestudio: "B:010-2023",
      fecha: "15/03/2023",
      estudio: "Biopcia",
      paciente: "Javiera de castellanos",
      patologo: "Simon Peraza"
    },
    {
      nestudio: "B:010-2023",
      fecha: "15/03/2023",
      estudio: "Biopcia",
      paciente: "Javiera de castellanos",
      patologo: "Simon Peraza"
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
            margin={"5px auto"}
            boxShadow={"0px 0px 16px 2px rgba(0, 0, 0, 0.2)"}
            borderRadius={"16px"}
            padding={"0"}
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
                  as={BsFillFileEarmarkTextFill}
                  backgroundColor={"#FFFF"}
                  color={priorityColor}
                />
              </Badge>
            </Box>
            <Box p={"20px 10px"}>
              <Heading marginBottom={"5px"} size="sm">Fecha de ingreso</Heading>
              <Text
                marginTop={"5px"}
                textAlign={"right"}
                ml={2}
                color={useColorModeValue("gray.600", "gray.400")}
              >
                {study.fecha}
              </Text>
              <Heading marginBottom={"5px"} size="sm">Estudio</Heading>
              <Text
                marginTop={"5px"}
                textAlign={"right"}
                color={useColorModeValue("gray.600", "gray.400")}
              >
                {study.estudio}
              </Text>
              <Heading size="sm" marginBottom={"5px"} >Paciente</Heading>
              <Text marginTop={"5px"} textAlign={"right"}>{study.paciente}</Text>
              <Heading marginBottom={"5px"} size="sm">Patologo</Heading>
              <Text marginTop={"5px"} textAlign={"right"}>{study.patologo}</Text>
            </Box>
          </Box>
        </Link>
      </Flex>
    ));
  };

  return (
    <Box
      margin={'60px 0px 0px 0px'}
      backgroundColor={'gray.100'}
      borderRadius={'20px'}
      padding={'5px 0px 20px 0px'}
    >
      <Text fontSize={'20px'} margin={'20px'}>Informes en proceso</Text>
      <Box
        backgroundColor={"#FFFF"}
        boxShadow={"0px 0px 16px 2px rgba(0, 0, 0, 0.2)"}
        padding={"30px"}
        borderRadius="20px"
        m={"20px 30px 10px 30px"}
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
    </Box>
  );
};

export default Dashboard;

import { React, useState, useContext, useEffect } from "react";
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
  useBreakpointValue,
  Button,
  Flex,
  CloseButton
} from "@chakra-ui/react";
import { BsFillFileEarmarkTextFill } from "react-icons/bs";
import { Icon } from "@chakra-ui/react";
// import DatosMuestra from "./DatosMuestra";
import ModalInforme from "./components/ModalInforma";
import ModoLista from "./ModoLista"
import ModoVisualizacionContext from "components/ModoVisualizacion/ModoVisualizacion";
import ListaInformes from "./components/ListaInformes";
import { getListInforme } from "api/controllers/informes";
import { getStudiesList } from "api/controllers/estudios";

const Dashboard = () => {
  const highPriorityColor = "#FE686A";
  const mediumPriorityColor = "#FC9F02";
  const lowPriorityColor = "#02B464";
  const [informes, setInformes] = useState();
  const [informesDetail, setInformeDetail] = useState();
  const [showModal, setShowModal] = useState(false);
  const [showModalList, setShowModalList] = useState(false);
  const { modoVisualizacion } = useContext(ModoVisualizacionContext);

  /*const highPriorityStudies = [];
  const mediumPriorityStudies = [];
  const lowPriorityStudies = [];
  if (informes) {
    informes.forEach((informe) => {
      const priority = informe.estudio_prioridad;
      if (priority === "ALTA") {
        highPriorityStudies.push(informe);
      } else if (priority === "MEDIA") {
        mediumPriorityStudies.push(informe);
      } else if (priority === "BAJA") {
        lowPriorityStudies.push(informe);
      }
    });
  }*/

  const toggleModal = (informe) => {
    setShowModal(!showModal);
    setInformeDetail(informe.estudio_id)
  };

  const toggleModalList = () => {
    setShowModalList(!showModalList);
  };
  const peticionGet = async () => {
    try {
      const informesList = await getListInforme()
      setInformes(informesList);

    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    peticionGet();
  }, []);
  //tamaños de modal
  const size = useBreakpointValue({ base: "sm", lg: "5xl", md: '2xl' });
  const sizeView = useBreakpointValue({ base: "sm", lg: "5xl", md: '2xl' });

  const renderStudies = (informes, priorityColor) => {
    const renderDate = (createdAt) => {
      const date = createdAt ? new Date(createdAt) : null;
      if (date) {
        const formattedDate = date.toLocaleDateString();
        return formattedDate;
      }
      return '';
    };
    return informes.map((informe) => (
      <Flex flexDirection={"row 7"}>
        <Link
          onClick={() => toggleModal(informe)}>
          <Box
            margin={"5px auto"}
            boxShadow={"0px 0px 16px 2px rgba(0, 0, 0, 0.2)"}
            borderRadius={"16px"}
            padding={"0"}
            maxW="200px"
            maxH="250px"
            key={informe.estudio_id}
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
                fontSize={"17px"}
                w={'200px'}
              >
                {informe.estudio_codigo}
                <Icon
                  border={"solid"}
                  borderColor={priorityColor}
                  marginTop={"-30px"}
                  marginLeft={informe.estudio_codigo.length <= 10 ? '2.7em' : '1.9em'}
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
            <Box maxH={'192px'} minW={'180px'} p={"10px "}>
              <Heading size="sm">Fecha de ingreso</Heading>
              <Text
                textAlign={"right"}
                ml={2}
                color={useColorModeValue("gray.600", "gray.400")}
              >
                {renderDate(informe.created_at)}
              </Text>
              <Heading size="sm">Estudio</Heading>
              <Text

                textAlign={"right"}
                color={useColorModeValue("gray.600", "gray.400")}
              >
                {informe.estudio_tipo}
              </Text>
              <Heading size="sm"  >Paciente</Heading>
              {/* <Text textAlign={"right"}>{study.paciente}</Text> */}
              <Heading size="sm">Patologo</Heading>
              <Text textAlign={"right"}>{informe.estudio_patologo_name}</Text>
            </Box>
          </Box>
        </Link>
      </Flex>
    ));
  };

  return (
    modoVisualizacion === 'tarjeta' ? (
      <>
        <Box
          margin={{ lg: '50px 0px 0px 30px', sm: '60px 0px 10% 0px' }}
          padding={{ lg: '0 25px', md: '10px', sm: '0px 0 10% 0' }}
          backgroundColor={'gray.100'}
          borderRadius={'20px'}
          backgroundSize="cover"
          backgroundPosition="center"
          overflowY="hidden"
          overflowX="hidden"
          height={'auto'}
          //maxH={'40em'}
        >
          <Box padding={'2%'}>
            <Heading
              size="md"
            >
              Informes en proceso
            </Heading>
            <Box
              width={'100%'}
              m={"20px 30px 30px 10px"}
              backgroundColor={"#FFFF"}
              boxShadow={"0px 0px 16px 2px rgba(0, 0, 0, 0.2)"}
              borderRadius="20px"
              overflowY="scroll"
              overflowX="hidden"
              maxH={'34em'}
              minH={"300px"}
              sx={{
                "&::-webkit-scrollbar": {
                  width: "8px",
                  borderRadius: "8px",
                  backgroundColor: "#f5f5f5",
                },
                "&::-webkit-scrollbar-thumb": {
                  background: "#888",
                  borderRadius: "5px",
                },
                "&::-webkit-scrollbar-thumb:hover": {
                  background: "#555",
                },
              }}
              //maxH={'33.5em'}
            >
              <SimpleGrid columns={1} spacing={4}>
                <SimpleGrid columns={1}>
                  <Box padding={'25px'}>
                    <Heading
                      borderBottom="solid"
                      borderColor={highPriorityColor}
                      size="md"
                      mb={4}
                    >
                      Prioridad Alta
                    </Heading>
                    <Grid gap={"20px"} templateColumns={{ lg: "repeat(5,1fr)", md: "repeat(3,1fr)", sm: "repeat(1,1fr)" }}>
                      {/*renderStudies(highPriorityStudies, highPriorityColor)*/}
                    </Grid>
                  </Box>
                </SimpleGrid>
                <SimpleGrid columns={1}>
                  <Box padding={'25px'}>
                    <Heading
                      borderBottom="solid"
                      borderColor={mediumPriorityColor}
                      size="md"
                      mb={4}
                    >
                      Prioridad Media
                    </Heading>
                    <Grid gap={"20px"} templateColumns={{ lg: "repeat(5,1fr)", md: "repeat(3,1fr)", sm: "repeat(1,1fr)" }}>
                      {/*renderStudies(mediumPriorityStudies, mediumPriorityColor)*/}
                    </Grid>
                  </Box>
                </SimpleGrid>
                <SimpleGrid columns={1}>
                  <Box padding={'25px'}>
                    <Heading
                      borderBottom="solid"
                      borderColor={lowPriorityColor}
                      size="md"
                      mb={4}
                    >
                      Prioridad Baja
                    </Heading>
                    <Grid gap={"20px"} templateColumns={{ lg: "repeat(5,1fr)", md: "repeat(3,1fr)", sm: "repeat(1,1fr)" }}>
                      {/*renderStudies(lowPriorityStudies, lowPriorityColor)*/}
                    </Grid>
                  </Box>
                </SimpleGrid>
              </SimpleGrid>
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
          size={"4xl"}
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
              <ModalInforme id={informesDetail} />
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
    ) : (
      <ModoLista />
    )
  );
};

export default Dashboard;

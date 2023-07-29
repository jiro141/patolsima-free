import { React, useState, useEffect } from "react";
import {
  Badge,
  Heading,
  Link,
  Text,
  useColorModeValue,
  Table,
  Tr,
  Th,
  Thead,
  Tbody,
  Td,
  Box,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  Button,
  ModalBody,
  CloseButton,
  useBreakpointValue
} from "@chakra-ui/react";
import { FaFlask } from "react-icons/fa";
import { Icon } from "@chakra-ui/react";
import DatosMuestra from "./DatosMuestra";
import ModalInforme from "./components/ModalInforma";
import ListaInformes from "./components/ListaInformes";
import { getListInforme } from "api/controllers/informes";
import Container from "components/widgets/utils/Container";

const Dashboard = () => {
  const highPriorityColor = "#FE686A";
  const mediumPriorityColor = "#FC9F02";
  const lowPriorityColor = "#02B464";
  const [informes, setInformes] = useState();
  const highPriorityStudies = [];
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
  }

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

  return (
    <>
      <Container>
        <Box padding={'2%'}>
          <Heading
            size="md"
          >
            Informes en proceso
          </Heading>
          <Box
            p={'15px 25px 25px 25px'}
            width={'100%'}
            m={"20px 30px 30px 10px"}
            backgroundColor={"#FFFF"}
            boxShadow={"0px 0px 16px 2px rgba(0, 0, 0, 0.2)"}
            borderRadius="20px"
            overflowY="scroll"
            overflowX="hidden"
            maxH={'34em'}

          >
            <Table >
              <Thead>
                <Tr>
                  <Th># Muestra</Th>
                  <Th>Nombre y Apellido</Th>
                  <Th>RIF/CI</Th>
                  <Th>Fecha de recepción</Th>
                  <Th>Tipo de estudio</Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr borderBottom={'solid 3px'} borderColor={highPriorityColor}>
                  <Heading
                    size="md"
                    mt={4}
                  >
                    Prioridad Alta
                  </Heading>
                </Tr>
                {highPriorityStudies.map((informe) => {
                  const fechaHora = informe.created_at;
                  const fecha = fechaHora ? fechaHora.split("T")[0] : "";
                  return (
                    <Tr borderBottom="solid 2px" borderColor="gray.400" key={informe.id}>
                      <Td>
                        <Link onClick={() => toggleModal()}>{informe.estudio_codigo}</Link>
                      </Td>
                      <Td>
                        {/* <Link onClick={() => toggleModal(study)}>{informe.paciente.nombres} {informe.paciente.apellidos}</Link> */}
                      </Td>
                      <Td>
                        <Link onClick={() => toggleModal()}>{informe.estudio_paciente_ci}</Link>
                      </Td>
                      <Td>
                        <Link onClick={() => toggleModal()}>{fecha}</Link>
                      </Td>
                      <Td>
                        <Link onClick={() => toggleModal()}>{informe.estudio_tipo}</Link>
                      </Td>
                    </Tr>
                  );
                })}
                <Tr borderBottom={'solid 3px'} borderColor={mediumPriorityColor}>
                  <Heading
                    size="md"
                    mt={4}
                  >
                    Prioridad Media
                  </Heading>
                </Tr>
                {mediumPriorityStudies.map((informe) => {
                  const fechaHora = informe.created_at;
                  const fecha = fechaHora ? fechaHora.split("T")[0] : "";
                  return (
                    <Tr borderBottom="solid 2px" borderColor="gray.400" key={informe.id}>
                      <Td>
                        <Link onClick={() => toggleModal()}>{informe.estudio_codigo}</Link>
                      </Td>
                      <Td>
                        {/* <Link onClick={() => toggleModal(study)}>{informe.paciente.nombres} {informe.paciente.apellidos}</Link> */}
                      </Td>
                      <Td>
                        <Link onClick={() => toggleModal()}>{informe.estudio_paciente_ci}</Link>
                      </Td>
                      <Td>
                        <Link onClick={() => toggleModal()}>{fecha}</Link>
                      </Td>
                      <Td>
                        <Link onClick={() => toggleModal()}>{informe.estudio_tipo}</Link>
                      </Td>
                    </Tr>
                  );
                })}
                <Tr borderBottom={'solid 3px'} borderColor={lowPriorityColor}>
                  <Heading
                    size="md"
                    mt={4}
                  >
                    Prioridad Baja
                  </Heading>
                </Tr>
                {lowPriorityStudies.map((informe) => {
                  const fechaHora = informe.created_at;
                  const fecha = fechaHora ? fechaHora.split("T")[0] : "";
                  return (
                    <Tr borderBottom="solid 2px" borderColor="gray.400" key={informe.id}>
                      <Td>
                        <Link onClick={() => toggleModal()}>{informe.estudio_codigo}</Link>
                      </Td>
                      <Td>
                        {/* <Link onClick={() => toggleModal(study)}>{informe.paciente.nombres} {informe.paciente.apellidos}</Link> */}
                      </Td>
                      <Td>
                        <Link onClick={() => toggleModal()}>{informe.estudio_paciente_ci}</Link>
                      </Td>
                      <Td>
                        <Link onClick={() => toggleModal()}>{fecha}</Link>
                      </Td>
                      <Td>
                        <Link onClick={() => toggleModal()}>{informe.estudio_tipo}</Link>
                      </Td>
                    </Tr>
                  );
                })}
              </Tbody>
            </Table>
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
      </Container>
    {  <Modal
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
      </Modal>}




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
  );
};
export default Dashboard;
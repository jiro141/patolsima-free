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
  CloseButton
} from "@chakra-ui/react";
import { FaFlask } from "react-icons/fa";
import { Icon } from "@chakra-ui/react";
import ModalRegistro from "./components/ModalRegistro";
import { getStudiesList } from "api/controllers/estudios";
import Container from "components/widgets/utils/Container";
import { TableStudys_Alta } from "../Facturacion/components/TableOrders";
import { getInformesListHightPriority } from "api/controllers/informes";
import { getStudiesListPriorityALTA } from "api/controllers/estudios";
import { formatDate } from "helpers";

const Dashboard = () => {
  const highPriorityColor = "#FE686A";
  const mediumPriorityColor = "#FC9F02";
  const lowPriorityColor = "#02B464";
  const [studiesListPriorityALTA, setStudiesListPriorityALTA] = useState([])
  // console.log(studies);
  const peticionGet = async () => {
    try {
      const estudiosList = await getStudiesListPriorityALTA()
      console.log(estudiosList);
      setStudiesListPriorityALTA(estudiosList);

    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    peticionGet();
    getStudiesListPriorityALTA()

  }, []);
  const [showModal, setShowModal] = useState(false);
  const toggleModal = (study) => {
    setShowModal(!showModal);
    // setStudy(study);
  };


  return (
    <>
      <Container >
        <Box padding={'2%'}>
          <TableStudys_Alta colorA={highPriorityColor}>
            <Tbody>
              {studiesListPriorityALTA.length === 0 ? (
                <Tr>
                  <Td border={'none'} colSpan={5} textAlign="center">
                    <Text textAlign="center" marginTop={'48px'} fontSize={'20px'}>
                      No se encontraron resultados
                    </Text>
                  </Td>
                </Tr>
              ) : (
                studiesListPriorityALTA.map((study) => (
                  <Tr borderBottom={'solid 2px'} borderColor={'gray.400'} key={study.id}>
                    <Td textAlign={'center'} style={{ width: '15%' }}>
                      <Link onClick={() => handleSelectInforme(study)}>{study?.codigo}</Link>
                    </Td>
                    <Td textAlign={'center'}>
                      <Link onClick={() => handleSelectInforme(study)}>
                        {study?.paciente.nombres.length > 8 && study?.paciente.apellidos.length > 8
                          ? study?.paciente.nombres.substring(0, 5) + "..." + study?.paciente.apellidos.substring(0, 5) + "..."
                          : study?.paciente.nombres + ' ' + study?.paciente.apellidos}
                      </Link>
                    </Td>
                    <Td textAlign={'center'} style={{ width: '15%' }}>
                      <Link onClick={() => handleSelectInforme(study)}>{study?.paciente.ci}</Link>
                    </Td>
                    <Td textAlign={'center'} style={{ width: '15%' }}>
                      <Link onClick={() => handleSelectInforme(study)}>{formatDate(study?.created_at)}</Link>
                    </Td>
                    <Td textAlign={'center'} >
                      <Link onClick={() => handleSelectInforme(study)}>{study?.tipo}</Link>
                    </Td>
                  </Tr>
                ))
              )}
            </Tbody>
          </TableStudys_Alta>

        </Box>
      </Container>
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
            <ModalRegistro />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
export default Dashboard;
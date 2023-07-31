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
import { TableStudys_Media } from "../Facturacion/components/TableOrders";
import { TableStudys_Baja } from "../Facturacion/components/TableOrders";
import { getStudiesListPriorityALTA } from "api/controllers/estudios";
import { getStudiesListPriorityMEDIA } from "api/controllers/estudios";
import { getStudiesListPriorityBAJA } from "api/controllers/estudios";
import { formatDate } from "helpers";

const Dashboard = () => {
  const highPriorityColor = "#FE686A";
  const mediumPriorityColor = "#FC9F02";
  const lowPriorityColor = "#02B464";
  const [studiesListPriorityALTA, setStudiesListPriorityALTA] = useState([])
  const [studiesListPriorityMEDIA, setStudiesListPriorityMEDIA] = useState([])
  const [studiesListPriorityBAJA, setStudiesListPriorityBAJA] = useState([])
  const [study, setStudy] = useState();
  // console.log(studies);
  const peticionGetAlta = async () => {
    try {
      const estudiosList = await getStudiesListPriorityALTA()
      console.log(estudiosList);
      setStudiesListPriorityALTA(estudiosList);

    } catch (error) {
      console.log(error);
    }
  };
  const peticionGetMedia = async () => {
    try {
      const estudiosList = await getStudiesListPriorityMEDIA()
      console.log(estudiosList);
      setStudiesListPriorityMEDIA(estudiosList);

    } catch (error) {
      console.log(error);
    }
  };
  const peticionGetBaja = async () => {
    try {
      const estudiosList = await getStudiesListPriorityBAJA()
      console.log(estudiosList);
      setStudiesListPriorityBAJA(estudiosList);

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    peticionGetAlta();
    peticionGetBaja();
    peticionGetMedia();
    getStudiesListPriorityALTA();
    getStudiesListPriorityMEDIA();
    getStudiesListPriorityBAJA();

  }, []);
  const [showModal, setShowModal] = useState(false);
  const toggleModal = (study) => {
    setShowModal(!showModal);
    setStudy(study);
  };


  return (
    <>
      <Container >
        <Box padding={'2%'}>
          <TableStudys_Alta colorA={highPriorityColor}>
            <Tbody>
              {studiesListPriorityALTA?.length === 0 ? (
                <Tr>
                  <Td border={'none'} colSpan={5} textAlign="center">
                    <Text textAlign="center" marginTop={'48px'} fontSize={'20px'}>
                      No se encontraron resultados
                    </Text>
                  </Td>
                </Tr>
              ) : (
                studiesListPriorityALTA?.map((study) => (
                  <Tr borderBottom={'solid 2px'} borderColor={'gray.400'} key={study.id}>
                    <Td textAlign={'center'} style={{ width: '15%' }}>
                      <Link onClick={() => toggleModal(study)}>{study?.codigo}</Link>
                    </Td>
                    <Td textAlign={'center'}>
                      <Link onClick={() => toggleModal(study)}>
                        {study?.paciente.nombres.length > 8 && study?.paciente.apellidos.length > 8
                          ? study?.paciente.nombres.substring(0, 5) + "..." + study?.paciente.apellidos.substring(0, 5) + "..."
                          : study?.paciente.nombres + ' ' + study?.paciente.apellidos}
                      </Link>
                    </Td>
                    <Td textAlign={'center'} style={{ width: '15%' }}>
                      <Link onClick={() => toggleModal(study)}>{study?.paciente.ci}</Link>
                    </Td>
                    <Td textAlign={'center'} style={{ width: '15%' }}>
                      <Link onClick={() => toggleModal(study)}>{formatDate(study?.created_at)}</Link>
                    </Td>
                    <Td textAlign={'center'} >
                      <Link onClick={() => handleSelectInforme(study)}>{study?.tipo}</Link>
                    </Td>
                  </Tr>
                ))
              )}
            </Tbody>
          </TableStudys_Alta>
          <TableStudys_Media colorA={mediumPriorityColor}>
            <Tbody>
              {studiesListPriorityMEDIA?.length === 0 ? (
                <Tr>
                  <Td border={'none'} colSpan={5} textAlign="center">
                    <Text textAlign="center" marginTop={'48px'} fontSize={'20px'}>
                      No se encontraron resultados
                    </Text>
                  </Td>
                </Tr>
              ) : (
                studiesListPriorityMEDIA?.map((study) => (
                  <Tr borderBottom={'solid 2px'} borderColor={'gray.400'} key={study.id}>
                    <Td textAlign={'center'} style={{ width: '15%' }}>
                      <Link onClick={() => toggleModal(study)}>{study?.codigo}</Link>
                    </Td>
                    <Td textAlign={'center'}>
                      <Link onClick={() => toggleModal(study)}>
                        {study?.paciente.nombres.length > 8 && study?.paciente.apellidos.length > 8
                          ? study?.paciente.nombres.substring(0, 5) + "..." + study?.paciente.apellidos.substring(0, 5) + "..."
                          : study?.paciente.nombres + ' ' + study?.paciente.apellidos}
                      </Link>
                    </Td>
                    <Td textAlign={'center'} style={{ width: '15%' }}>
                      <Link onClick={() => toggleModal(study)}>{study?.paciente.ci}</Link>
                    </Td>
                    <Td textAlign={'center'} style={{ width: '15%' }}>
                      <Link onClick={() => toggleModal(study)}>{formatDate(study?.created_at)}</Link>
                    </Td>
                    <Td textAlign={'center'} >
                      <Link onClick={() => toggleModal(study)}>{study?.tipo}</Link>
                    </Td>
                  </Tr>
                ))
              )}
            </Tbody>
          </TableStudys_Media>
          <TableStudys_Baja colorA={lowPriorityColor}>
            <Tbody>
              {studiesListPriorityBAJA?.length === 0 ? (
                <Tr>
                  <Td border={'none'} colSpan={5} textAlign="center">
                    <Text textAlign="center" marginTop={'48px'} fontSize={'20px'}>
                      No se encontraron resultados
                    </Text>
                  </Td>
                </Tr>
              ) : (
                studiesListPriorityBAJA?.map((study) => (
                  <Tr borderBottom={'solid 2px'} borderColor={'gray.400'} key={study.id}>
                    <Td textAlign={'center'} style={{ width: '15%' }}>
                      <Link onClick={() => toggleModal(study)}>{study?.codigo}</Link>
                    </Td>
                    <Td textAlign={'center'}>
                      <Link onClick={() => toggleModal(study)}>
                        {study?.paciente.nombres.length > 8 && study?.paciente.apellidos.length > 8
                          ? study?.paciente.nombres.substring(0, 5) + "..." + study?.paciente.apellidos.substring(0, 5) + "..."
                          : study?.paciente.nombres + ' ' + study?.paciente.apellidos}
                      </Link>
                    </Td>
                    <Td textAlign={'center'} style={{ width: '15%' }}>
                      <Link onClick={() => toggleModal(study)}>{study?.paciente.ci}</Link>
                    </Td>
                    <Td textAlign={'center'} style={{ width: '15%' }}>
                      <Link onClick={() => toggleModal(study)}>{formatDate(study?.created_at)}</Link>
                    </Td>
                    <Td textAlign={'center'} >
                      <Link onClick={() => toggleModal(study)}>{study?.tipo}</Link>
                    </Td>
                  </Tr>
                ))
              )}
            </Tbody>
          </TableStudys_Baja>

        </Box>
      </Container>
      <Modal
        size={'3xl'}
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
            <ModalRegistro study={study} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
export default Dashboard;
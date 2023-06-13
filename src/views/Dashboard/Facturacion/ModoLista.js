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
import ModalFacturacion from "./components/ModalFacturacion";
import ListaFacturas from "./components/ListaFacturas";
import { getCambio } from "api/controllers/tazaDia";
import { getFacturasList } from "api/controllers/facturas";


const Dashboard = () => {
  const [cambioDelDia, setCambioDelDia] = useState('');
  const [facturas, setFacturas] = useState([]);

  const cambioDia = async () => {
    try {
      const cambio = await getCambio()
      setCambioDelDia(cambio)
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    cambioDia();
  }, []);
  const peticionGet = async () => {
    try {
      const facturasList = await getFacturasList()
      setFacturas(facturasList)
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    peticionGet();
  }, []);
  const facturasClasificadas = facturas.reduce((clasificacion, factura) => {
    if (factura.confirmada) {
      clasificacion.confirmadas.push(factura);
    } else if (factura.pagada) {
      clasificacion.pagadas.push(factura);
    } else {
      clasificacion.pendientes.push(factura);
    }
    return clasificacion;
  }, { confirmadas: [], pagadas: [], pendientes: [] });

  const sinConfirmar = facturasClasificadas.pendientes.map((listaFacturas) => {
    return {
      id: listaFacturas.id,
      nestudio: listaFacturas.cliente,
      fecha: "15/10/2023",
      paciente: listaFacturas.cliente.razon_social,
      ci: listaFacturas.cliente.ci_rif,
      monto: 25452
    }
  });

  const pendientes = facturasClasificadas.confirmadas.map((listaFacturas) => {
    return {
      id: listaFacturas.id,
      nestudio: listaFacturas.cliente,
      fecha: "15/10/2023",
      paciente: listaFacturas.cliente.razon_social,
      ci: listaFacturas.cliente.ci_rif,
      monto: 25452
    }
  });
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

  return (
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
        scrollPadding={'1px'}
      >
        <Box
          width={'100%'}
          margin={'10px 0px 0px 25px'}
          display="flex" justifyContent="flex-end"
        >
          <Box
            width={'15%'}
          >
            <Text
              borderTopLeftRadius={'20px'}
              borderBottomLeftRadius={'20px'}
              textAlign={'center'}
              padding="10px"
              backgroundColor="#137797"
              color="#FFF"
              fontSize={'14px'}
            >
              Dolar BCV: {cambioDelDia}
            </Text>
          </Box>
        </Box>
        <Box marginTop={'-15px'} padding={'2%'}>
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
            overflowX="hidden">
            <Box>
              <Table >
                <Thead>
                  <Tr>
                    <Th borderBottom={'solid 2px'} borderColor={'gray.400'}>Fecha</Th>
                    <Th borderBottom={'solid 2px'} borderColor={'gray.400'}>Cliente</Th>
                    <Th borderBottom={'solid 2px'} borderColor={'gray.400'}>RIF/CI</Th>
                    <Th borderBottom={'solid 2px'} borderColor={'gray.400'}>Monto ($)</Th>
                    <Th borderBottom={'solid 2px'} borderColor={'gray.400'}>Monto (Bs)</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {sinConfirmar.map((study) => (
                    <Tr borderBottom={'solid 2px'} borderColor={'gray.400'} key={study.nestudio}>
                      <Td>
                        <Link onClick={toggleModal}> {study.fecha}</Link>
                      </Td>
                      <Td><Link onClick={toggleModal}>{study.paciente}</Link></Td>
                      <Td>
                        <Link onClick={toggleModal}>{study.ci}</Link>
                      </Td>
                      <Td>
                        <Link onClick={toggleModal}>{study.montoD} $ </Link>
                      </Td>
                      <Td><Link onClick={toggleModal}>{study.montoB} Bs </Link></Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
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
            <Table >
              <Thead>
                <Tr>
                  <Th borderBottom={'solid 2px'} borderColor={'gray.400'}>Fecha</Th>
                  <Th borderBottom={'solid 2px'} borderColor={'gray.400'}>Cliente</Th>
                  <Th borderBottom={'solid 2px'} borderColor={'gray.400'}>RIF/CI</Th>
                  <Th borderBottom={'solid 2px'} borderColor={'gray.400'}>Monto ($)</Th>
                  <Th borderBottom={'solid 2px'} borderColor={'gray.400'}>Monto (Bs)</Th>
                </Tr>
              </Thead>
              <Tbody>
                {pendientes.map((study) => (
                  <Tr borderBottom={'solid 2px'} borderColor={'gray.400'} key={study.nestudio}>
                    <Td>
                      <Link onClick={toggleModal}> {study.fecha}</Link>
                    </Td>
                    <Td><Link onClick={toggleModal}>{study.paciente}</Link></Td>
                    <Td>
                      <Link onClick={toggleModal}>{study.ci}</Link>
                    </Td>
                    <Td>
                      <Link onClick={toggleModal}>{study.montoD} $ </Link>
                    </Td>
                    <Td><Link onClick={toggleModal}>{study.montoB} Bs </Link></Td>
                  </Tr>
                ))}
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
    </>
  );
};
export default Dashboard;
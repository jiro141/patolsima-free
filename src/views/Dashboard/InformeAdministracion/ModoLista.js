import { React, useState } from "react";
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
import ListaInformes from "./components/ListaInformes";
import ModalInforme from "./components/ModalInforma";
import { Title } from "components/widgets/Texts";





const Dashboard = () => {

  const sinConfirmar = [
    {
      fecha: "15/03/2023",
      cliente: "josesito jose",
      ci: "536510320",
      montoD: "20",
      montoB: "486.2",
    },
    {
      fecha: "15/03/2023",
      cliente: "josesito jose",
      ci: "536510320",
      montoD: "20",
      montoB: "486.2",
    },
  ];

  const pendientes = [
    {
      fecha: "15/03/2023",
      cliente: "josesito jose",
      ci: "536510320",
      montoD: "20",
      montoB: "486.2",
    },
    {
      fecha: "15/03/2023",
      cliente: "josesito jose",
      ci: "536510320",
      montoD: "20",
      montoB: "486.2",
    },
  ];
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
      <Box 
        margin={{ lg: "50px 0px 0px 20px", sm: "60px 0px 10% 0px" }}
        w={{ sm: "calc(100vw - 30px)", xl: "calc(100vw - 75px - 235px)" }}
        height={'auto'}
        padding={{ lg: "0 50px 20px 10px", md: "20px", sm: "0px 0 10% 0" }}
        backgroundColor={"gray.100"}
        borderTopLeftRadius={"20px"}
        backgroundSize="cover"
        backgroundPosition="center"
        overflowY="hidden"
        overflowX={{ lg: "hidden", sm: "auto" }}
      >

        <Box padding={'2%'}>
        <Title title={' Informes no confirmados'} />
          <Box
            width={'100%'}
            m={"20px 30px 30px 10px"}
            backgroundColor={'#FFFF'}
            boxShadow="0px 0px 16px 2px rgba(0, 0, 0, 0.2)"
            padding={"25px"}
            borderRadius="20px"
            minH={'300px'} maxH={'300px'}
            overflowY="hidden"
            overflowX="hidden"
          >
            <Table >
              <Thead>
                <Tr>
                  <Th borderBottom={'solid 2px'} borderColor={'gray.400'}># Muestra</Th>
                  <Th borderBottom={'solid 2px'} borderColor={'gray.400'}>Paciente</Th>
                  <Th borderBottom={'solid 2px'} borderColor={'gray.400'}>RIF/CI</Th>
                  <Th borderBottom={'solid 2px'} borderColor={'gray.400'}>Tipo de estudio</Th>
                  <Th borderBottom={'solid 2px'} borderColor={'gray.400'}>Patólogo</Th>
                </Tr>
              </Thead>
              <Tbody>
                {sinConfirmar.map((study) => (
                  <Tr borderBottom={'solid 2px'} borderColor={'gray.400'} key={study.nestudio}>
                    <Td>
                      <Link  style={{fontSize:'13.5px'}} onClick={toggleModal}> {study.fecha}</Link>
                    </Td>
                    <Td><Link  style={{fontSize:'13.5px'}} onClick={toggleModal}>{study.cliente}</Link></Td>
                    <Td>
                      <Link  style={{fontSize:'13.5px'}} onClick={toggleModal}>{study.ci}</Link>
                    </Td>
                    <Td>
                      <Link  style={{fontSize:'13.5px'}} onClick={toggleModal}>{study.montoD} $ </Link>
                    </Td>
                    <Td><Link  style={{fontSize:'13.5px'}} onClick={toggleModal}>{study.montoB} Bs </Link></Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </Box>
         {/* <Heading
            margin={'20px 0 20px 0 '}
            size="md"
          >
            Informes en proceso
          </Heading>*/}
          <Title title={' Informes confirmados'} />
          <Box
            width={'100%'}
            m={"20px 30px 30px 10px"}
            backgroundColor={'#FFFF'}
            boxShadow="0px 0px 16px 2px rgba(0, 0, 0, 0.2)"
            padding={"25px"}
            borderRadius="20px"
            minH={'300px'} maxH={'300px'}
            overflowY="hidden"
            overflowX="hidden"
          >
            <Table >
              <Thead>
                <Tr>
                  <Th borderBottom={'solid 2px'} borderColor={'gray.400'}># Muestra</Th>
                  <Th borderBottom={'solid 2px'} borderColor={'gray.400'}>Paciente</Th>
                  <Th borderBottom={'solid 2px'} borderColor={'gray.400'}>RIF/CI</Th>
                  <Th borderBottom={'solid 2px'} borderColor={'gray.400'}>Tipo de estudio</Th>
                  <Th borderBottom={'solid 2px'} borderColor={'gray.400'}>Patólogo</Th>
                </Tr>
              </Thead>
              <Tbody>
                {pendientes.map((study) => (
                  <Tr borderBottom={'solid 2px'} borderColor={'gray.400'} key={study.nestudio}>
                    <Td>
                      <Link  style={{fontSize:'13.5px'}} onClick={toggleModal}> {study.fecha}</Link>
                    </Td>
                    <Td><Link  style={{fontSize:'13.5px'}} onClick={toggleModal}>{study.cliente}</Link></Td>
                    <Td>
                      <Link  style={{fontSize:'13.5px'}} onClick={toggleModal}>{study.ci}</Link>
                    </Td>
                    <Td>
                      <Link  style={{fontSize:'13.5px'}} onClick={toggleModal}>{study.montoD} $ </Link>
                    </Td>
                    <Td><Link  style={{fontSize:'13.5px'}} onClick={toggleModal}>{study.montoB} Bs </Link></Td>
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
  );
};
export default Dashboard;
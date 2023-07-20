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
import MainContext from "context/mainContext/MainContext";
import CardOverall_ from "components/widgets/Cards/CardOverall";
import { useInformes } from "hooks/Informes/useInformes";
import ShowMoreButton from "components/widgets/Buttons/ShowMoreButton";
import { CardOverall_Infor } from "components/widgets/Cards/CardOverall";
import FilteredDataModal from "components/widgets/Modals/FilteredDataModal";
import { thValuesInformes } from "mocks";


const Dashboard = () => {
  const { modoVisualizacion } = useContext(ModoVisualizacionContext);
  const {  
    
    hiddenInformessort, sethiddenInformessort } = useContext(MainContext);
    const {informes,getInformes,informesCompletados,informesNoCompletados,filteredInforme,loading,error,setInformes}=useInformes()
    const [showModalConfirmacion, setShowModalConfirmacion] = useState(false);

    const [Busqueda, setBusqueda] = useState("");
  const colorA = '#137797';

  const sinProcesarStudies = [
    {
      id: 1,
      nestudio: "E:010-2023",
      fecha: "15/10/2023",
      paciente: "Juan Pedro Perez Colmenares",
      ci: "2558764",
      estudio: "Citologia"
    },
    {
      id: 2,
      nestudio: "E:010-2023",
      fecha: "15/10/2023",
      paciente: "Juan Pedro del carmen Perez Colmenares",
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
  useEffect(() => {
    getInformes();
   
  }, []);

  const toggleModalConfirmacion = (paciente) => {
    setShowModalConfirmacion(!showModalConfirmacion);
   // setPacienteName(paciente.nombres);
   // setPacienteIdDelete(paciente.id);
  };
  const handleBusquedaChange = (event) => {
    const query = event.target.value;
    if (query.startsWith(" ")) return;
    setBusqueda(query);
    filtrar(query);
  };

  const filtrar = (terminoBusqueda) => {
    let resultadoBusqueda = filteredInforme.filter((elemento) => {
      if (
        elemento.estudio_codigo
          .toLowerCase()
          .includes(terminoBusqueda.toLowerCase()) ||
        elemento.estudio_patologo_name
          .toLowerCase()
          .includes(terminoBusqueda.toLowerCase()) 
       
      ) {
        return elemento;
      }
    });
    setInformes(resultadoBusqueda);
  };
 
  const renderStudies = (studies) => {
    return studies.map((study) => (
      <Box>
        <Link
          onClick={toggleModal}>
          <Box
            w={'200px'}
            h={'248px'}
            margin={"5px auto 5px auto"}
            boxShadow={"0px 0px 16px 2px rgba(0, 0, 0, 0.2)"}
            borderRadius={"16px"}
            key={study.id}
            padding={"0"}
          >
            <Box
              w={'200px'}
              h={'45px'}
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
                  position={'relative'}
                  border={"solid"}
                  marginTop={"-25px"}
                  marginLeft={"25%"}
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
            <Box w={'200px'} h={'193px'} p={"10px"} >
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
           <Box
        margin={{ lg: "50px 0px 0px 20px", sm: "60px 0px 10% 0px" }}
        w={{ sm: "calc(100vw - 30px)", xl: "calc(100vw - 75px - 235px)" }}
        height={'auto'}
        //pb={'50px'}
        //py={'5px'}
      // border={'1px'}
     // pb={'60px'}
        padding={{ lg: "0 50px 20px 10px", md: "20px", sm: "0px 0 10% 0" }}
        backgroundColor={"gray.100"}
        borderTopLeftRadius={"20px"}
        backgroundSize="cover"
        backgroundPosition="center"
        overflowY="hidden"
        overflowX={{ lg: "hidden", sm: "auto" }}
        // maxH={'40em'}
      >
       

        <Box padding={'2%'}>
          {hiddenInformessort ? (
            <>
              <CardOverall_Infor
              type='informes'
                title={"Infomes sin completar"}
                content={informesNoCompletados}
                toggleModal={toggleModal}
                colorA={colorA}
                loading={loading}
                
              />

              <CardOverall_Infor
                title={"Infomes Completados"}
                content={informesCompletados}
                toggleModal={toggleModal}
                colorA={colorA}
                loading={loading}
                type='informes'
              />
            </>
          ) : (
            <CardOverall_Infor
              title={"Resultados"}
              content={informes}
              toggleModal={toggleModal}
              colorA={colorA}
              loading={loading}
              type="search"
            />
          )}

          <ShowMoreButton handleClick={toggleModalList} />
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

<FilteredDataModal type='informes' thData={thValuesInformes} isOpenModal={showModalList} isToggleModal={toggleModalList} tBodyData={informes}
 Busqueda={Busqueda}
 //handleSelectTBody={seleccionarRegistro}
 handleSelectIcon={toggleModalConfirmacion}
 loading={loading}
 handleBusquedaChange={handleBusquedaChange}

/>

      {/* <Modal
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
        </Modal>*/}


      </>
    ) : (<ModoLista />)
  );
};

export default Dashboard;

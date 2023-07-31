import { React, useState, useContext, useEffect } from "react";
import {
  Box,
  SimpleGrid,
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
  ModalFooter,
  ModalBody,
  CloseButton,
  Button,
  Flex,
} from "@chakra-ui/react";
import { FaFlask } from "react-icons/fa";
import { Icon } from "@chakra-ui/react";
import ModalRegistro from "./components/ModalRegistro";
import ModoVisualizacionContext from "components/ModoVisualizacion/ModoVisualizacion";
import ModoLista from "./ModoLista";
import { getStudiesList } from "api/controllers/estudios";
import { useMuestrasPatologo } from "hooks/MuestrasPatologo/useMuestrasPatologo";
import MainContext from "context/mainContext/MainContext";
import CardOverall_ from "components/widgets/Cards/CardOverall";
import { CardOverall_Muestra } from "components/widgets/Cards/CardOverall";
import ModalRegisterInforme from "components/widgets/Modals/ModalRegisterInforme";
import Container from "components/widgets/utils/Container";

const Dashboard = () => {
  const { modoVisualizacion } = useContext(ModoVisualizacionContext);
  const { informesp,hiddenInformessortp,setEnableSearch,sethiddenInformessortp} = useContext(MainContext);
  const [showModal, setShowModal] = useState(false);
  const [studies, setStudies] = useState();
  const [study, setStudy] = useState();
  const highPriorityColor = "#FE686A";
  const mediumPriorityColor = "#FC9F02";
  const lowPriorityColor = "#02B464";

 const {muestraALTA,muestraMEDIA,muestraBAJA,getMuestrasPatologoAlta,getMuestrasPatologoMedia,getMuestrasPatologoBaja,loadingA,loadingM,loadingB,getInformes}= useMuestrasPatologo()



  useEffect(() => {
    getInformes()
    
    getMuestrasPatologoAlta()
    getMuestrasPatologoMedia()
    getMuestrasPatologoBaja()
  }, [])
  
useEffect(() => {
  if(hiddenInformessortp){
  setEnableSearch(false)
  
  }
 
  return () => { 
    setEnableSearch(false)
   // sethiddenInformessortp(false)
  }
}, [hiddenInformessortp])



 
  console.log(muestraALTA);

  const toggleModal = (study) => {
    console.log('toggleling')
    setShowModal(!showModal);
    setStudy(study);
  };



  console.log(informesp);
  const renderStudies = (studies, priorityColor) => {
    const renderDate = (createdAt) => {
      const date = createdAt ? new Date(createdAt) : null;
      if (date) {
        const formattedDate = date.toLocaleDateString();
        return formattedDate;
      }
      return '';
    };
  
    return studies.map((study) => (
      <Flex flexDirection="row 7" key={study.id} >
        <Link onClick={() => toggleModal(study)}>
          <Box
        //  border={'1px solid'}
          marginLeft={'30px'}
            //margin="5px 0px"
            boxShadow="0px 0px 16px 2px rgba(0, 0, 0, 0.2)"
            borderRadius="16px"
            padding="0"
            maxW="200px"
            maxH="250px"
            key={study.id}
          >
            <Box
              borderTopLeftRadius="16px"
              borderTopRightRadius="16px"
              backgroundColor={priorityColor}
              display="flex"
              justifyContent="space-between"
            >
              <Badge
                textAlign="left"
                background="none"
                color="#FFFF"
                padding="10px"
                fontSize="17px"
                w="150px"
              >
                {studies ? (
                  <>{study.codigo}</>
                ) : (
                  <Text>Loading...</Text>
                )}
                <Icon
                  border="solid"
                  borderColor={priorityColor}
                  marginTop="-9em"
                  marginLeft={study.codigo.length <= 10 ? '2.7em' : '1.9em'}
                  marginBottom="-18px"
                  height="55px"
                  width="55px"
                  padding="5px"
                  borderRadius="50%"
                  as={FaFlask}
                  backgroundColor="#FFFF"
                  color={priorityColor}
                />
              </Badge>
            </Box>
            <Box minH="192px" minW="180px" p="10px">
              <Heading size="sm">Fecha de ingreso</Heading>
              <Text
                textAlign="right"
                ml={2}
                color={useColorModeValue('gray.600', 'gray.400')}
              >
                {renderDate(study.created_at)}
              </Text>
              <Heading size="sm">Estudio</Heading>
              <Text
                textAlign="right"
                color={useColorModeValue('gray.600', 'gray.400')}
              >
                {studies ? (
                  <Text style={{ fontSize: '100%' }}>{study.tipo}</Text>
                ) : (
                  <Text fontSize="14px">Loading...</Text>
                )}
              </Text>
              <Heading size="sm">Paciente</Heading>
              {studies ? (
                <Text fontSize="14px">
                  {study.paciente.nombres} {study.paciente.apellidos}
                </Text>
              ) : (
                <Text fontSize="14px">Loading...</Text>
              )}
            </Box>
          </Box>
        </Link>
      </Flex>
    ));
  };
  return (
    modoVisualizacion === 'tarjeta' ? (
      <>
        <Container>
         
          
            <Box marginTop={"30px"} width={'100%'}
            pl={'5px'}>
          {hiddenInformessortp ? (
            <>
              <CardOverall_Muestra
                title={"Prioridad Alta"}
                content={muestraALTA}
                toggleModal={toggleModal}
                colorA={highPriorityColor}
                loading={loadingA}
                type="other"
              />

              <CardOverall_Muestra
                title={"Prioridad Media"}
                content={muestraMEDIA}
                toggleModal={toggleModal}
                colorA={mediumPriorityColor}
                loading={loadingM}
                type="other"
              />
               <CardOverall_Muestra
                title={"Prioridad Baja"}
                content={muestraBAJA}
                toggleModal={toggleModal}
                colorA={lowPriorityColor}
                loading={loadingB}
                type="other"
              />
            </>
          ) :  (
            <CardOverall_Muestra
              title={"Resultados"}
              content={informesp}
              toggleModal={toggleModal}
              //colorA={colorA}
              //loading={loading}
              type="search"
            />
          ) }

        
        </Box>
         
        </Container>


       {/* <Modal
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
              <ModalRegistro study={study} close={toggleModal} />
            </ModalBody>
          </ModalContent>
        </Modal> */}
        <ModalRegisterInforme showModal={showModal}
        toggleModal={toggleModal}
        study={study} />
      </>
    ) : (
      <ModoLista />
    )
  );
};

export default Dashboard;
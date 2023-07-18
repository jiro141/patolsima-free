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

const Dashboard = () => {
  const { modoVisualizacion } = useContext(ModoVisualizacionContext);
  const { hiddenmuestrasPatologosort} = useContext(MainContext);
  const [showModal, setShowModal] = useState(false);
  const [studies, setStudies] = useState();
  const [study, setStudy] = useState();
  const highPriorityColor = "#FE686A";
  const mediumPriorityColor = "#FC9F02";
  const lowPriorityColor = "#02B464";

 const {muestraALTA,muestraMEDIA,muestraBAJA,getMuestrasPatologoAlta,getMuestrasPatologoMedia,getMuestrasPatologoBaja,loadingA,loadingM,loadingB}= useMuestrasPatologo()

  // Iterar sobre los datos y clasificar según la prioridad
  // Clasificar estudios según prioridad
  //const highPriorityStudies = [];
 // const mediumPriorityStudies = [];
 // const lowPriorityStudies = [];

 /* if (studies) {
    studies.forEach((study) => {
      const priority = study.prioridad;
      const isConfirmed = study.confirmado;

      if (isConfirmed) {
        if (priority === "ALTA") {
          highPriorityStudies.push(study);
        } else if (priority === "MEDIA") {
          mediumPriorityStudies.push(study);
        } else if (priority === "BAJA") {
          lowPriorityStudies.push(study);
        }
      }
    });
  }*/
 // console.log(lowPriorityColor);

  // modales para las vistas flotantes

  useEffect(() => {
    getMuestrasPatologoAlta()
    getMuestrasPatologoMedia()
    getMuestrasPatologoBaja()
  }, [])
  

  const toggleModal = (study) => {
    setShowModal(!showModal);
    setStudy(study);
  };

 /* const peticionGet = async () => {
    try {
      const estudiosList = await getStudiesList()
      setStudies(estudiosList)

    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    peticionGet();
  }, []); */

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
        <Box
          margin={{ lg: '50px 0px 0px 30px', sm: '60px 0px 10% 0px' }}
          padding={{ lg: '0 25px', md: '10px', sm: '0px 0 10% 0' }}
          backgroundColor={'gray.100'}
          borderRadius={'20px'}
          //backgroundSize="cover"
          backgroundPosition="center"
          height={'auto'}
          //width={'95%'}
        >
          <Box padding={'2%'}>
            {/*<Heading
              size="md"
            >
              Registro de muestras
            </Heading>*/}
            <Box marginTop={"-15px"} padding={"2%"} >
          {hiddenmuestrasPatologosort ? (
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
          ) : (
            <CardOverall_
              title={"Resultados"}
              content={facturas}
              toggleModal={toggleModal}
              colorA={colorA}
              //loading={loading}
              type="search"
            />
          )}

          {/*<ShowMoreButton handleClick={toggleModalList} />*/}
        </Box>
          </Box>
        </Box>


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
      </>
    ) : (
      <ModoLista />
    )
  );
};

export default Dashboard;
